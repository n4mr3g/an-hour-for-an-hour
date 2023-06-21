import { Offer } from "../dataTypes";

export function set(data: Offer[]) {
  return { type: "SET_OFFERS", payload: data };
}

export function setTrue(data: boolean) {
  return { type: "SET_TRUE", payload: data };
}

export function setFalse(data: boolean) {
  return { type: "SET_FALSE", payload: data };
}


export function loginAction(data: boolean) {
  return { type: "LOG_IN", payload: data };
}
