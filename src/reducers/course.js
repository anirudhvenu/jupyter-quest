import {Course_Join} from '../app-constant';

export const Course_Init_State = {
    'joinCourse':[]
}

export default ( state = Course_Init_State, action ) => {
    switch (action.type) {
        case Course_Join:
            
            return state;
    
        default:
            return state;
    }
    
}