
 const mongoose =require("mongoose");



  
const todoSchema= new mongoose.Schema({

    taskdata:String,
     complete:Boolean,
     edit:Boolean

   });



   module.exports.todo= mongoose.model("todoData",todoSchema);


  

 






  