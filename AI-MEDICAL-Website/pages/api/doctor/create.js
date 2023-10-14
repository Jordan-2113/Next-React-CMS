import { doctors, doctor_specialty, doctor_attainments, sequelize } from '../../../db/models';
import Joi from 'joi';
import { DefaultJoiConfig } from '../../../helper';
import { parseRequest, validateToken } from '../../../server-helper';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const schema = Joi.object({
    slug: Joi.string().required(),
    en_metaname: Joi.string().required(),
    tc_metaname: Joi.string().required(),
    sc_metaname: Joi.string().required(),
    en_metadesc: Joi.string().required(),
    tc_metadesc: Joi.string().required(),
    sc_metadesc: Joi.string().required(),
    en_name: Joi.string().required(),
    tc_name: Joi.string().required(),
    sc_name: Joi.string().required(),
    en_title: Joi.string().required(),
    tc_title: Joi.string().required(),
    sc_title: Joi.string().required(),
    en_description: Joi.string().required(),
    tc_description: Joi.string().required(),
    sc_description: Joi.string().required(),
    en_dialect: Joi.string().required(),
    tc_dialect: Joi.string().required(),
    sc_dialect: Joi.string().required(),
    en_clinic: Joi.string().required(),
    tc_clinic: Joi.string().required(),
    sc_clinic: Joi.string().required(),
    specialty: Joi.required(),
    tcAttainment: Joi.required(),
    scAttainment: Joi.required(),
    enAttainment: Joi.required(),
    picture: Joi.required(),
    alttext: Joi.required(),
    priority: Joi.number().default(50),
})

export const config = {
    api: {
        bodyParser: false
    }
}

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'POST' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only POST requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const [ fields, files, err ] = await parseRequest(req);
    if (err) {
        res.status(400).send({ message: err.message });
        return;
    }

    const { error, value } = schema.validate({ ...fields, ...files }, DefaultJoiConfig);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    }

    const transaction = await sequelize.transaction();

    try {
        const doctor = {
            slug: value.slug,
            en_metaname: value.en_metaname,
            tc_metaname: value.tc_metaname,
            sc_metaname: value.sc_metaname,
            en_metadesc: value.en_metadesc,
            tc_metadesc: value.tc_metadesc,
            sc_metadesc: value.sc_metadesc,
            en_name: value.en_name,
            tc_name: value.tc_name,
            sc_name: value.sc_name,
            en_title: value.en_title,
            tc_title: value.tc_title,
            sc_title: value.sc_title,
            en_description: value.en_description,
            tc_description: value.tc_description,
            sc_description: value.sc_description,
            en_dialect: value.en_dialect,
            tc_dialect: value.tc_dialect,
            sc_dialect: value.sc_dialect,
            en_clinic: value.en_clinic,
            tc_clinic: value.tc_clinic,
            sc_clinic: value.sc_clinic,
            priority: value.priority,
            alttext: value.alttext,
            visible: true,
            created_at: new Date(),
            updated_at: new Date()
        };
    
        if (value.picture != null) {
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                apiVersion: '2006-03-01',
                region: 'ap-east-1'
            });
        
            const key = uuidv4() + path.extname(value.picture.name);
        
            try {
                await s3.upload({
                    Bucket: process.env.S3_BUCKET,
                    Key: key,
                    ContentType: value.picture.type,
                    Body: fs.readFileSync(value.picture.path)
                }).promise();
            } catch (e) {
                res.status(500).send({ message: e.message });
                return;
            }
    
            doctor.picture = process.env.AWS_BUCKET_TEMPLATE_URL.replace("{0}", key);
        }
    
        const model = await doctors.create(doctor, { transaction });
    
        if (model == null) {
            res.status(500).send({ message: "Cannot create new instance" });
            return;
        }
    
        await doctor_specialty.bulkCreate((Array.isArray(value.specialty) ? value.specialty : [ value.specialty ]).map(el => ({
            doctorId: model.dataValues.id,
            specialtyId: el,
            created_at: new Date(),
            updated_at: new Date()
        })), { transaction });
    
        await doctor_attainments.bulkCreate((Array.isArray(value.tcAttainment) ? value.tcAttainment : [ value.tcAttainment ]).map((el, idx) => ({
            en_name: (Array.isArray(value.enAttainment) ? value.enAttainment : [ value.enAttainment ])[idx],
            tc_name: (Array.isArray(value.tcAttainment) ? value.tcAttainment : [ value.tcAttainment ])[idx],
            sc_name: (Array.isArray(value.scAttainment) ? value.scAttainment : [ value.scAttainment ])[idx],
            doctorId: model.dataValues.id,
            created_at: new Date(),
            updated_at: new Date()
        })), { transaction });
    
        await transaction.commit();
        
        res.status(200).send();
    }
    catch (error) {
        await transaction.rollback();
        res.status(500).send({ message: "Error while creating model" });
        return;
    }
};

export default validateToken(handler);