import Joi from 'joi';
import { doctors, doctor_specialty, doctor_attainments } from '../../../../db/models';
import { DefaultJoiConfig } from '../../../../helper';
import { validateToken } from '../../../../server-helper';

const schema = Joi.object({
    di : Joi.number().default(1),
    sort : Joi.string().default("asc")
})

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'GET' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only GET requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const colMap = [ 'updated_at' ];

    const { error, value } = schema.validate(req.query, DefaultJoiConfig);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    }

    const results = await doctors.findAll({
        order: [
            [ colMap[value.di-1], value.sort ]
        ],
        include: [
            {model: doctor_specialty},
            {model: doctor_attainments},
        ]
    });
    
    res.status(200).send({
        data: results.map(x => x.dataValues)
    });
};

export default validateToken(handler);