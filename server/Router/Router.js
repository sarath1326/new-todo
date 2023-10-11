
const express = require("express");

const control = require("../Control/control");



const router = express();

router.post("/taskadd", (req, res) => {

    control.addTask(req.body).then(() => {

        control.gettask().then((respo) => {

            if (respo.flag) {


                res.json({ flag: true, data: respo.data });

            } else {

                res.json({ flag: false });

            }

        });
    });

});


router.get("/gettask", (req, res) => {


    control.gettask().then((respo) => {

        if (respo.flag) {

            res.json({ flag: true, data: respo.data });
        } else {

            res.json({ flag: false });
        }

    }).catch(err => {

        console.log("no task found ");
        res.json({ flag: false });
    });



});


router.delete("/taskdelet", (req, res) => {

    const taskid = req.body.taskid;

    control.taskdelet(taskid).then(() => {

        res.json({ flag: true });


    }).catch(err => {


        res.json({ flag: false });

    });

});


router.post("/taskcomplete", (req, res) => {

    const id = req.body.id;

    console.log(id);

    control.taskcomplete(id).then(() => {

        res.json({ flag: true });

    }).catch(err => {

        res.json({ flag: false });

    });

});


router.post("/taskedit", (req, res) => {

    const data = {
        id: req.body.id,
        contant: req.body.data

    }

    control.taskedit(data).then(() => {

        res.json({ flag: true });


    }).catch(err => {

        res.json({ flag: false });


    });

});












module.exports = router;



