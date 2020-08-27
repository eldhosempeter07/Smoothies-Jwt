const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'net ninja secret',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'net ninja secret',async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                const user = await user.findByID(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
    }
}

module.exports = {requireAuth,checkUser};