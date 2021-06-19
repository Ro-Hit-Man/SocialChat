import './App.css';
import Messenger from './components/Messenger';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);

  useEffect(() => {
    if(localStorage.getItem("googleID") !== null){
        if(localStorage.getItem("googleID") == 'no'){
          dispatch({type:"LOGOUT"});
        }
        else{
          dispatch({type:"LOGIN"});
        }
    }
    else{
      dispatch({type:"LOGOUT"});
    }
  }, [])

  return (
    <div className='app'>
      {isLogin?
        <Messenger/>
        :<Login/>}
    </div>
  );
}

export default App;
