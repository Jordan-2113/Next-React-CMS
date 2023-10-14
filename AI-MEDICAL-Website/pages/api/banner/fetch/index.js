import { banners } from '../../../../db/models';
import Joi from 'joi';
import { DefaultJoiConfig } from '../../../../helper';
import { validateToken } from '../../../../server-helper';

const schema = Joi.object({
   di : Joi.number().default(2),
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

    const colMap = [ 'priority', 'updated_at' ];

    const { error, value } = schema.validate(req.query, DefaultJoiConfig);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    }

    const results = await banners.findAll({ order: [ [ colMap[value.di-1], value.sort ] ] });
    
    res.status(200).send({
        data: results.map(x => x.dataValues)
    });
};

export default validateToken(handler);