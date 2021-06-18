export function isDone(state=false,action){
    switch(action.type){
        case "DONE" :
            state = true;
            return state;
        case "UNDONE" :
            state = false;
            return state;
        default :
            return state; 
    }
}