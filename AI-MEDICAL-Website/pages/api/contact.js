import Joi from "joi";
import nodemailer from "nodemailer";
import striptags from "striptags";
import { DefaultJoiConfig } from "../../helper";
import { parseRequest } from "../../server-helper";

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    content: Joi.string().allow('')
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {
    if (req.method?.toUpperCase() !== 'POST' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only POST requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const [ fields, files, err ] = await parseRequest(req);
    if (err) {
        res.status(400).send({ message: err });
        return;
    }

    const { error, value } = schema.validate({ ...fields, ...files }, DefaultJoiConfig);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    }

    const transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3'
        },
        requireTLS:true,
        port: 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    const body = `你好：<br /><br />你有一個新的查詢。<br /><br /><table border="0"><tr><td>姓名：</td><td>${value.name}</td></tr><tr><td>聯絡電話：</td><td>${value.phone}</td></tr><tr><td>聯絡電郵：</td><td>${value.email}</td></tr><tr><td>查詢事宜：</td><td>${value.content}</td></tr></table>`;

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'enquiry@hkaimc.com',
        subject: '聯絡我們表格',
        html: body,
        text: striptags(body)
    });

    res.status(200).send();
}