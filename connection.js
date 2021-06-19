
// const knex = require('knex')({
//     client : "mysql",
//     connection : ({
//         host : "localhost",
//         user : "root",
//         password : "Neha@1234",
//         database : "myDetails"
//     })
// })

// knex.schema.hasTable("userjwt5").then((existe) => {
//     if(!existe){
//         return knex.schema.createTable("userjwt5",(t) =>{
//             t.increments("id").primary()
//             t.string("name"),
//             t.string("email"),
//             t.integer("age"),
//             t.string("password")
//         })
//     }
// })

// module.exports = knex;