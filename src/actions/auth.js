import api from '../utils/api';
import { toast } from 'react-toastify';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: 'AUTH_ERROR'
    // });
  }
};

//resend
export const resend = () => async dispatch => {
  try {
    const res = await api.post('/auth/resend');
    console.log(res);
    toast.success('success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })  
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
}

// Register User
export const registerByAdmin = formData => async dispatch => {
  try {
    const res = await api.post('/auth/register', formData);

    // dispatch({
    //   type: 'REGISTER_SUCCESS',
    //   payload: res.data
    // });
    // dispatch(loadUser());
    //get users
    const res_user = await api.get('/profile/getUsers');
        
    dispatch({
        type: 'GET_USERS',
        payload: res_user.data
    });

    toast.success('success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })  
    //get users
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

//update user
export const editUser = formData => async dispatch => {
  try {
    const res = await api.post('/auth/editUser', formData);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
    //get users
    const res_user = await api.get('/profile/getUsers');
        
    dispatch({
        type: 'GET_USERS',
        payload: res_user.data
    });

    toast.success('success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })  
    //get users
    
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

//delete user
export const deleteUser = formData => async dispatch => {
  try {
    const res = await api.post('/auth/deleteUser', formData);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
    //get users
    const res_user = await api.get('/profile/getUsers');
        
    dispatch({
        type: 'GET_USERS',
        payload: res_user.data
    });

    toast.success('success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })  
    //get users
    
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/auth/register', formData);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

// Social Media User Register
export const socialMediaSignUp = formData => async dispatch => {
  try {
    const res = await api.post('/auth/sm-signup', formData);

    dispatch({
      type: 'SM_REGISTER_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
    dispatch({
      type: 'SM_REGISTER_FAIL'
    });
  }
};

// Login User
export const login = formData => async dispatch => {

  try {
    const res = await api.post('/auth/login', formData);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
    }

    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

export const socialMediaLogin = formData => async dispatch => {

  try {
    const res = await api.post('/auth/sm-login', formData);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
    }

    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: 'LOGOUT'
  });
  dispatch({
    type: 'BLOCK_CLEAR'
  })
};

export const setAuthFlag = () => ({ type: 'SET_AUTH_FLAG' });