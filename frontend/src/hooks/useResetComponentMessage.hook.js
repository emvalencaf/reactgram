// Redux
import { resetMessage } from "../slices/user.slice";

export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(()=>{
            dispatch(resetMessage());
        }, 2000);
    };
};
