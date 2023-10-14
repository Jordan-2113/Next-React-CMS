import { users } from '../../../db/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { DefaultJoiConfig } from '../../../helper';

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' });
        return;
    }

    const { error, value } = loginSchema.validate(req.body, DefaultJoiConfig);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    }
    const user = await users.findOne({ where: { username: value.username }, attributes: ['id', 'username', 'password', 'role'] });

    if (user == null || !(await bcrypt.compare(value.password, user.password))) {
        res.status(403).send({ message: "Username or password incorrect" });
        return;
    }
    console.log(process.env.JWT_TOKEN)
    res.status(200).send({
        token: jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_TOKEN)
    });
};

export default handler;