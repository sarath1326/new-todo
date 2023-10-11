




const todoSchema = require("../model/schema");


module.exports = {

    addTask: (data) => {

        return new Promise((resolv, reject) => {

            const final = new todoSchema.todo(data);

            final.save().then(() => {


                resolv();


            }).catch(err => {


                reject();

            });

        });



    },

    gettask: () => {


        return new Promise(async (resolve, reject) => {


            const data = await todoSchema.todo.find();

            if (data) {

                resolve({ data: data, flag: true });

            } else {

                resolve({ flag: false });
            }

        });

    },


    taskdelet: (id) => {


        return new Promise((resolve, reject) => {

            todoSchema.todo.deleteOne({ _id: id }).then(() => {


                resolve();


            }).catch(err => {


                reject();

            });



        });




    },

    taskcomplete: (id) => {


        return new Promise((resolve, reject) => {

            todoSchema.todo.updateOne({ _id: id }, {

                $set: {

                    complete: true

                }

            }).then(() => {


                resolve();

            }).catch(err => {


                reject();

            });



        });



    },

    taskedit: (data) => {

        const { id, contant } = data;


        return new Promise((resolve, reject) => {


            todoSchema.todo.updateOne({ _id: id }, {

                $set: {
                    taskdata: contant
                }
            }).then(() => {

                resolve({ flag: true });




            }).catch(err => {

                resolve({ flag: false });

            });

        });

    }



}