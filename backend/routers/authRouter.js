const express =   require("express");
const router =  express.Router();
const {register ,login} =  require("../controllers/auth");
const  verifyuser =  require("../middlewares/verifyuser");
const adminOnly =  require("../middlewares/adminOnly");
router.post('/register', register);
router.post('/login', login);



router.get('/home', verifyuser,adminOnly, (req, res)=>{
    res.status(200).json({
        success:true,
        message:'Welcome to dashboard'
    });
})


module.exports = router