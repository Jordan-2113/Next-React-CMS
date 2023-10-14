import { doctors, doctor_specialty, doctor_attainments } from '../../../../db/models';
import { validateToken } from '../../../../server-helper';

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'GET' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only GET requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const results = await doctors.findOne({
        where: { id: req.query.id },
        include: [
            {model: doctor_specialty},
            {model: doctor_attainments},
        ],
        order: [
            [ doctor_attainments, 'id', 'asc' ]
        ]
    });
    
    res.status(200).send({
        data: results.dataValues
    });
};

export default validateToken(handler);