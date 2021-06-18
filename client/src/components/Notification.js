import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../config';
import '../styles/Notification.css'

export default function Notification({
    id
}) {

    const [user, setuser] = useState([]);

    useEffect((id) => {
        axios.post(baseUrl+'getUser',{id:id}).then((res)=>{
            setuser(res.data.data);
       });
    }, []);

    function discard(){
        axios.post(baseUrl+'discard',{id}).then(()=>{
            window.location.reload(true);
        });
    }

    return (
        <div className='noti'>
            <p className='notip'>You Have Requested a Conversation with</p>
            <img className='notiImg' src={user.img} alt=''></img>
            <span className='notiName'>{user.name}</span>
            <button className="notibtn" onClick={()=>{discard();}}>Discard Request</button>
        </div>
    )
}
