import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../config';
import '../styles/Message.css'
import {format} from 'timeago.js';

export default function Message({
    own,
    message
}) {

    const [user, setuser] = useState([]);

    useEffect(() => {
        axios.post(baseUrl+'getUser',{id:message.sendBy}).then((res)=>{
            setuser(res.data.data);
        });
    }, []);
    

    return (
        <div className={own?'message own':'message'}>
            <div className='messageTop'>
                <img className='messageTopImg' src={user.img} alt=''></img>
                <p className='messageTopText'>{message.message}</p>
            </div>
            <div className='messageBottom'>{format(message.createdAt)}</div>
        </div>
    )
}
