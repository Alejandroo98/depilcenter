#PASOS PARA INCLUIR UN RECAPTCHA EN UN FORMULARIO

1. En este link creas las secret key la session key
2. instalar -> npm i express-recaptcha
3. Todo esta aqui -> https://www.npmjs.com/package/express-recaptcha (Siguiendo este link es como lo hice)

## Indicaciones

- Como hacer que nodemon escuche los cambios de hbs
  • Existen varias maneras
  • Inlcuir en el archivo package.json -> "nodemonConfig": { "ext": "js,json,hbs" }
  • Crear un archivo en la raiz de tu proyecto llamado <nodemon.json> e ingresar -> { "ext": "js,json,hbs" }
  • Ultima opcion, puedes hacerlo desde la consola asi -> nodemon -e js,json,hbs index.js

CONTINAUR ->
ELIMINA EL TEMA DEL LOCAL STORAGE, Y LA RUTA "redirect-form" agregale una clave, algo asi -> &token=se71ev68t78wre
