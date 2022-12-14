const bcrypt = require('bcrypt')

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}

//pregunta de entrevista porque el plainPassword no generara problemas, y es por el scope de plainPassword en cada funcion, es decir cada de plainPassword, tiene valides dentreo de cada funcion y no en la otra