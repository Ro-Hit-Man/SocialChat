export function isCID(state='',action){
    switch(action.type){
        case "C_ID" :
            state = action.payload;
            return state;
        case "NOT_C_ID" :
            state = "";
            return state;
        default :
            return state; 
    }
}