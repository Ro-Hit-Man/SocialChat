import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../config';

export default function Notification2({
    id
}) {

    const [user, setuser] = useState([]);

    useEffect((id) => {
        axios.post(baseUrl+'getUser',{id:id}).then((res)=>{
            setuser(res.data.data);
       });
    }, []);

    function deny(){
        axios.post(baseUrl+'deny',{id}).then(()=>{
            window.location.reload(true);
        });
    }

    function accept(){
        var uid = localStorage.getItem("googleID")
        axios.post(baseUrl+'accept',{id: id, gid: uid}).then(()=>{
            axios.post(baseUrl+'deny',{id}).then(()=>{
                window.location.reload(true);
            });
        });
    }

    return (
        <div className='noti'>
            <p className='notip'>You are Requested a Conversation with</p>
            <img className='notiImg' src={user.img} alt=''></img>
            <span className='notiName'>{user.name}</span>
            <button className="notibtn" onClick={()=>{accept();}}>Accept</button>
            <button className="notibtn" onClick={()=>{deny();}}>Deny</button>
        </div>
    )
}
