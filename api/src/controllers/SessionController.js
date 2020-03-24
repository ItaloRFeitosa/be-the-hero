const connection = require('../database/connection')

module.exports = {
    async store(req, res){
        try {
            const { id } = req.body

            const ong = await connection('ongs')
                .where('id', id)
                .select('*')
                .first();

            if (!ong) {
                return res.status(400).json({
                    error: "No ONG found with this ID."
                });
            }
    
            return res.json(ong);

        } catch (error) {
            return res.status(400).json(error);
        }
    }
}