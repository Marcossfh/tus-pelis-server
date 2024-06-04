const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { isTokenValid } = require("../middlewares/auth.middlewares")

//rutas de identificacion

//POST "/api/auth/signup" => recibe data (email, username, password) del usuario y lo crea en la DB
router.post("/signup", async (req, res, next)=> {

    console.log(req.body)

    const {email, username, password,} = req.body


    //validaciones de servidor

    //  1.todos los campos  obligatorios
    if (!email || !username || !password) {
        res.status(400).json({errormessage: "todos los campos obligatorios"})
        return //deten la ejecucion de la ruta al probar postman y que no pete el servidor
    }

    //  2.password seguro y fuerte
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (passwordRegex.test(password) === false) {
        res.status(400).json({errorMessage: "La contraseña no es suficientemente fuerte"})
        return
    }
    //  3.no tener otro usuario que ya exista en la DB con mismo email  
    try {
        const foundUser = await User.findOne({email:email})
        console.log(foundUser)
        if (foundUser) {
            res.status(400).json({errorMessage: "Usuario ya registrado con ese email"})
            return // detén la ejecución de la ruta
          }

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        //  creamos usuario en la DB 
        await User.create({
            email: email,
            username: username,
            password: hashPassword
             //imagen no requerida pero debo añadirla

        })
        
        
        res.sendStatus(201)
        
        
    }catch(error) {
        next(error)
    }

})

//POST "/api/auth/login" => recibe credenciales del usuario (email, password) y las valida. crearemos y enviaremos token

router.post("/login", async (req, res, next) => {


    console.log(req.body)
    const { email, password} = req.body

    // 1.campos existan

    if (!email || !password) {
        res.status(400).json({errormessage: "todos los campos obligatorios"})
        return //deten la ejecucion de la ruta al probar postman y que no pete el servidor
    }

    try {

        // 2.usuario exista
        const foundUser = await User.findOne( {email: email})
        console.log(foundUser)
        if (!foundUser) {
            res.status(400).json({errorMessage: "Usuario no registrado"})
            return // detén la ejecución de la ruta
          }
        
        //3. contraseña corerecta

        const isPasswordcorrect = await bcrypt.compare(password, foundUser.password)
        console.log(isPasswordcorrect)
        if (isPasswordcorrect === false) {
            res.status(400).json({errorMessage: "contraseña chunga"})
            return
        }

        //usuario autenticado. creamos y enviamos token
        const payload = {
            _id: foundUser._id,
            email: foundUser.email
            //culaquier info statica del usuario deberia ir aqui
        }

        const authToken = jwt.sign(
            payload, //contenido token
            process.env.TOKEN_SECRET, //clave servidor tokens desde .env
            { algorithm: "HS256", expiresIn: "100 days"}//config token

        )

        res.status(200).json({ authToken: authToken})



        

    } catch(error) {
        next(error)
    }
    
    
   

})

//GET "/api/auth/verify" => recibe token y lo valida
router.get("/verify", isTokenValid, (req, res, next) => {

    console.log(req.payload)
    //este es el usuario haciendo esta llamda
    //esto ayuda a saber cuando crean doc, delete doc o quien lo edita


    res.status(200).json({payload: req.payload})
})

//ruta que solo envia info a usuarios logeados(privado)
//router.get("/private-route-mainmovies", isTokenValid, (req, res) => {

   // res.json({data: "info solo para logeadis"})

//})



module.exports = router;