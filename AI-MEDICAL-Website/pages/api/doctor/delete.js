import { Op } from 'sequelize';
import { doctors, doctor_specialty, doctor_attainments, sequelize } from '../../../db/models';
import { validateToken } from '../../../server-helper';

const handler = async (req, res) => {
    if (req.method?.toUpperCase() !== 'DELETE' && req.method?.toUpperCase() !== 'OPTIONS') {
        res.status(400).send({ message: 'Only DELETE requests allowed' });
        return;
    }
    if (req.method?.toUpperCase() === 'OPTIONS') {
        return res.status(200).send();
    }

    const transaction = await sequelize.transaction();

    const ids = typeof req.query.id === "string" ? [ req.query.id ] : [ ...req.query.id ];

    try {
        await doctor_specialty.destroy({
            where: { doctorId: { [Op.in]: ids } }
        }, { transaction });

        await doctor_attainments.destroy({
            where: { doctorId: { [Op.in]: ids } }
        }, { transaction });

        const count = await doctors.destroy({
            where: { id: { [Op.in]: ids } }
        }, { transaction });
    
        if (count === 0) {
            res.status(500).send({ message: "Cannot delete instance" });
            return;
        }
    
        await transaction.commit();
        
        res.status(200).send();
    }
    catch (error) {
        console.log(error);
        transaction.rollback();
        res.status(500).send({ message: "Error while deleting model" });
        return;
    }
};

export default validateToken(handler);