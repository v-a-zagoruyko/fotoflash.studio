import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { history } from '../../utils/history';
import {
  IBooking,
  IUser,
  ILogin,
  IUserLoginRequestingAction,
  IUserLoginFailureAction,
  IUserLoginSuccessAction,
  IUserCreateRequestingAction,
  IUserCreateFailureAction,
  IUserCreateSuccessAction,
  IUserFetchRequestingAction,
  IUserFetchFailureAction,
  IUserFetchSuccessAction,
  IUserPatchRequestingAction,
  IUserPatchFailureAction,
  IUserPatchSuccessAction,
  IUserBookingListRequestingAction,
  IUserBookingListFailureAction,
  IUserBookingListSuccessAction,
  IUserBookingCreateRequestingAction,
  IUserBookingCreateFailureAction,
  IUserBookingCreateSuccessAction,
  IUserBookingTimeRequestingAction,
  IUserBookingTimeFailureAction,
  IUserBookingTimeSuccessAction,
} from './types';

export const loginUser: ActionCreator<ThunkAction<
  Promise<IUserLoginSuccessAction | IUserLoginFailureAction>,
  null,
  null,
  IUserLoginSuccessAction | IUserLoginFailureAction
>> = (credentials: { email: string; password: string }) => async (dispatch: Dispatch) => {
  const userRequest: IUserLoginRequestingAction = {
    type: 'USER_LOGIN_REQUESTING',
  };
  dispatch(userRequest);

  try {
    const { data }: { data: ILogin } = await axios.post('http://admin.fotoflash.studio/api/auth/login/', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userSuccess: IUserLoginSuccessAction = {
      data,
      type: 'USER_LOGIN_SUCCESS',
    };

    localStorage.setItem('token', `Bearer ${data.token}`);
    history.push('/profile/personal');

    return dispatch(userSuccess);
  } catch (error) {
    const userFailure: IUserLoginFailureAction = {
      error,
      type: 'USER_LOGIN_FAILURE',
    };

    toast.error(error.response.data.detail);

    return dispatch(userFailure);
  }
};

export const createUser: ActionCreator<ThunkAction<
  Promise<IUserCreateSuccessAction | IUserCreateFailureAction>,
  null,
  null,
  IUserCreateSuccessAction | IUserCreateFailureAction
>> = (info: IUser) => async (dispatch: Dispatch) => {
  const userRequest: IUserCreateRequestingAction = {
    type: 'USER_CREATE_REQUESTING',
  };
  dispatch(userRequest);

  try {
    await axios.post('http://admin.fotoflash.studio/api/users/', info, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userSuccess: IUserCreateSuccessAction = {
      type: 'USER_CREATE_SUCCESS',
    };

    toast.success('Вы успешно зарегистрированы!');
    dispatch(loginUser({ email: info.email, password: (info as any).password }) as any);

    return dispatch(userSuccess);
  } catch (error) {
    const userFailure: IUserCreateFailureAction = {
      error,
      type: 'USER_CREATE_FAILURE',
    };

    toast.error(error.response.data.detail);

    return dispatch(userFailure);
  }
};

export const fetchUser: ActionCreator<ThunkAction<
  Promise<IUserFetchSuccessAction | IUserFetchFailureAction>,
  null,
  null,
  IUserFetchSuccessAction | IUserFetchFailureAction
>> = () => async (dispatch: Dispatch) => {
  const userRequest: IUserFetchRequestingAction = {
    type: 'USER_FETCH_REQUESTING',
  };
  dispatch(userRequest);

  try {
    const { data }: { data: any } = await axios.get('http://admin.fotoflash.studio/api/auth/user/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const user = await axios.get(`http://admin.fotoflash.studio/api/users/${data.pk}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const userSuccess: IUserFetchSuccessAction = {
      user: user.data,
      type: 'USER_FETCH_SUCCESS',
    };

    return dispatch(userSuccess);
  } catch (error) {
    const userFailure: IUserFetchFailureAction = {
      error,
      type: 'USER_FETCH_FAILURE',
    };

    toast.error(error.response.data.detail);
    localStorage.clear();
    history.push('/');

    return dispatch(userFailure);
  }
};

export const patchUser: ActionCreator<ThunkAction<
  Promise<IUserPatchSuccessAction | IUserPatchFailureAction>,
  null,
  null,
  IUserPatchSuccessAction | IUserPatchFailureAction
>> = (user: IUser) => async (dispatch: Dispatch) => {
  const userRequest: IUserPatchRequestingAction = {
    type: 'USER_PATCH_REQUESTING',
  };
  dispatch(userRequest);

  try {
    const { data }: { data: any } = await axios.get('http://admin.fotoflash.studio/api/auth/user/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const newUser = await axios.patch(`http://admin.fotoflash.studio/api/users/${data.pk}/`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const userSuccess: IUserPatchSuccessAction = {
      user: newUser.data,
      type: 'USER_PATCH_SUCCESS',
    };

    return dispatch(userSuccess);
  } catch (error) {
    const userFailure: IUserPatchFailureAction = {
      error,
      type: 'USER_PATCH_FAILURE',
    };

    toast.error(error.response.data.detail);

    return dispatch(userFailure);
  }
};

export const fetchUserBookingList: ActionCreator<ThunkAction<
  Promise<IUserBookingListSuccessAction | IUserBookingListFailureAction>,
  null,
  null,
  IUserBookingListSuccessAction | IUserBookingListFailureAction
>> = () => async (dispatch: Dispatch) => {
  const userRequest: IUserBookingListRequestingAction = {
    type: 'USER_BOOKING_LIST_REQUESTING',
  };
  dispatch(userRequest);

  try {
    const { data }: { data: IBooking[] } = await axios.get('http://admin.fotoflash.studio/api/booking/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const userSuccess: IUserBookingListSuccessAction = {
      list: data,
      type: 'USER_BOOKING_LIST_SUCCESS',
    };

    return dispatch(userSuccess);
  } catch (error) {
    const userFailure: IUserBookingListFailureAction = {
      error,
      type: 'USER_BOOKING_LIST_FAILURE',
    };

    toast.error(error.response.data.detail);

    return dispatch(userFailure);
  }
};

export const createUserBooking: ActionCreator<ThunkAction<
  Promise<IUserBookingCreateSuccessAction | IUserBookingCreateFailureAction>,
  null,
  null,
  IUserBookingCreateSuccessAction | IUserBookingCreateFailureAction
>> = (booking: IBooking) => async (dispatch: Dispatch) => {
  const userRequest: IUserBookingCreateRequestingAction = {
    type: 'USER_BOOKING_CREATE_REQUESTING',
  };
  dispatch(userRequest);

  try {
    await axios.post('http://admin.fotoflash.studio/api/booking/', booking, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const userSuccess: IUserBookingCreateSuccessAction = {
      type: 'USER_BOOKING_CREATE_SUCCESS',
    };

    // history.push('/profile/booking')

    return dispatch(userSuccess);
  } catch (error) {
    const userFailure: IUserBookingCreateFailureAction = {
      error,
      type: 'USER_BOOKING_CREATE_FAILURE',
    };

    toast.error(error.response.data.detail);

    return dispatch(userFailure);
  }
};

export const fetchUserBookingTime: ActionCreator<ThunkAction<
  Promise<IUserBookingTimeSuccessAction | IUserBookingTimeFailureAction>,
  null,
  null,
  IUserBookingTimeSuccessAction | IUserBookingTimeFailureAction
>> = (date: string, area: number) => async (dispatch: Dispatch) => {
  const userRequest: IUserBookingTimeRequestingAction = {
    type: 'USER_BOOKING_TIME_REQUESTING',
  };
  dispatch(userRequest);

  try {
    const { data }: { data: IBooking[] } = await axios.get(
      `http://admin.fotoflash.studio/api/locationrent/?id=${area}&date=${date}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const userSuccess: IUserBookingTimeSuccessAction = {
      list: data,
      type: 'USER_BOOKING_TIME_SUCCESS',
    };

    return dispatch(userSuccess);
  } catch (error) {
    const userFailure: IUserBookingTimeFailureAction = {
      error,
      type: 'USER_BOOKING_TIME_FAILURE',
    };
    toast.error(error.response.data.detail);

    return dispatch(userFailure);
  }
};
