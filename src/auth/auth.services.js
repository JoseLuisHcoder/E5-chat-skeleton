const checkUserCredentials = require('./auth.controllers')
const jwtSecret = require('../../config').api.jwtSecret

const postLogin = (req, res) => {
    const {email, password} = req.body
    if(email && password){
        checkUserCredentials(email, password)
            .then((data) => {
                if(data){
                    const token = jwt.sign({
                        id: data.id,
                        email:data.email,
                        role:data.role,
                    }, jwtSecret // , { expiresIn: 60 * 60}  para dar un tiempo de valides al token se emplea un tercer parametro expiresIn
                    )


                    //despues de haver creado el token , como estamos en servicios debemos manejar una respuesta
                    res.status(200).json({
                        message:'Correct Credentials',
                        token
                    })
                } else {
                    res.status(401).json({message:'Invalid Credentials'})
                }
            })
            .catch((err) => {
                res.status(400).json({message:err.message})
            })
    } else {
        res.status(400).json({message:'Missing Data', Fields: {
            email: 'example@gmail.com',
            password:'String'
        }})
    }
}

module.exports = postLogin