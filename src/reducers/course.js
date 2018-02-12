import { Course_Join,
    Course_Join_Fail,
    Course_Join_Success
 } from '../app-constant';

const CourseReducer = (state = {
    passwordMatchSuccess:false,
    passwordMatchLoading:false,
    passwordMatchFail:false
    
}, action) => {

    switch (action.type) {
            case Course_Join :{
                return{...state, passwordMatchLoading:true, passwordMatchSuccess: false}
            }
            case Course_Join_Success :{
                return{...state, passwordMatchLoading:false, passwordMatchSuccess:true}
            }
            case Course_Join_Fail :{
                return{...state, passwordMatchLoading:false, passwordMatchSuccess:false}
            }
            default:
            return state
        }
}
export default CourseReducer
