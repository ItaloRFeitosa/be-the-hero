const routes = require('express').Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


/**
 * Rota para verificação da api
 */
routes.all('/', (req, res) => {
    return res.json({
        message: 'Its Working!'
    })
});

routes.route('/ongs')
    .get(OngController.index)
    .post(OngController.create);


routes.route('/incidents')
    .get(IncidentController.index)
    .post(IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);


routes.get('/profile',ProfileController.index);

routes.post('/sessions',SessionController.store);


module.exports = routes;