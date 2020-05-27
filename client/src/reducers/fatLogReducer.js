import {
  GET_FATLOGS,
  ADD_FATLOG,
  DELETE_FATLOG,
  FATLOGS_LOADING,
  CALCULATOR_RESULTS,
  CHANGE_CALCFOOD,
  CHANGE_CALCUNIT,
  CHANGE_CALCQUANTITY,
  CHANGE_CALCFAT
} from "../actions/types";

const initialState = {
  fatLogs: [],
  loading: false,
  checkID: null,
  attempted: null,
  calcFood: "hamburger",
  calcUnit: "whole",
  calcQuantity: "1",
  calcFat: "10",
  newLogAdded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FATLOGS:
      return {
        ...state,
        fatLogs: action.payload,
        loading: false
      };
    case DELETE_FATLOG:
      return {
        ...state,
        attempted: "yes",
        checkID: action.payload,
        fatLogs: state.fatLogs.filter(fatLog => fatLog._id !== action.payload)
      };
    case ADD_FATLOG:
      return {
        ...state,
        fatLogs: [action.payload, ...state.fatLogs],
        newLogAdded: true
      };
    case FATLOGS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CALCULATOR_RESULTS:
      return {
        ...state,
        calcFood: action.payload.calcFood,
        calcUnit: action.payload.calcUnit,
        calcQuantity: action.payload.calcQuantity,
        calcFat: action.payload.calcFat
      };
    case CHANGE_CALCFOOD:
      return {
        ...state,
        calcFood: action.payload
      };
    case CHANGE_CALCUNIT:
      return {
        ...state,
        calcUnit: action.payload
      };
    case CHANGE_CALCQUANTITY:
      return {
        ...state,
        calcQuantity: action.payload
      };
    case CHANGE_CALCFAT:
      return {
        ...state,
        calcFat: action.payload
      };
    default:
      return state;
  }
}
