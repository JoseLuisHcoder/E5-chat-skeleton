const uuid = require('uuid')

const Users = require('../models/users.models')
const {hashPassword} = require('../utils/crypto')

const findAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude:['password', 'createdAt', 'updateAt']
        },
        where: {
            status: 'active'
        }
    })
    return data
}

const findUSerById = async (id) => {
    const data = await Users.findOne({
        attributes: {
            exclude:['password', 'createdAt', 'updateAt']
        },
        where: {
            id:id
        }
    })
    return data
}

//creamos el controlador cuando hagamos un login
const findUserByEmail = async(email) => {
    const data = await Users.findOne({
        where: {
            email:email
        }
    })
    return data
}

const createUser = async(obj) => {
    const data = await Users.create({
        id:uuid.v4(),
        firstName:obj.firstName,
        lastName:obj.lastName,
        email:obj.email,
        password: hashPassword(obj.password),
        gender:obj.gender,
        birthday:obj.birthday,
        // el rol, el status, van a tener valores por defecto para una mejor gestion
        //el isVerified va manejar valores tambien por defecto
    })
    return data
}

const updateUser = async(id, obj) => {
    const data = await Users.update(obj, {
        where: {
            id:id
        }
    })
    return data[0]
}

const deleteUser = async () => {
    const data = await Users.update({
        status: 'inactive'
    }, {
        where: {
            id:id
        }  
    } )
    return data
}

module.exports = {
    findAllUsers,
    findUSerById,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser
}