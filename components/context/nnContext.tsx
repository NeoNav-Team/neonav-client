'use client';
import merge from 'deepmerge';
import DataContextCreator from "./dataContextCreator";
import { NnProviderValues, NnStore } from "./nnTypes";
import { nnSchema } from "./nnSchema";
import { getCookieContext, getCookieToken, setCookieContext } from "@/utilites/cookieContext";
import executeApi from '@/utilites/executeApi';

type ActionTypes = 'setNetwork' | 
  'setAlert' |
  'setUserWallets' | 
  'setWalletTransactions' |
  'setUserContacts' | 
  'initContext';

interface Action {
  type: ActionTypes,
  payload?: Object,
}

interface walletAPIResData {
  balance?: Number;
  owner?: String;
}

interface netcheckAPIResData {
  message?: String;
}

interface errorAPIResData {
  message?: String;
}

interface APIResData extends walletAPIResData, netcheckAPIResData {
  _id: String;
  _rev: String;
}

interface APIResponse {
  data: APIResData;
}

type DispatchFunc = (dispatch: Action) => void;

const defaultNnContext:NnStore = merge({}, nnSchema);

export const nnReducer = (state:NnProviderValues, action: Action) => {
  const {payload, type = null} = action;
  let newState = null;
  let clonedState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case 'setAlert':
      clonedState.network.alert = {...clonedState.network.alert, ...payload}
      break;
    case 'initContext':
      clonedState = {...clonedState, ...payload};
      break;
    case 'setUserWallets':
      clonedState.user.wallets = payload;
      break;
    case 'setWalletTransactions':
      const walletId = clonedState.network.selectedAccount;
      const index = clonedState.user.wallets.map((e:any) => e.id).indexOf(walletId);
      clonedState.user.wallets[index].transactions = payload;
      break;
    case 'setUserWallets':
      clonedState.user.wallets = payload;
      break;
    case 'setUserContacts':
      clonedState.user.contacts = payload;
      break;
    case 'setNetwork':
      clonedState.network.location = payload;
      break;
  }
  newState = {...state, ...clonedState};
  newState && setCookieContext(newState);
  console.log(type, payload);
  return newState;
};

export const initContext = (dispatch: DispatchFunc) => async () => {
  let onLoadUserContext = {};
  const cookieContextData = getCookieContext();
  if (Object.keys(cookieContextData).length === 0) {
    // creates nnContext cookie if one does not exist
    const cookieJWTData = getCookieToken();
    const cookieDataArr = cookieJWTData.split('.');
    const cookieDataObj =  JSON.parse(window.atob(cookieDataArr[1]));
    //creates empt default context with just the userID
    const jwtContext =  {
        network: {
        selectedAccount: cookieDataObj.id,
      },
      user: {
        auth: {
          userid: cookieDataObj.id,
        }
      }
    };
    onLoadUserContext = merge.all([onLoadUserContext, defaultNnContext, jwtContext]);
    setCookieContext(onLoadUserContext);
  } else {
    onLoadUserContext = cookieContextData;
  }
  //dispatches context to state
  dispatch({
    type: 'initContext',
    payload: onLoadUserContext,
  })
}

export const fetchUserWallets = (dispatch: DispatchFunc) => async () => {
  const token = getCookieToken();
  const onSuccess = (response:APIResponse) => {
    const { data } = response;
    dispatch({
      type: 'setUserWallets',
      payload: data,
    });
    return data;
  };
  const onError = (err:netcheckAPIResData) => {
    const { message = 'Wallets failure' } = err;
    dispatch({
      type: 'setAlert',
      payload: {severity: 'error', message, show: true},
    })
    return err;
  };
  executeApi('wallets', {token}, onSuccess, onError);
}
export const fetchUserWalletHistory = (dispatch: DispatchFunc) => async (walletId:string) => {
  if (walletId === '' || typeof walletId === 'undefined') { return; }
  const token = getCookieToken();
  const onSuccess = (response:APIResponse) => {
    const { data } = response;
    dispatch({
      type: 'setWalletTransactions',
      payload: data,
    })
  };
  const onError = (err:netcheckAPIResData) => {
    const { message = 'Wallet History failure' } = err;
    dispatch({
      type: 'setAlert',
      payload: {severity: 'error', message, show: true},
    })
  };
  executeApi('walletHistory', {token}, onSuccess, onError);
};

export const fetchUserContacts = (dispatch: DispatchFunc) => async () => {
  const token = getCookieToken();
  const onSuccess = (response:APIResponse) => {
    const { data } = response;
    dispatch({
      type: 'setUserContacts',
      payload: data,
    })
  };
  const onError = (err:netcheckAPIResData) => {
    const { message = 'Contact failure' } = err;
    dispatch({
      type: 'setAlert',
      payload: {severity: 'error', message, show: true},
    })
  };
  executeApi('contacts', {token}, onSuccess, onError);
}

export const sendPayment = (dispatch: DispatchFunc) => (recipient:string, amount:string) => {
  const token = getCookieToken();
  const onSuccess = (response:APIResponse) => {
    dispatch({
      type: 'setAlert',
      payload: {severity: 'success', message: 'Payments Sucessful', show: true},
    })
  };
  const onError = (err:netcheckAPIResData) => {
    const { message = 'Payment Failure' } = err;
    dispatch({
      type: 'setAlert',
      payload: {severity: 'error', message, show: true},
    })
  };
  setTimeout(() => executeApi('pay', {token, recipient, amount}, onSuccess, onError), 2000);
}

export const requestPayment = (dispatch: DispatchFunc) => (id:string, amount:string) => {
  const token = getCookieToken();
  const onSuccess = (response:APIResponse) => {
    dispatch({
      type: 'setAlert',
      payload: {severity: 'success', message: 'Requests Sucessful', show: true},
    })
  };
  const onError = (err:netcheckAPIResData) => {
    const { message = 'Request Failure' } = err;
    dispatch({
      type: 'setAlert',
      payload: {severity: 'error', message, show: true},
    })
  };
  setTimeout(() => executeApi('request', {token, id, amount}, onSuccess, onError), 2000);
}

export const closeAlert = (dispatch: DispatchFunc) => async () => {
  dispatch({
    type: 'setAlert',
    payload: {show: false},
  })
};

export const fetchNetworkStatus = (dispatch: DispatchFunc) => async () => {
  const onSuccess = (response:APIResponse) => {
    dispatch({
      type: 'setNetwork',
      payload: response?.data?.message,
    })
  };
  const onError = (err:object) => {
    dispatch({
      type: 'setNetwork',
      payload: 'offline',
    })
  };
  executeApi('netCheck', {}, onSuccess, onError);
}

export const { Context, Provider } = DataContextCreator(
  nnReducer,
  { 
    closeAlert,
    fetchNetworkStatus,
    fetchUserWallets,
    fetchUserWalletHistory,
    fetchUserContacts,
    sendPayment,
    requestPayment,
    initContext,
  },
  defaultNnContext,
);