const express= require('express');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth,(req,res)=>{
    res.json({msg: "Protected Page/Router", user:req.user})
})


module.exports=router;
