const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const passport = require('passport')

const jwtSecret = require('../../config').api.jwtSecret
const {findUSerById} = require('../users/users.controllers')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
}

passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
        findUSerById(tokenDecoded.id)
            .then((user) => {
                if(user){
                    done(null, tokenDecoded) // Caso exitoso porque el usuario
                } else {
                    done(null, false) //caso fallido, el el que mo genera err
                }
            })
            .catch((err) => {
                done(err, false) // caso fallido, en el que si genera error
            })
    })
)

module.exports = passport