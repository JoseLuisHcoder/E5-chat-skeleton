 // este middleware previamente tiene que pasar por el middleware de authentication

 const roleMiddleware = (req, res, next) => {
    if(req.user.role === 'admin'){
        next()
    } else {
        res.status(401).json({message:'Permission denied'})
    }
 }

 module.exports = roleMiddleware