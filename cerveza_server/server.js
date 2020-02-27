const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cervezadb');
let cervezaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

let Cerveza = mongoose.model('cervezas', cervezaSchema);
let app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
  

//Código del servidor web

//Añadiendo Servicios GET
//lista completa de cervezas
app.get('/cervezas', (req, res) => {
    Cerveza.find().then(result => {
        res.send(result);
    });
});

//Filtrado de datos. URI dinámicos
app.get('/cervezas/:id', (req,res)=>{
    Cerveza.findById(req.params.id).then(result=>{
        let data;
        if(result){
            data = { error: false, result: result}
        } else{
            //error
            data = {error: true, errorMessage: "Not found"}
        }
        res.send(data)
    }).catch(error=>{
        //error
        data = {error: true, errorMessage: "Error getting cerveza"}
        res.send(data)
    })
});

//Agregar datos con solicitudes POST
app.use(bodyParser.json());
app.post('/cervezas', (req, res)=> {
    let newCerveza = new Cerveza({
        name: req.body.name,
        image:  req.body.image,
        description: req.body.description
    });

    newCerveza.save().then(result => {
        let data = {error: false, result: result}
        res.send(data);
    }).catch(error => {
        let data = {error:true, errorMessage:"Can not save"}
        res.send(data);
    });
});
//Actualización de datos con solicitudes PUT
app.put('/cervezas/:id', (req,res) =>{
    Cerveza.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description
        }
    }, {new:true}).then(result => {
        let data = {error: false, result : result}
        res.send(data);
    }).catch(error => {
        let data = {error :true, errorMessage: "error updating cerveza"}
        res.send(data);
    });
});

//Eliminiación de datos con solicitudes delete
app.delete('/cervezas/:id', (req, res) => {
    Cerveza.findByIdAndRemove(req.params.id).then(result => {
        let data = { error: false, result : result}
        res.send(data);
    }).catch(error=>{
        let data = {error :true , errorMessage: "error removing cerveza"}
        res.send(data);
    })
})


app.listen(8000);