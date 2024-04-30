import { toast } from "react-toastify";

const navigationAction = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CLOSE: "CLOSE",
  FETCHING: "FETCHING",

  success: (messages) => {
    messages !== "" &&
      toast.success(messages, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    return {
      type: navigationAction.SUCCESS,
      resType: "success",
      message: messages,
      show: true,
      isFetching: false,
    };
  },
  error: (messages) => {
    messages !== "" &&
      toast.error(messages, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    return {
      type: navigationAction.ERROR,
      resType: "error",
      message: messages,
      show: true,
      isFetching: false,
    };
  },
  close: () => {
    return {
      type: navigationAction.CLOSE,
      show: false,
      isFetching: false,
    };
  },
  fetching: () => ({
    type: navigationAction.FETCHING,
    isFetching: true,
  }),
};
// export const

export default navigationAction;
