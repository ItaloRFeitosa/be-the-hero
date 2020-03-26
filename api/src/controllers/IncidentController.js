const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        try {

            const { page=1 , perPage=5} = req.query;

            const [count] = await connection('incidents').count();

            const totalCount = count['count(*)'];
            const totalPages = Math.ceil(totalCount/perPage);

            const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(perPage)
            .offset((page-1)*perPage)
            .select(['incidents.id', 'incidents.title',
                'incidents.description','incidents.value',
                'ongs.name','ongs.abbreviation',
                'ongs.email','ongs.whatsapp',
                'ongs.city','ongs.uf'
            ]);

            res.header('X-Total-Count', totalCount);
            res.header('X-Total-Pages', totalPages);

            return res.json(incidents);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async create(req, res){
        try {
            
            const data = {title, dascription, value} = req.body;
            const {logged_ong} = req.headers;
            const incident = {...data, 
                                ong_id: logged_ong};

            await connection('incidents').insert(incident);

            return res.status(204).send();

        } catch (error) {
            return res.status(400).json(error);
        }

        
    },

    async delete(req,res){
        try {

            const { id } = req.params;
            const { logged_ong } = req.headers;

            const { ong_id } = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();
    
            if ( ong_id !== logged_ong ) {
                return res.status(401).json({
                    error: 'This operation is not allowed/authorized.'
                });    
            }
    
            await connection('incidents').where('id', id).delete();
    
            return res.status(204).send();
            
        } catch (error) {
            return res.status(400).json(error);
        }



    }
}