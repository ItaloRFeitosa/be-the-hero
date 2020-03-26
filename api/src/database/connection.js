const knex = require('knex');

const config = require('../../knexfile');

const connection = knex(config.teste);

module.exports = connection;