

const{ productList }=require('../product');

exports.productCtrlfunction=(req,res)=>{
    try {
        res.status(200).json({
            product:productList
        })
    } catch (error) {
        console.log(error);
        
    }

}
