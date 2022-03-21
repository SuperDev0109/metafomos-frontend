import api from '../utils/api';
import { toast } from 'react-toastify';

export const getReferralLink = () => async dispatch => {
  try {
    const res = await api.get('/profile/getReferralLink');

    if (res.data === undefined || res.data === '') {
        document.querySelector('#referralLink').click();
    }

    dispatch({
        type: 'GET_REFERRAL_LINK',
        payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};

export const setReferralLink = (data) => async dispatch => {
    try {
        const res = await api.post('/profile/setReferralLink', data);
        
        toast.success('success', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
        // set alert
    } catch (err) {
      console.log(err);
    }
  };

  export const getLevel = () => async dispatch => {
    try {
        const res = await api.get('/profile/getLevel');

        dispatch({
            type: 'GET_LEVEL',
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
  };

  export const getLevelandFollow = () => async dispatch => {
    try {
        const res = await api.get('/profile/getLevelandFollow');
        const { level, level1_done, level2_done, follow1, follow2, follow3, follow4, follow5 } = res.data.user;

        switch (parseInt(level)) {
          case 0:
            document.getElementById('task1').style.display = 'block';
            document.getElementById("lv1").style.display = 'block'; //pass token btn
            break;
          case 1:
            document.getElementById('task2').style.display = 'block';
            parseInt(follow1) === 1 ? document.querySelector("#follow1").innerHTML = 'FOLLOWED' : document.querySelector("#follow1").innerHTML = 'FOLLOW';
            parseInt(follow2) === 1 ? document.querySelector("#follow2").innerHTML = 'FOLLOWED' : document.querySelector("#follow2").innerHTML = 'FOLLOW';
            parseInt(follow3) === 1 ? document.querySelector("#follow3").innerHTML = 'FOLLOWED' : document.querySelector("#follow3").innerHTML = 'FOLLOW';
            parseInt(follow4) === 1 ? document.querySelector("#follow4").innerHTML = 'FOLLOWED' : document.querySelector("#follow4").innerHTML = 'FOLLOW';
            parseInt(follow5) === 1 ? document.querySelector("#follow5").innerHTML = 'FOLLOWED' : document.querySelector("#follow5").innerHTML = 'FOLLOW';
  
            document.getElementById("lv2").style.display = 'block'; //pioneer token btn
            break;
          case 2:
            document.getElementById('task3').style.display = 'block';
            document.getElementById("lv3").style.display = 'block';
            break;
        }

        dispatch({
            type: 'GET_LEVEL',
            payload: level
        });
        dispatch({
          type: 'GET_FOLLOW_COUNT',
          payload: res.data.followCount
        });
    } catch (err) {
        console.log(err);
    }
  };

  export const setLevel = (formData) => async dispatch => {
    try {
        const res = await api.post('/profile/setLevel', formData);
        const { level } = res.data;
        
        dispatch({
            type: 'GET_LEVEL',
            payload: parseInt(level)
        });
    } catch (err) {
        console.log(err);
    }
  };

  export const setFollow = (formData) => async dispatch => {
    try {
      const res = await api.post('/profile/setFollow', formData);

      const { level, level1_done, level2_done } = res.data.user;

      console.log(formData.type);

      switch (formData.type) {
        case 1:
          formData.type === 1 ? document.querySelector("#follow1").innerHTML = 'FOLLOWED' : document.querySelector("#follow1").innerHTML = 'FOLLOW';
          break;
        case 2:
          formData.type === 2 ? document.querySelector("#follow2").innerHTML = 'FOLLOWED' : document.querySelector("#follow2").innerHTML = 'FOLLOW';
          break;
        case 3:
          formData.type === 3 ? document.querySelector("#follow3").innerHTML = 'FOLLOWED' : document.querySelector("#follow3").innerHTML = 'FOLLOW';
          break;
        case 4:
          formData.type === 4 ? document.querySelector("#follow4").innerHTML = 'FOLLOWED' : document.querySelector("#follow4").innerHTML = 'FOLLOW';
          break;
        case 5:
          formData.type === 5 ? document.querySelector("#follow5 ").innerHTML = 'FOLLOWED' : document.querySelector("#follow5").innerHTML = 'FOLLOW';
          break;
      }
      
      dispatch({
          type: 'GET_FOLLOW_COUNT',
          payload: res.data.followCount
      });
    } catch (err) {
        console.log(err);
    }
  }

  export const getUsers = () => async dispatch => {
    try {
        const res = await api.get('/profile/getUsers');
        
        dispatch({
            type: 'GET_USERS',
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
  };

