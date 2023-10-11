
 const mongoose= require("mongoose");




    module.exports.DBconnect=()=>{

            mongoose.connect('mongodb://127.0.0.1/todo').then(()=>{

             console.log("DB connected ");

            }).catch(err=>{

                console.log("DB err");

            });

    }

