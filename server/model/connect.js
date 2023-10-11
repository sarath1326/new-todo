
 const mongoose= require("mongoose");




    module.exports.DBconnect=()=>{

            mongoose.connect("mongodb+srv://sarathsarath93366:sarath1937@cluster0.p9dupzd.mongodb.net/?retryWrites=true&w=majority").then(()=>{

             console.log("DB connected ");

            }).catch(err=>{

                console.log("DB err");

            });

    }

