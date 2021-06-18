export function isLogin(state=false,action){
    switch(action.type){
        case "LOGIN" :
            state=true;
            return state;
        case "LOGOUT" :
            state=false;
            return state;
        default : 
            return state;
    }
}