
const express= require("express");
const app=express();
const router=require("./Router/Router");
const DB= require("./model/connect");
const cors=require("cors");






app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());



DB.DBconnect();

 app.use("/",router);







app.listen(3001,()=>{

    console.log("server starting");

});











      