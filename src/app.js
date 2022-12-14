// dependencies
const express = require('express')
const cors = require('cors')
// las cors nos permite definir de donde queremos recibir peticiciones

//Files
const config = require('../config')
const db = require('./utils/database') //2222222222
const initModels = require('./models/initModels')  //3333333
const userRouter = require('./users/users.router') // 4444
const authRouter = require('./auth/auth.router') // 55555

//Initial Config

const app = express()

//Enable Incoming JSON data
app.use(express.json())

//enable cors
app.use(cors())

//Authenticate DB    //2222222
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch((err) =>  console.log(err))
//Sincronizando las base de datos con los models
db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

//Initialize my models relations
initModels()
// despues de creamos las tablas en dbdiagram en la web crearemos la tabla users y recovery_passwords
//Ruotes v1
app.get('/', (req, res) => {
    res.status(200).json({
        status:200,
        message: 'OK',
        routes:{
            users:""
        }
    })
})

app.use('/api/v1/users', userRouter) // 4444
app.use('api/v1/auth', authRouter) // 5555


app.listen((config.api.port, () => {
    console.log(`Server started on ${config.api.host}`);
}))