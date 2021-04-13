const { format } = require("timeago.js");

 function timeago( date ){
    let formato = format( date )
    return formato
}

module.exports = {
    timeago
} ;