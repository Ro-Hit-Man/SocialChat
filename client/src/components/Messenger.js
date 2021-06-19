import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Conversation from './Conversation'
import Message from './Message'
import Start from './Start'
import axios from 'axios'
import '../styles/Messenger.css'
import { baseUrl } from '../config'
import {io} from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'


export default function Messenger() {

    var online = false;
    const [id, setid] = useState("");
    const [users, setusers] = useState([]);
    const [req, setreq] = useState([]);
    const [req2, setreq2] = useState([]);
    const [con1, setcon1] = useState([]);
    const [con2, setcon2] = useState([]);
    const [messages, setmessages] = useState([]);
    const isDone = useSelector(state => state.isDone);
    const cid = useSelector(state => state.isCID);
    const rid = useSelector(state => state.isRID);
    const [message, setmessage] = useState("");
    const [arrivalmessage, setarrivalmessage] = useState("");
    const [onlineUsers, setonlineUsers] = useState([]);
    var gid = localStorage.getItem("googleID");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const scrollRef = useRef();
    const socket = useRef();
    const dispatch = useDispatch();
    var Quick = [
        "Hello","Hiiii","How are you?","I'm Fine", "Good Morning","Yes","Good Evening","Good Night","Bye","Have a nice day","No","Please",
        "Thank you","What?","Why?","When?","OK","Who?","Hmmm"
    ];

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data=>{
            setarrivalmessage({
                sendBy: data.userId,
                message: data.text,
                createdAt: Date.now(),
            })
        });
    }, []);

    useEffect(() => {
        var gid = localStorage.getItem("googleID");
        axios.post(baseUrl+'getUID',{gid}).then((res)=>{
             setid(res.data.data);
         });
        axios.post(baseUrl+'getUsers').then((res)=>{
             setusers(res.data.data);
        });
        axios.post(baseUrl+'getRequested',{gid}).then((res)=>{
             setreq(res.data.data);
            // console.log(res.data);
        });
        axios.post(baseUrl+'gotRequested',{gid}).then((res)=>{
            // console.log(res.data);
             setreq2(res.data.data);
         });
         axios.post(baseUrl+'getConversation1',{gid}).then((res)=>{
            // console.log(res.data);
             setcon1(res.data.data);
         });
         axios.post(baseUrl+'getConversation2',{gid}).then((res)=>{
            // console.log(res.data);
             setcon2(res.data.data);
         });
         
     }, []);

     var reqTo = req.map((r)=>{
        return r.requestedTo
    });
    var reqBy = req2.map((r)=>{
        return r.requestedBy
    });
    var mem2 = con1.map((c)=>{
        return c.member2
    });
    var mem1 = con2.map((c)=>{
        return c.member1
    });
    var member = mem1.concat(mem2);

    useEffect(()=>{
        if(member.includes(arrivalmessage.sendBy)){ 
            setmessages([...messages, arrivalmessage]);
        }   
    },[arrivalmessage]);

    useEffect(() => {
        socket.current.emit("addUser", id);
        socket.current.on("getUsers", (users)=>{
            setonlineUsers(users);
        });
    }, [id]);

    useEffect(() => {
        axios.post(baseUrl+'messages',{cid}).then((res)=>{
            setmessages(res.data.data);
        });
        return () => {
            dispatch({type:"NO_C_ID"});
        }
    }, [cid]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages]);

   
    
    var userList = users.map((u)=>{
        if(u.googleId != gid){
            if(!reqTo.includes(u._id)){
                if(!reqBy.includes(u._id)){
                    if(!mem1.includes(u._id)){
                        if(!mem2.includes(u._id)){
                            return <Start key={u._id}
                                        name={u.name}
                                        img={u.img}
                                        id={u._id}
                                    />
                        }
                    }
                }
            }
        }
    });

    var conversationList = users.map((u)=>{
        if(u.googleId !=gid){
            if(member.includes(u._id)){
                if(u._id === onlineUsers.userId){
                    online = true;
                }
                return <Conversation key={u._id}
                            name={u.name}
                            img={u.img}
                            id={u._id}
                            online={online}
                        />                
            }
        }
    });
    var messagesList = messages.map((m)=>{
        if(m.sendBy == id){
            return <div ref={scrollRef}>
                        <Message
                            own = {true}
                            message = {m}
                        />
                    </div>
        }else{
            return <div ref={scrollRef}>
                        <Message
                            own = {false}
                            message = {m}
                        />
                    </div>
        }

    });

    var quickList = Quick.map((q)=>{
        return <div onClick={()=>{quickSend(q);}} className='QuickText' key={q}>{q}</div>
    });

    function send(){

        socket.current.emit({
            userId : id,
            receiverId : rid,
            text: message
        });

        axios.post(baseUrl+'sendMessage',{message,cid,gid}).then((res)=>{
            setmessage("");
            setmessages([...messages, res.data.data]);
        });
    }
    function quickSend(q){
        
        socket.current.emit({
            userId : id,
            receiverId : rid,
            text: q
        });

        axios.post(baseUrl+'sendMessage',{message:q,cid,gid}).then((res)=>{
            setmessage("");
            setmessages([...messages, res.data.data]);
        });
    }

    return (
        <>
            <Header/>
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder='Search for Friends' className='chatMenuInput'></input>
                        {conversationList}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {isDone?<>
                            <div className='chatBoxTop'>
                                {messagesList}
                            </div>
                            <div className='chatBoxBottom'>
                                <textarea id='message' placeholder='Write something...' className='chatMessageText' value={message} onChange={(e)=>{setmessage(e.target.value)}}></textarea>
                                <button className='chatSendButton' onClick={()=>{send();}}>Send</button>
                            </div>
                        </>:<span className='noOpenChat'>Open Conversation to start messeges</span>}
                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <div className='chatOnlineTop'>
                            Quick Messeges
                            <div className='Quick'>
                                {quickList}
                            </div>
                        </div>
                        <div className='chatOnlineBottom'>
                            <button onClick={handleShow}>Start a Conversation</button>
                        </div>
                    </div>
                </div>   
                {show?<div className='startConversationDiv'>
                    <input placeholder='Search for Friends' className='startInput'></input>
                    <div className='startConversation'>
                        {userList}
                    </div>
                    <button onClick={handleClose}>Close</button>
                </div>:""}
            </div>   
        </>
    )
}
