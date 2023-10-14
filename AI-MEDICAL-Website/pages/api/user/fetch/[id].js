import { users } from '../../../../db/models';
import { validateToken } from '../../../../server-helper';

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'GET' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only GET requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const results = await users.findOne({ where: { id: req.query.id } });
    
    res.status(200).send({
        data: results.dataValues
    });
};

export default validateToken(handler);