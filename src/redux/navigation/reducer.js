import navigationAction from "./actions";

const initState = {
  show: false,
  message: "",
  type: "",
  oneTimeModal: false,
  subscription: false,
  isFetching: false,
  workflowData: [],
  notificationData: [],
  isSubscriptionSuccess: false,
  onboardingModal: false,
  finishSetUpData: []
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case navigationAction.SUCCESS:
      return {
        ...state,
        show: action.show,
        message: action.message,
        resType: action.resType,
        isFetching: action.isFetching
      };

    case navigationAction.ERROR:
      return {
        ...state,
        show: action.show,
        message: action.message,
        resType: action.resType,
        isFetching: action.isFetching
      };

    case navigationAction.CLOSE:
      return {
        ...state,
        show: action.show,
        isFetching: action.isFetching
      };

    case navigationAction.FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case navigationAction.SUBSCRIPTIONSUCCESS:
      return {
        ...state,
        isSubscriptionSuccess: action.isSubscriptionSuccess
      };

    case navigationAction.TOGGLEMODAL:
      return {
        ...state,
        subscription: action.subscription
      };

    case navigationAction.ONETIMEMODAL:
      return {
        ...state,
        oneTimeModal: action.oneTimeModal
      };

    case navigationAction.GROUPSTATUSDATA:
      return {
        ...state,
        workflowData: action.workflowData
      };

    case navigationAction.NOTIFICATIONDATA:
      return {
        ...state,
        notificationData: action.notificationData
      };

    case navigationAction.ONBOARDINGTOGGLEMODAL:
      return {
        ...state,
        onboardingModal: action.onboardingModal
      };

    case navigationAction.FINISHSETUPDATA:
      return {
        ...state,
        finishSetUpData: action.finishSetUpData
      };

    default:
      return state;
  }
}
