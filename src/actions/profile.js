import api from '../utils/api';
import { toast } from 'react-toastify';

// export const getReferralLink = () => async dispatch => {
//   try {
//     const res = await api.get('/profile/getReferralLink');

//     if (res.data === undefined || res.data === '') {
//         document.querySelector('#joinBtn').click();
//     }

//     dispatch({
//         type: 'GET_REFERRAL_LINK',
//         payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: 'AUTH_ERROR'
//     });
//   }
// };

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: 'USER_LOADED',
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
            break;
          case 1:
            document.getElementById('task2').style.display = 'block';
            if(parseInt(follow1) === 1) { document.querySelector("#follow1").innerHTML = 'FOLLOWED'; document.getElementById('follow1').setAttribute('class', 'mybtn1') } else { document.querySelector("#follow1").innerHTML = 'FOLLOW'; document.getElementById('follow1').setAttribute('class', 'mybtn2') }   
            if(parseInt(follow2) === 1) { document.querySelector("#follow2").innerHTML = 'FOLLOWED'; document.getElementById('follow2').setAttribute('class', 'mybtn1') } else { document.querySelector("#follow2").innerHTML = 'FOLLOW'; document.getElementById('follow2').setAttribute('class', 'mybtn2') }   
            if(parseInt(follow3) === 1) { document.querySelector("#follow3").innerHTML = 'FOLLOWED'; document.getElementById('follow3').setAttribute('class', 'mybtn1') } else { document.querySelector("#follow3").innerHTML = 'FOLLOW'; document.getElementById('follow3').setAttribute('class', 'mybtn2') }   
            if(parseInt(follow4) === 1) { document.querySelector("#follow4").innerHTML = 'FOLLOWED'; document.getElementById('follow4').setAttribute('class', 'mybtn1') } else { document.querySelector("#follow4").innerHTML = 'FOLLOW'; document.getElementById('follow4').setAttribute('class', 'mybtn2') }   
            if(parseInt(follow5) === 1) { document.querySelector("#follow5").innerHTML = 'FOLLOWED'; document.getElementById('follow5').setAttribute('class', 'mybtn1') } else { document.querySelector("#follow5").innerHTML = 'FOLLOW'; document.getElementById('follow5').setAttribute('class', 'mybtn2') }   
            break;
          case 2:
            document.getElementById('task3').style.display = 'block';
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
          if(formData.type === 1) { document.querySelector("#follow1").innerHTML = 'FOLLOWED'; document.getElementById('follow1').setAttribute('class', 'mybtn1'); } else { document.querySelector("#follow1").innerHTML = 'FOLLOW'; document.getElementById('follow1').setAttribute('class', 'mybtn2'); } 
          break;
        case 2:
          if(formData.type === 2) { document.querySelector("#follow2").innerHTML = 'FOLLOWED'; document.getElementById('follow2').setAttribute('class', 'mybtn1'); } else { document.querySelector("#follow2").innerHTML = 'FOLLOW'; document.getElementById('follow2').setAttribute('class', 'mybtn2'); } 
          break;
        case 3:
          if(formData.type === 3) { document.querySelector("#follow3").innerHTML = 'FOLLOWED'; document.getElementById('follow3').setAttribute('class', 'mybtn1'); } else { document.querySelector("#follow3").innerHTML = 'FOLLOW'; document.getElementById('follow3').setAttribute('class', 'mybtn2'); } 
          break;
        case 4:
          if(formData.type === 4) { document.querySelector("#follow4").innerHTML = 'FOLLOWED'; document.getElementById('follow4').setAttribute('class', 'mybtn1'); } else { document.querySelector("#follow4").innerHTML = 'FOLLOW'; document.getElementById('follow4').setAttribute('class', 'mybtn2'); } 
          break;
        case 5:
          if(formData.type === 5) { document.querySelector("#follow5").innerHTML = 'FOLLOWED'; document.getElementById('follow5').setAttribute('class', 'mybtn1'); } else { document.querySelector("#follow5").innerHTML = 'FOLLOW'; document.getElementById('follow5').setAttribute('class', 'mybtn2'); } 
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

  //profile actions

  export const savePersonalData = (formData) => async dispatch => {
    try {
      const res = await api.post('/profile/savePersonalData', formData);

      toast.success('success', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }) 

        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        });
    } catch (err) {
      console.log(err);
    }
  }


  //verify Link
  export const verifyLink = (formData) => async dispatch => {
    try {
      const res = await api.post('/auth/verifyLink', formData);
      if (res.data === 'success') {
        document.getElementById("verifyText").innerText = 'Email success verify';
      } else {
        document.getElementById("verifyText").innerText = 'Email not verified';
      }
    } catch (err) {
      console.log(err);
    }
  }
