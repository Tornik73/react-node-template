import {LoaderEnum} from "../../shared/enum/loader";


const INIT_STATE = {
    loaderState: false,
}


export default function loaderReducer(state = INIT_STATE, action: any ) {
    switch (action.type) {
        case LoaderEnum.SHOW_LOADER: {
            return {
                loaderState: true,
            }
        }
        case LoaderEnum.HIDE_LOADER: {
            return {
                loaderState: false,
            }
        }
        default:
            return state;
    }

}
