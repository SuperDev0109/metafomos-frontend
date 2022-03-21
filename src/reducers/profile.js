  
const initialState = {
  level: 0,
  followCount: 0,
  users:[],
  user: {
    email: '',
    address: '',
    country: '',
    zipcode: '',
    password: '',
    firstname: '',
    lastname: '',
    mobilenumber: '',
    register_type: '',
    google_auth_user_id: '',
    fb_auth_user_id: '',
    avatar: '',  
    wallet: '',
    level: '',
    level1_done: '',
    level2_done: '',
    referrallink: '',
    date_form: '',
    follow1: '',
    follow2: '',
    follow3: '',
    follow4: '',
    follow5: ''
  }
};
  
  function profileReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'GET_REFERRAL_LINK':
        return {
          ...state,
          referralLink: payload
        };
      case 'GET_LEVEL':
        return {
          ...state,
          level:payload
        }
      case 'GET_FOLLOW_COUNT':
        return {
          ...state, 
          followCount: payload
        }
      case 'GET_USERS':
        return {
          ...state,
          users: payload
        }
      default:
        return state;
    }
  }
  
  export default profileReducer;
  