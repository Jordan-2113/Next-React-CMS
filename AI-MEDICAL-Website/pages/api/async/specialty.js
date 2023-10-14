import Joi from 'joi';
import { doctors, doctor_specialty } from '../../../db/models';
import { DefaultJoiConfig } from '../../../helper';

const schema = Joi.object({
    id: Joi.number().required(),
    p: Joi.number().default(1),
    locale: Joi.string().default("tc")
})

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'GET' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only GET requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const { error, value } = schema.validate(req.query, DefaultJoiConfig);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    }

    const results = await doctors.findAll({
        where: { visible: true },
        attributes: [
            'id',
            `${value.locale}_title`,
            `${value.locale}_name`,
            'picture'
        ],
        include: [
            {model: doctor_specialty, where: { specialtyId: value.id }},
        ],
        limit: 9,
        offset: 9 * value.p,
    });
    
    res.status(200).send({
        data: results.map(doctor => {
            return {
                id: doctor.dataValues.id,
                picture: doctor.dataValues.picture,
                name: doctor.dataValues[`${value.locale}_name`],
                title: doctor.dataValues[`${value.locale}_title`],
            }
        })
    });
};

export default handler;