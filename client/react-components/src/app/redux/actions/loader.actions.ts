import {LoaderEnum} from "../../shared/enum/loader";

export const showLoader = (): any => {
    return {
        type: LoaderEnum.SHOW_LOADER,
    }
};
export const hideLoader = (): any => {
    return {
        type: LoaderEnum.HIDE_LOADER,
    }
};
