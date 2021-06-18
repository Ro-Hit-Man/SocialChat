export function isRID(state='',action){
    switch(action.type){
        case "RID" :
            state = action.payload;
            return state;
        case "NOT_R_ID" :
            state = "";
            return state;
        default :
            return state; 
    }
}