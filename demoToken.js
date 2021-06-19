const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3500


app.post ('/login',(req,res) => {
    const user = {
        id : 1,
        username : "brad",
        email: "brand@23gmail.com"
        }
    const token = jwt.sign(user,'secretkey')
        res.json({
            token : token
        })
});

app.get('/api/get',verifyToken,(req,res) => {
    jwt.verify(req.token,'secretkey',(err,authData) => {
        if(err){
            console.log(err)
        }else{
            res.json({
                message : "Token create..",
                authData : authData
            });
        };
    });
});

function verifyToken(req,res,next){
    console.log(req.headers)
    const bearerHeader = req.headers["authorization"]
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        console.log(bearer)
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)
    }
}

app.listen(port,(req,res) => {
    console.log(`server is running on ${port}`)
})