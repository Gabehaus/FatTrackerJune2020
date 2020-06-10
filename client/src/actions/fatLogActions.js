import {
  GET_FATLOGS,
  ADD_FATLOG,
  DELETE_FATLOG,
  FATLOGS_LOADING,
  CALCULATOR_RESULTS,
  CHANGE_CALCFOOD,
  CHANGE_CALCUNIT,
  CHANGE_CALCQUANTITY,
  CHANGE_CALCFAT,
  RESET_LOGADDED
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getFatLogs = username => dispatch => {
  dispatch(setFatLogsLoading());
  axios
    .get(`/api/fatLogs/${username}`)
    .then(res =>
      dispatch({
        type: GET_FATLOGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addFatLog = (fatLog, getState) => dispatch => {
  axios
    .post("/api/fatLogs", fatLog, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_FATLOG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_FATLOG_FAIL")
      )
    );
};

export const deleteFatLog = (id, user) => (dispatch, getState) => {
  axios
    .delete(`/api/fatLogs/${user}/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_FATLOG,
        payload: id
      })
    )
    .catch(err => dispatch(returnErrors(err.response, err.response)));
};

export const setFatLogsLoading = () => {
  return {
    type: FATLOGS_LOADING
  };
};

export const transferCalculatorResults = (
  calcFood,
  calcUnit,
  calcQuantity,
  calcFat
) => {
  return {
    type: CALCULATOR_RESULTS,
    payload: { calcFood, calcUnit, calcQuantity, calcFat }
  };
};

export const changeCalcFood = food => {
  return {
    type: CHANGE_CALCFOOD,
    payload: food
  };
};

export const changeCalcUnit = unit => {
  return {
    type: CHANGE_CALCUNIT,
    payload: unit
  };
};

export const changeCalcQuantity = quantity => {
  return {
    type: CHANGE_CALCQUANTITY,
    payload: quantity
  };
};

export const changeCalcFat = fat => {
  return {
    type: CHANGE_CALCFAT,
    payload: fat
  };
};

export const resetFatLogAdded = () => {
  return {
    type: RESET_LOGADDED
  };
};
