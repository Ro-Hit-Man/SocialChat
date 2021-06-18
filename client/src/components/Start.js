import React from 'react'
import '../styles/Start.css'
import {baseUrl} from '../config'
import axios from 'axios'

export default function Start({
    img,
    name,
    id
}) {
    function request(){
        
            var uid = localStorage.getItem("googleID");
            axios.post(baseUrl+'request', {to : id , by : uid}).then(()=>{
                window.location.reload(true);
            });
        
    }

    return (
        <div className='start'>
            <img className='startImg' src={img} alt=''></img>
            <span className='startName'>{name}</span>
            <button className="startbtn" onClick={()=>{request();}}>Request</button>
        </div>
    )
}
