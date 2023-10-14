import { users } from '../../../db/models';
import Joi from 'joi';
import { DefaultJoiConfig } from '../../../helper';
import { parseRequest, validateToken } from '../../../server-helper';

const schema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.number().required()
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
        res.status(400).send({ message: err });
        return;
    }

    const { error, value } = schema.validate({ ...fields, ...files }, DefaultJoiConfig);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    }

    const [ rowsUpdated ] = await users.update({
        username: value.username,
        email: value.email,
        role: value.role,
        updated_at: new Date()
    }, {
        where: { id: value.id }
    })

    if (rowsUpdated === 0) {
        res.status(500).send({ message: "Cannot edit instance" });
        return;
    }
    
    res.status(200).send();
};

export default validateToken(handler);