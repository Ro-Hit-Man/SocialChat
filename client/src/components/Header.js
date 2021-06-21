import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { baseUrl } from '../config';
import '../styles/Header.css'
import Notification from './Notification';
import Notification2 from './Notification2';

export default function Header() {

    var count = 0;
    const dispatch = useDispatch();
    const [req1, setreq1] = useState([]);
    const [req2, setreq2] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
       var gid = localStorage.getItem("googleID");
       axios.post(baseUrl+'getRequested',{gid}).then((res)=>{
            setreq1(res.data.data);
       });
       axios.post(baseUrl+'gotRequested',{gid}).then((res)=>{
            setreq2(res.data.data);
        });
    });

    count = req1.length + req2.length;

    var reqList1 = req1.map((r)=>{
        return <Notification 
                    id={r.requestedTo}
                />
    });

    var reqList2 = req2.map((r)=>{
        return <Notification2 
                    id={r.requestedBy}
                />
    });
     

    function logout(){
        localStorage.setItem("googleID","no");
        dispatch({type:"LOGOUT"});
        dispatch({type:"NO_C_ID"});
        dispatch({type:"UNDONE"});
    }

    return (
        <div className='header'>
            <h1>Messenger</h1>
            <div className='btn-div'>
            <button onClick={handleShow}>Notification</button>
            <div className='noti-noti'><span>{count}</span></div>
            <button onClick={()=>{logout()}}>Logout</button>
            </div>

            {show?<div className='notification'>
                <div className='notificationDiv'>
                    {reqList1}
                    {reqList2}
                </div>
                <button className='notificationbtn' onClick={handleClose}>Close</button>
            </div>:""}
        </div>
    )
}
