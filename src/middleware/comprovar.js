let validarReserva = ( req, res , next ) => {

    let body = req.body;
    console.log(body);

    let name = true;
    let lastName = true;
    let email = true;
    let locales = true;
    let servicios = true;
    let hora = true;
    let fecha = true;
    let numeroCelular = true;
    let fechaCumpleanios = true;

    if( body.nombres === '' || body.email === '' ||  body.locales === '' || body.servicios === '' || body.hora === '' || body.fecha === '' || body.numeroCelular === '' || body.fechaCumpleanios === '' ){
        let error = {
              errOne: 'LLena todos los campos',
              errTwo: 'e intentalo de nuevo',
        };
        req.flash('error', error);
        res.redirect('/');
    }else if( req.recaptcha.error ){
        req.flash("recaptcha" , "Por favor marca la recaptcha" )
        res.redirect('/');
    }else if( name && lastName && email && locales && servicios && hora && fecha && numeroCelular && fechaCumpleanios ){
        next()
    }
}

module.exports = {
    validarReserva
}
