const jwt = require("jsonwebtoken")

function isTokenValid(req, res, next) {

    try{
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1]
    
        console.log(token)
    
        //validar token
        // esto valida token y devuelve el payload
        const payload = jwt.verify(token, process.env.TOKEN_SECRET )
        console.log(payload)

        req.payload = payload // pasa el payload del middleware a la ruta y asi se quien es el usuario, su id etc

        //si es valido dejar que accedad a la ruta
        next()

    } catch(error) {
        //si el token no es valido, no existe o fue manipulado enviar err
        res.status(401).json({errorMessage: "Token no valido o no existe"})
    }


}

module.exports = {
    isTokenValid
}