
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table){
    table.string('id').primary();
    
    table.string('name',100).notNullable();
    table.string('abbreviation',20).nullable();
    table.string('email',100).notNullable();
    table.string('whatsapp',20).notNullable();
    table.string('city',100).notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
