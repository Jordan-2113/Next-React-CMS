import { Op } from 'sequelize';
import { users } from '../../../db/models';
import { validateToken } from '../../../server-helper';

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'DELETE' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only DELETE requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const ids = typeof req.query.id === "string" ? [ req.query.id ] : [ ...req.query.id ];

    const count = await users.destroy({
        where: { id: { [Op.in]: ids } }
    })

    if (count === 0) {
        res.status(500).send({ message: "Cannot delete instance" });
        return;
    }
    
    res.status(200).send();
};

export default validateToken(handler);