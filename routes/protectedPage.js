const express= require('express');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth,(req,res)=>{
    console.log('--------req is', req);
    
    res.json({msg: "Protected Page/Router", user:req.user, userData: req.method})
})


module.exports=router;
