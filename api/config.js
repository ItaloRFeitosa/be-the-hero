require('dotenv').config();

module.exports = {
    postgres_container: {
        host :    `${process.env.POSTGRES_HOST}`,
        database: `${process.env.POSTGRES_DB}`,
        user:     `${process.env.POSTGRES_USER}`,
        password: `${process.env.POSTGRES_PASSWORD}`,
        port: `${process.env.POSTGRES_PORT}`
    },

    postgres_dev: {
        host :    "localhost",
        database: "bethehero",
        user:     "postgres",
        password: "postgres",
        port: 5432
    }
}