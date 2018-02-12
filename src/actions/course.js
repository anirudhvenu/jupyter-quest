import {Course_Join} from '../app-constant';

export joinCourse = (password) => {
    return {
        type: Course_Join,
        payload:password
    }
}