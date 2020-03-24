const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        try {

            const ongs = await connection('ongs').select('*');
            
            return res.json(ongs);

        } catch (error) {
            
        }
    },

    async create(req, res){
        try {
        
            const id = crypto.randomBytes(8).toString('HEX');
            const data = {name, abbreviation, email, whatsapp, city, uf} = req.body;
            const ong = {id, ...data};
            //console.log(ong);
            await connection('ongs').insert(ong);
            
            return res.json({id: ong.id});

        } catch (error) {

            return res.status(400).json(error);
        }
    },
}