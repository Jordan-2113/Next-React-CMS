import { metatags } from '../../../db/models';
import Joi from 'joi';
import { DefaultJoiConfig } from '../../../helper';
import { parseRequest, validateToken } from '../../../server-helper';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const schema = Joi.object({
    id: Joi.number().required(),
    en_title: Joi.string().required(),
    tc_title: Joi.string().required(),
    sc_title: Joi.string().required(),
    en_description: Joi.string().optional().allow(''),
    tc_description: Joi.string().optional().allow(''),
    sc_description: Joi.string().optional().allow(''),
    priority: Joi.number().default(50)
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

    const metatag = {
        en_title: value.en_title,
        tc_title: value.tc_title,
        sc_title: value.sc_title,
        en_description: value.en_description,
        tc_description: value.tc_description,
        sc_description: value.sc_description,
        priority: value.priority,
        updated_at: new Date()
    };
    console.log(metatag);

    // if (value.picture != null) {
    //     const s3 = new AWS.S3({
    //         accessKeyId: process.env.AWS_ACCESS_KEY,
    //         secretAccessKey: process.env.AWS_SECRET_KEY,
    //         apiVersion: '2006-03-01',
    //         region: 'ap-east-1'
    //     });
    
    //     const key = uuidv4() + path.extname(value.picture.name);
    
    //     try {
    //         await s3.upload({
    //             Bucket: process.env.S3_BUCKET,
    //             Key: key,
    //             ContentType: value.picture.type,
    //             Body: fs.readFileSync(value.picture.path)
    //         }).promise();
    //     } catch (e) {
    //         res.status(500).send({ message: e.message });
    //         return;
    //     }

    //     metatag.icon = process.env.AWS_BUCKET_TEMPLATE_URL.replace("{0}", key);
    // }

    const [ rowsUpdated ] = await metatags.update(metatag, {
        where: { id: value.id }
    })

    if (rowsUpdated === 0) {
        res.status(500).send({ message: "Cannot edit instance" });
        return;
    }
    
    res.status(200).send();
};

export default validateToken(handler);