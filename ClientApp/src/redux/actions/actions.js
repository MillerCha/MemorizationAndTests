import subjectsService from '../../services/subjects.service';



export const SET_SELECTED_SUBJECTS = '[subjects] SET_SELECTED_SUBJECTS';
export const SET_SUBJECTS = '[subjects] SET_SUBJECTS';

export function setSelectedSubjects(newSelectedSubject) {
    return { type: SET_SELECTED_SUBJECTS, payload: newSelectedSubject };
}

//export function setSubjects(newSubjects) {
//    return { type: SET_SUBJECTS, payload: newSubjects };
//}

//export const SET_SUBJECTS = '[subjects] SET_SUBJECTS';
export const SET_IS_LOADING = '[subjects] SET_IS_LOADING';




export function setSubjects(subjects) {
    return {
        type: SET_SUBJECTS,
        payload: subjects
    }
}

export function setIsLoading(isLoading) {
    return {
        type: SET_IS_LOADING,
        payload: isLoading
    }
}

export function fetchSubjects() {
    return async function (dispatch) {
        dispatch(setIsLoading(true));
        const subjects = await subjectsService.fetchSubjects();
        dispatch(setSubjects(subjects));
        dispatch(setIsLoading(false));
    }
}
