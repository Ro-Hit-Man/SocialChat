import React from 'react'
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import '../styles/Login.css'
import {useDispatch} from 'react-redux';

export default function Login() {

    const dispatch = useDispatch();

    function responseGoogle(response) {
        console.log(response.profileObj);
        var email = response.profileObj.email;
        var googleId = response.profileObj.googleId;
        var name = response.profileObj.name;
        var img = response.profileObj.imageUrl;
        var data = {
            email,
            googleId,
            name,
            img
        }
        axios.post('http://localhost:4000/auth/loginUser',{googleId}).then((res)=>{
            if(res.data.data === "user not found"){
                console.log(res.data.data);
                axios.post('http://localhost:4000/auth/registerUser', data).then(()=>{
                    dispatch({type:"LOGIN"});
                    localStorage.setItem("googleID",googleId);
                })
            }
            else{
                dispatch({type:"LOGIN"});
                localStorage.setItem("googleID",googleId);
            }
        });
     }

    return (
        <div className='login'>
            <h2>login/register using</h2>
            <GoogleLogin
                                clientId='1044529583764-bp2o5q8n70519mcev0ea6hcmgnf5v3rc.apps.googleusercontent.com'
                                render={renderProps => (
                                    <button id='google-btn' onClick={renderProps.onClick} disabled={renderProps.disabled}>GOOGLE</button>
                                )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
        </div>
    )
}
