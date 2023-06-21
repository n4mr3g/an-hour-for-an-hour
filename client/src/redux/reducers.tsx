import { AnyAction } from "redux";
import { Offer, User } from "../dataTypes";

const offersReducer = (state: Offer[] = [], action: AnyAction) => {
  switch (action.type) {
    case "SET_OFFERS":
      state = [...action.payload];
      console.log(state);
      return state;
    default:
      return state;
  }
};

// const userInfoReducer = (
//   state: User = {
//     password: "",
//     name: "",
//     email: "",
//     image: "",
//   },
//   action: AnyAction,
// ) => {
//   switch (action.type) {
//     case "LOG_IN":
//       state = {
//         ...state,
//         ...action.payload,
//       };
//       return state;
//     default:
//       return state;
//   }
// };

// const reducers = combineReducers({ offers, userInfo });

export { offersReducer };
