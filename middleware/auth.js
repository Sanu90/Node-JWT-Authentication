const jwt = require ('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req,res,next)=>{
    console.log("Authenticate function in auth middleware");
    const authHeader = req.header('Authorization');
    console.log("authHeader--->", authHeader);
    
    if(!authHeader){
        return res.status(401).json({
            error: 'No token found to proceed.'
        })
    }
    // console.log('req', req);
    // console.log("-----------");
    // console.log('res', res);
    const token = authHeader.split(' ')[1]; // check this token .. it comes with Bearer token..
    if(!token){
        return res.status(401).json({
            error: 'No token found, authorization failed'
        })
    }
    try {

        const verifyJWT = jwt.verify(token,process.env.JWT_KEY);
        console.log("JWT verification", verifyJWT);
        
        req.user = verifyJWT.user;
        next()
        
    } catch (error) {
        return res.status(401).json({
            error:error
        })
    }
    
    
    
}

module.exports = authenticate;