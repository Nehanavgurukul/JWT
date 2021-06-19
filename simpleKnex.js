let express = require("express");
let app = express()
const port = 3000

app.use(express.json());


// DataBase conection
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'sanjay123',
        database: 'demodb'
    }
});

// Creating users talbe 
knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('users', function (t) {
            t.increments('id').primary();
            t.string('first_name', 100);
            t.string('last_name', 100);
            t.text('bio');
        });
    }
});


// creating user
app.post('/create', (req, res) => {
    knex('users')
        .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio
        })
        .then(() => {
            console.log('user created!..');
            res.send('user created..')

        })
        .catch((err) => {
            console.log(err);
            res.send(err)

        })

})

// getting all users data
app.get('/users', (req, res) => {
    knex()
        .select('*')
        .from('users')
        .then((data) => {
            console.log('data is coming...');
            res.send(data)

        })
        .catch((err) => {
            console.log(err);
            res.send(err)

        })
})

// getting particular user by his id
app.get('/user/:id', (req, res) => {
    knex()
        .select('*')
        .from('users')
        .where('id',req.params.id)
        .then((data) => {
            console.log('data is coming...');
            res.send(data)

        })
        .catch((err) => {
            console.log(err);
            res.send(err)

        })
})

// updating particular user data by his id
app.put('/update/:id', (req, res) => {
    knex.update({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "bio": req.body.bio
        })
        .table('users')
        .where('id', req.params.id)
        .then(() => {
            res.send('user udated..')

        })
        .catch((err) => {
            res.send(err)
        })

})

// deleting particular data by his id
app.delete('/delete/:id', (req, res) => {
    knex('users')
        .where({ 'id': req.params.id }).del()
        .then(() => {
            res.send('user deleted..');

        })
        .catch((err) => {
            res.send(err)
        })
})




app.listen(port, () => {
    console.log(`your port is working ${port}`)
})