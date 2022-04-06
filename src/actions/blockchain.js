import Web3EthContract from 'web3-eth-contract';
import Web3 from 'web3';
import SmartContract from '../contracts/SampleContract.json';

const connectRequest = () => {
   return {
      type: 'CONNECTION_REQUEST',
   };
};

const connectSuccess = payload => {
   return {
      type: 'CONNECTION_SUCCESS',
      payload: payload,
   };
};

const connectFailed = payload => {
   return {
      type: 'CONNECTION_FAILED',
      payload: payload
   };
};

const updateAccountRequest = payload => {
   return {
      type: 'UPDATE_ACCOUNT',
      payload: payload
   };
};

export const connect = () => {
   console.log('--:');
   return async dispatch => {
      dispatch(connectRequest());
      const { ethereum } = window;
      const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
      if (metamaskIsInstalled) {
         Web3EthContract.setProvider(ethereum);
         let web3 = new Web3(ethereum);
         try {
            const accounts = await ethereum.request({
               method: 'eth_requestAccounts',
            });
            const networkId = await ethereum.request({
               method: 'net_version',
            });
            console.log(networkId);
            console.log(accounts[0]);
            if(networkId == 4) {
               const SmartContractObj = new Web3EthContract(
                  SmartContract, //abi 
                  '0xfD4CA4fCB8f3D328eC3281122D5C5A01c0193006' // ** IMPORTANT ** PASTE CONTRACT ADDRESS
               );
               dispatch(
                  connectSuccess({
                     account: accounts[0],
                     smartContract: SmartContractObj,
                     smartContractAddress: '0xfD4CA4fCB8f3D328eC3281122D5C5A01c0193006'
                     // web3: web3
                  })
               );
               
               //Add listeners start
               ethereum.on('accountsChanged', accounts => {
                  dispatch(updateAccount(accounts[0]));
               });
               ethereum.on('chainChanged', (chainId) => {
                  if(chainId != 0x4)
                     window.location.reload();
               });
               ethereum.on('disconnect', accounts => {
                  // alert("fasd");
                  dispatch(updateAccount(accounts[0]));
               });
               //Add listeners end
            } else {
               dispatch(connectFailed('Change network to the Rinkeby Test Network'))
            }
         } catch (err) {
            dispatch(connectFailed('Something went wrong.'));
         }
      } else {
         dispatch(connectFailed('Please install Metamask.'));
      }
   };
};

export const updateAccount = account => {
   return async dispatch => {
      dispatch(updateAccountRequest({ account: account }));
   };
};