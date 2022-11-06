// Redux
import { resetMessage } from "../slices/photo.slice";

export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(()=>{
            dispatch(resetMessage());
        }, 2000);
    };
};
