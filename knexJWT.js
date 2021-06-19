const express = require('express')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const port = 5000
// const connection = require('./connection.js')

const knex = require('knex')({
    client : "mysql",
    connection : ({
        host : "localhost",
        user : "root",
        password : "Neha@1234",
        database : "myDetails"
    })
})

knex.schema.hasTable("userjwt").then((existe) => {
    if(!existe){
        return knex.schema.createTable("userjwt",(t) =>{
            t.increments("id").primary()
            t.string("name"),
            t.string("email"),
            t.integer("age"),
            t.string("password")
        })
    }
})

app.post("/signup",(req,res) => {
    knex("userjwt")
    .insert({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
        password : req.body.password   
    })
    .then(() => {
        console.log("inserted data")
        res.send("inserted data")
    })
    .catch((err) =>{
        console.log(err)
        res.send(403)
    })
})


app.post("/createToken",(req,res) => {
    let a = false;
    let email = req.body.email
    let password = req.body.password
    knex.select('*').from('userjwt')
    .then((data) => {
        for(i of data){
            if(i.email == email && i.password == password){
                a = true;
                let token = jwt.sign({email : i.email,password : i.password},"secreteneha")
                res.send(token)
                console.log(token)

            }
        }if(a){
            console.log("loggin");
        }else{
            console.log("not loggin");
        }
        
    }).catch((err) => {
        res.send(err)
        console.log(err);
    })
})

app.put("/updated",(req,res) => {
    const checktoken = jwt.verify(req.headers.authorization,"secreteneha")
    knex('userjwt').where({email : checktoken.email})
    .update(req.body)
    .then(() => {
        res.send("updated successfully")
        console.log("updated successfully");
        
    }).catch((err) =>{
        res.send(err)
        console.log(err);
    })

})

app.delete("/delete", (req,res) => {
    const checktoken = jwt.verify(req.headers.authorization,"secreteneha")
    knex("userjwt").where({password : checktoken.password})
    .delete(req.body)
    .then((data) => {
        console.log(data)
        console.log("data deleted...")
        res.send("data deleted...")
    })
    .catch((err) => {
        console.log(err)
    })
})

app.listen(port,(req,res) => {
    console.log(`server is running on ${port}`)
})

