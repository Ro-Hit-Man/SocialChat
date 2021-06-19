import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { baseUrl } from '../config';
import '../styles/Conversation.css'

export default function Conversation({
    name,
    img,
    id,
    cid,
    online
}) {

    var gid = localStorage.getItem("googleID");
    const [con1, setcon1] = useState([]);
    const [con2, setcon2] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.post(baseUrl+'getConversation1',{gid}).then((res)=>{
            setcon1(res.data.data);
        });
        axios.post(baseUrl+'getConversation2',{gid}).then((res)=>{
            setcon2(res.data.data);
        });
    });

    function checkCID(uid){
        con1.map((c)=>{
            if(c.member2 === uid){
                cid = c._id;
            }
            return 1;
        });
        con2.map((c)=>{
            if(c.member1 === uid){
                cid = c._id;
            }
            return 1;
        });
        dispatch({type:"C_ID",payload:cid});
        dispatch({type:"R_ID",payload:uid});
        dispatch({type:"DONE"});
    }


    return (
        <div className='conversation' onClick={()=>{checkCID(id)}}>
           {online?<div className='online'></div>:""}
            <img className='conversationImg' src={img} alt=''></img>
            <span className='conversationName'>{name}</span>
        </div>
    )
}
