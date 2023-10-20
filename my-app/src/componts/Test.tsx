

import React from 'react'
import "./Test.css"
import { CiLight } from "react-icons/ci"
import { AiOutlinePlus, AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { BsCheckCircleFill } from "react-icons/bs"
import { CiSaveUp1 } from "react-icons/ci";
import { MdNightlight } from "react-icons/md"
import { useState, useEffect } from 'react'
import axios from "../constant/Axios"


function Test() {


    type arry_type = {

        taskdata: string
        complete: boolean
        edit: boolean
        _id: number

    }



    const [task, settask] = useState<string>("");

    const [editData, seteditData] = useState<string>("");

    const [them, setthem] = useState<boolean>(false);

    const [titlecolor, settitlecolor] = useState<string>("white");

    const [tasks, settasks] = useState<arry_type[]>([]);

    const [bgcolor, setbgcolor] = useState<string>("black");




    // get tassks

    useEffect(() => {

        axios("/gettask").then((respo) => {

            const result = respo.data;

            if (result.flag) {

                settasks(result.data);
                console.log("helooo ")


            } else {

                console.log("task not fount ");
            }
        })

    }, [])


    // task add

    function addtasks() {

        type data_type = {

            taskdata: string
            complete: boolean
            edit: boolean

        }



        settask("");

        if (task) {

            const objdata: data_type = {

                taskdata: task,
                complete: false,
                edit: false

            }
            axios.post("/taskadd", objdata).then((result) => {

                const respo = result.data;

                if (respo.flag) {

                    settasks(respo.data);


                } else {

                    console.log("task not found ");
                }

            }).catch(err => {

                console.log("err");
            });

        } else {

            console.log("err");
        }

    }




    // task delete 


    const taskdelete = (index: number, id: any): void => {


        const taskid: any = id;

        tasks.splice(index, 1);

        settasks([...tasks]);

        axios.delete("/taskdelet", { data: { taskid: taskid } }).then(() => {

            console.log("task deleted ");

        }).catch(err => {

            console.log("err");

        })



    }

    // task complete

    const complettask = (index: number, id: any): void => {

        const taskid: any = id;


        console.log("task id :", taskid);


        const findData = tasks[index];

        findData.complete = true;

        // tasks.push(tasks.splice(tasks.indexOf(findData), 1)[0]);

        settasks([...tasks]);

        axios.post("/taskcomplete", { id: taskid }).then(() => {

            console.log("task completed");

        }).catch(err => {

            console.log("err");
        })


    }





    // task edit 


    const edit = (index: number): void => {

        let findData = tasks[index];

        findData.edit = true;

        settasks([...tasks]);
        seteditData(findData.taskdata);

    }


    // task save

    const save = (index: number, id: any): void => {

        const taskid: any = id;

        let findData = tasks[index];

        findData.taskdata = editData;

        findData.edit = false;

        settasks([...tasks]);


        axios.post("/taskedit", { data: editData, id: taskid }).then(() => {

            console.log("task edited");


        }).catch(err => {

            console.log("err");
        })
    }






    return (
        <div>

            <div className=' home-main'>

                <div className='box-main' style={{ backgroundColor: `${bgcolor}` }}>

                    <div className='home-hedsesstion'>

                        <h3 className='title' style={{ color: `${titlecolor}` }}   > TODO</h3>

                        {

                            them ? <MdNightlight className='night-icon' onClick={() => { setbgcolor("black"); settitlecolor("white"); setthem(false) }} />

                                :

                                <CiLight className='home-icon' onClick={() => { setbgcolor("white"); settitlecolor("black"); setthem(true) }} />

                        }



                    </div>



                    <h3 className='home-greting' style={{ color: `${titlecolor}` }}> Have a nice day</h3>

                    <p className='home-disc' style={{ color: `${titlecolor}` }}> Add Your Today Tasks</p>

                    <div className='home-task-box'>

                    </div>

                    <div className='home-task-show'>


                        {

                            tasks.map((obj, index) => (

                                <div className='show-main'>

                                    <div className='text-box' style={obj.complete ? { backgroundColor: "gray" } : { backgroundColor: "aqua" }} >


                                        {

                                            obj.edit ? <input className='edit-input'
                                                type='text' value={editData}
                                                onChange={(e) => { seteditData(e.target.value) }}

                                            />

                                                :

                                                <p className='text-p'> {obj.taskdata}</p>


                                        }




                                    </div>

                                    <div className='icons-box'>


                                        {

                                            obj.edit ? <CiSaveUp1 className='save-icon' onClick={() => { save(index, obj._id) }} />

                                                :

                                                obj.complete ? <MdDelete className='delete-icon' onClick={() => { taskdelete(index, obj._id) }} /> :

                                                    <>

                                                        <BsCheckCircleFill className='mark-icon' onClick={() => { complettask(index, obj._id) }} />

                                                        <AiFillEdit className='edit-icon' onClick={() => { edit(index) }} />

                                                        <MdDelete className='delete-icon' onClick={() => { taskdelete(index, obj._id) }} />

                                                    </>



                                        }








                                    </div>





                                </div>


                            ))



                        }














                    </div>




                    <div className='home-enterbox-main'>

                        <input className='home-input-box'
                            type='text'
                            placeholder='enter tasks'
                            value={task}
                            onChange={(e) => { settask(e.target.value) }}

                        />

                        <AiOutlinePlus className='home-plus-icon'

                            style={{ color: `${titlecolor}` }}

                            onClick={addtasks}



                        />



                    </div>











                </div>







            </div>











        </div>
    )
}

export default Test
