const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//Importar aqui los modelso de la base de datos
passport.serializeUser((user, done) => {
  done(user);
});

passport.deserializeUser((user, done) => {
  done(user);
});

passport.use(
  'comprovarDatos',
  new LocalStrategy({}, async (res, done) => {
    if ('bien' == 'bien') {
      done(null, prueba);
    }
  })
);
