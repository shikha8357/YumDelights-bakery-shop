const express=require("express")
const app=express();
const path=require("path");

const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.set("view engine","hbs");




// app.get("/",(req,res)=>{
//     res.render("index");
// })
// app.get("/cart",(req,res)=>{
//     res.render("cart");
// })

app.use("/",require('./routes/pages'));
app.use("/product",require('./routes/product'));
// const Port=process.env.PORT
const Port=8000 ;
app.listen(Port,()=>{
    console.log(`running on port ${Port}`)
});