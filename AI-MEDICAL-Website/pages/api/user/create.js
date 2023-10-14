import { users } from '../../../db/models';
import Joi from 'joi';
import { DefaultJoiConfig, SALT_ROUNDS } from '../../../helper';
import { parseRequest, validateToken } from '../../../server-helper';
import bcrypt from 'bcrypt';

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
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

    try {
        const model = await users.create({
            username: value.username,
            password: await bcrypt.hash(value.password, SALT_ROUNDS),
            email: value.email,
            role: value.role,
            status: true,
            created_at: new Date(),
            updated_at: new Date()
        })
    
        if (model == null) {
            res.status(500).send({ message: "Cannot create new instance" });
            return;
        }
    } catch (e) {
        res.status(500).send({ message: e.errors.map(x => x.message).join(', ') });
    }
    
    res.status(200).send();
};

export default validateToken(handler);