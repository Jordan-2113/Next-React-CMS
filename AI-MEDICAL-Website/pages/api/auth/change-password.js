import { users } from '../../../db/models';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { DefaultJoiConfig, SALT_ROUNDS } from '../../../helper';
import { parseJWT, parseRequest } from '../../../server-helper';

const schema = Joi.object({
    oldPwd: Joi.string().required(),
    newPwd: Joi.string().required()
})

export const config = {
    api: {
        bodyParser: false
    }
}

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' });
        return;
    }

    const tokenPayload = parseJWT(req);
    if (tokenPayload == null) {
        res.status(403).send({ message: "Token is invalid" });
        return;
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

    const user = await users.findOne({ where: { id: tokenPayload.id }, attributes: ['id', 'password'] });

    if (user == null || !(await bcrypt.compare(value.oldPwd, user.password))) {
        res.status(403).send({ message: "Password incorrect" });
        return;
    }

    const [ rowsUpdated ] = await users.update({
        password: await bcrypt.hash(value.newPwd, SALT_ROUNDS),
        updated_at: new Date()
    }, {
        where: { id: tokenPayload.id }
    })

    if (rowsUpdated === 0) {
        res.status(500).send({ message: "Cannot edit instance" });
        return;
    }
    
    res.status(200).send();
};

export default handler;