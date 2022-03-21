const initialState = {
   loading: false,
   account: null,
   smartContract: null,
   smartContractAddress: null,
   web3: null,
   errorMsg: ''
}

const blockchainReducer = (state = initialState, action) => {
   switch(action.type) {
      case 'CONNECTION_REQUEST':
         return {
            ...initialState,
            loading: true,
         };
      case 'CONNECTION_SUCCESS':
         return {
            ...state,
            loading: false,
            account: action.payload.account,
            smartContract: action.payload.smartContract,
            smartContractAddress: action.payload.smartContractAddress,
            // web3: action.payload.web3
         };
      case 'CONNECTION_FAILED':
         return {
            ...initialState,
            loading: false,
            errorMsg: action.payload
         };
      case 'UPDATE_ACCOUNT':
         return {
            ...state,
            account: action.payload.account,
         };
      case 'BLOCK_CLEAR':
         return {
            state
         };
         
      default:
         return state;
   }
}

export default blockchainReducer;