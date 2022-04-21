const express=require("express");

const { productCtrlfunction } =require('../controllers/productCtrlFile.js');
const router=express.Router();

router.get('/',productCtrlfunction);



module.exports=router;