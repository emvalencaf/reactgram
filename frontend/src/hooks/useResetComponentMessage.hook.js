// Redux
import { resetMessage } from "../slices/photo.slice";

// Will reset feedback (success or failed) message of photos functons and methods
export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(()=>{
            dispatch(resetMessage());
        }, 2000);
    };
};
