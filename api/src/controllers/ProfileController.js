const connection = require('../database/connection')

module.exports = {
    async index(req, res){
        try {
            const { logged_ong } = req.headers
    
            const incident = await connection('incidents')
                .where('ong_id', logged_ong)
                .select('*');
    
            return res.json(incident);

        } catch (error) {
            return res.status(400).json(error);
        }
    }
}