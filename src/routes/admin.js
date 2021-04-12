const express = require("express");
const { model } = require("../models/datosReserva");
const app = express();
const path = require("path");
const DatosReserva = require("../models/datosReserva");
const datosReserva = require("../models/datosReserva");

app.set("views" , path.resolve( __dirname , "../routes-privates" )  )

app.get("/crearregistrotest" , async ( req , res ) => {
    //depiladmin00/crearregistrotest?token=clave156
    let token = req.query.token;
    if( token === "clave156" ){
        let datos = await DatosReserva.find({}).sort({ _id : -1 })
        res.render("admin" , {datos} )
    }else {
        res.redirect("/")
    }
});

app.post("/crearregistrotest" , async ( req , res ) => {

    
    let horaActual = new Date();
    let guardarHora = `${horaActual.getHours()}:${horaActual.getMinutes()}`;
    let guardarFecha = `${horaActual.getDate()}-${ horaActual.getMonth() + 1 }-${horaActual.getUTCFullYear()}`;
    let dateDB = `${guardarHora} / ${guardarFecha}`;

    console.log(dateDB);
    
    const { nombres , email , phone , fechaCumpleanios  } = req.body;

    let fecha = new Date()
    
    let newPersona = new datosReserva({
        nombres : nombres ,
        email : email,
        numeroTelefono : phone ,
        fechaCumpleanios : fechaCumpleanios,
        fechaRegistro : dateDB,
        suscrito : false
    })

    let guardado = await newPersona.save().then( x => {
        req.flash("registroOk" , "Registro guardado")
    })
    .catch( x => {
        req.flash( "registroError" , "Ocurrio un error intentalo de nuevo Glorita" );
    })
    
    
    
    res.redirect("/depiladmin00/crearregistrotest?token=clave156")
});


module.exports = app;