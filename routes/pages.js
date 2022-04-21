const express=require("express");
// const { builtinModules } = require("node:module");
const { homeCtrlfunction,cartCtrlfunction } =require('../controllers/pagesCtrlFile');
const router=express.Router();


router.get('/',homeCtrlfunction);
router.get('/cart',cartCtrlfunction);

module.exports=router;