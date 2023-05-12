
import detailTypesService from '../../services/detailTypes.service';

export const SET_DETAIL_TYPES = '[detailTypes] SET_DETAIL_TYPES';
export const SET_IS_LOADING = '[detailTypes] SET_IS_LOADING';




export function setDetailTypes(detailTypes) {
    return {
        type: SET_DETAIL_TYPES,
        payload: detailTypes
    }
}

export function setIsLoading(isLoading) {
    return {
        type: SET_IS_LOADING,
        payload: isLoading
    }
}

export function fetchDetailTypes() {
    return async function (dispatch) {
        dispatch(setIsLoading(true));
        const detailTypes = await detailTypesService.fetchDetailTypes();
        dispatch(setDetailTypes(detailTypes));
        dispatch(setIsLoading(false));
    }
}