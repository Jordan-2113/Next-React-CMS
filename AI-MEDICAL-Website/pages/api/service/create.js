import { services } from '../../../db/models';
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
    en_title: Joi.string().required(),
    tc_title: Joi.string().required(),
    sc_title: Joi.string().required(),
    en_content: Joi.string().required(),
    tc_content: Joi.string().required(),
    sc_content: Joi.string().required(),
    alttext: Joi.string().required(),
    priority: Joi.number().default(50),
    picture: Joi.required()
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

    const service = {
        slug: value.slug,
        en_metaname: value.en_metaname,
        tc_metaname: value.tc_metaname,
        sc_metaname: value.sc_metaname,
        en_metadesc: value.en_metadesc,
        tc_metadesc: value.tc_metadesc,
        sc_metadesc: value.sc_metadesc,
        en_title: value.en_title,
        tc_title: value.tc_title,
        sc_title: value.sc_title,
        en_content: value.en_content,
        tc_content: value.tc_content,
        sc_content: value.sc_content,
        alttext: value.alttext,
        priority: value.priority,
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

        service.picture = process.env.AWS_BUCKET_TEMPLATE_URL.replace("{0}", key);
    }

    const model = await services.create(service)

    if (model == null) {
        res.status(500).send({ message: "Cannot create new instance" });
        return;
    }
    
    res.status(200).send();
};

export default validateToken(handler);