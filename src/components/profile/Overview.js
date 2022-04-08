import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthFlag, resend } from '../../actions/auth';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../include/Footer';
//profile action
import { setReferralLink, getLevelandFollow, setLevel, setFollow } from '../../actions/profile';

const Overview = () => {
    const { isAuthenticated, authFlag}= useSelector(state => state.auth);
    const { avatar, register_type, email, date_form, firstname, lastname, verified, verifylink } = useSelector(state => state.auth.user);
    const { referrallink, level, followCount } = useSelector(state => state.profile);
    const blockchain = useSelector(state => state.blockchain);
    const [loading, setLoading] = useState(false);
    const [accessLabel, setAccessLabel] = useState('');
    const [legalnameBoolState, setLegalnameBoolState] = useState(null);
    const dispatch = useDispatch();

    useEffect( async () => {
        const body = document.querySelector('#root');
        body.scrollIntoView({
            behavior: 'smooth'
        }, 500);

        if (authFlag) {
            document.querySelector('#joinBtn').click();
            dispatch(setAuthFlag());
        } 

        //referral Link part
        dispatch(getLevelandFollow());
        //referral Link part end

      }, []);

    useEffect(() => {

        switch (parseInt(level)) {
            case 0:
                setAccessLabel('');
                break;
            case 1:
                document.getElementById('lv1Img').style.filter = 'unset';
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOGUEST</span>);
                break;
            case 2:
                document.getElementById('lv1Img').style.filter = 'unset';
                document.getElementById('lv2Img').style.filter = 'unset';
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOPIONEER</span>);
                break;
            case 3:
                document.getElementById('lv1Img').style.filter = 'unset';
                document.getElementById('lv2Img').style.filter = 'unset';
                document.getElementById('lv3Img').style.filter = 'unset';
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOSCOUT</span>);
                break;
            case 4:
                document.getElementById('lv1Img').style.filter = 'unset';
                document.getElementById('lv2Img').style.filter = 'unset';
                document.getElementById('lv3Img').style.filter = 'unset';
                document.getElementById('lv4Img').style.filter = 'unset';
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOSAPIEN</span>);
                break;
            case 5:
                document.getElementById('lv1Img').style.filter = 'unset';
                document.getElementById('lv2Img').style.filter = 'unset';
                document.getElementById('lv3Img').style.filter = 'unset';
                document.getElementById('lv4Img').style.filter = 'unset';
                document.getElementById('lv5Img').style.filter = 'unset';
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOSQUAD</span>);
                break;
            default:
                setAccessLabel('');
                break;
        }
    }, [level])

    useEffect( async () => {
        if (firstname !== '' && lastname !== '' && firstname && lastname) {
            setLegalnameBoolState(true);
        } else {
            setLegalnameBoolState(false);
        }
    }, [firstname, lastname])

    if (!isAuthenticated && isAuthenticated != null) {
        return <Navigate to="/login" />
    }

    let logUserImage;
    if (isAuthenticated) {
        switch (parseInt(level)) {
            case 0:
                if (register_type == 'NORMAL_SIGNUP') {
                    logUserImage = (<img src={`../assets/images/users/${avatar}`} width="159px" height="159px" alt="" style={{ borderRadius: '50%' }} />)
                } else {
                    logUserImage = (<img src={`${avatar}`} width="159px" height="159px" alt="" style={{ borderRadius: '50%' }} />)
                }
                break;
            case 1:
                logUserImage = (<img src='../assets/custom/images/lv1.png' width="159px" height="159px" alt="" style={{ borderRadius: '50%' }} />)
                break;
            case 2:
                logUserImage = (<img src='../assets/custom/images/lv2.png' width="159px" height="159px" alt="" style={{ borderRadius: '50%' }} />)
                break;
            default:
                break;
        }
    } else {
        logUserImage = (<></>)
    }

    if (referrallink == '') {
        console.log('sdf');
    }

    const validateGetPassToken = () => {
        if(!verified || !legalnameBoolState) {
            toast.warning('Please finish your task.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            return false;
        } else {
            return true;
        }
    }

    const getPassToken = async () => {

        if (!validateGetPassToken()) return;

        if (!blockchain.account) {
            toast.warning('Please connect to your wallet.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })  

            return;
        }
        //show the Get PassToken part
        const balanceOfPassToken = await blockchain.smartContract.methods.balanceOfPassToken().call({
            from : blockchain.account
        });

        console.log(balanceOfPassToken);

        // if ( balanceOfPassToken == 0 ) { 
            mintPassToken();
        // } 
        // show the Get PassToken part end
    }

    const validateGetPioneerToken = () => {
        if(parseInt(followCount) !== 5) {
            toast.warning('Please follow 5 social sites.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }) 
            return false;
        } else {
            return true;
        }
    }

    const getPioneerToken = async () => {

        if(!validateGetPioneerToken()) return;

        if (!blockchain.account) {
            
            toast.warning('Please connect to your wallet.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
            return;
        }
        //show the Get PassToken part
        const balanceOfPioneerToken = await blockchain.smartContract.methods.balanceOfPioneerToken().call({
            from : blockchain.account
        });

        console.log(balanceOfPioneerToken);

        // if ( balanceOfPioneerToken == 0 ) { 
            mintPioneerToken();
        // } else {
            // alert('You have already PioneerToken!');
        // }
        // show the Get PassToken part end
    }

    const onReferralSubmit = async () => {
        const referralInputLink = document.querySelector('#referralInputLink').value;
        dispatch(setReferralLink({referralLink :referralInputLink}));
    }

    const mintPassToken = async () => {
        setLoading(true);
        const transaction = await blockchain.smartContract.methods
           .mintPassToken()
          .send({
              gasLimit: 285000,
              to: blockchain.smartContractAddress, // the address of your contract
              from: blockchain.account,
          })
          .once("error", (err) => {
                console.log(err);
                
                toast.error('Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }) 
              setLoading(false);
          })
          .then((receipt) => {
                toast.success('Your PassToken has been successfully minted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }) 
                setLoading(false);
                dispatch(setLevel({ level: 1 }));
                document.getElementById("task1").style.display = 'none';
                document.getElementById("task2").style.display = 'block';
                //display mint level token


          }); // Minting the token
      } 

      const mintPioneerToken = async () => {
        setLoading(true);
        const transaction = await blockchain.smartContract.methods
        .mintPioneerToken()
        .send({
            gasLimit: 285000,
            to: blockchain.smartContractAddress, // the address of your contract
            from: blockchain.account,
        })
        .once("error", (err) => {
            console.log(err);
            toast.error('Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
            setLoading(false);
        })
        .then((receipt) => {
            toast.success('Your PassToken has been successfully minted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
            setLoading(false);
            dispatch(setLevel({ level: 2 }));
            document.getElementById("task2").style.display = 'none';
            document.getElementById("task3").style.display = 'block';
            //loading
            //set the level 1
            //display mint level token


        }); // Minting the token
      } 

    const setFollowSite = (type) => {
        console.log(type);
        dispatch(setFollow({ type }))
    }

    const onResend = async () => {
        await dispatch(resend());
    }


    return (
        <Fragment>
            <ToastContainer />
            {/* <!-- Breadcrumb Area Start --> */}
            <section className="breadcrumb-area gamer-profile">
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                        <div className="col-lg-7">
                            <ul className="breadcrumb-list">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">Players</a>
                                </li>
                                <li>
                                    <a href="#">Gamer's profile</a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-5'>
                            { accessLabel }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bc-content">
                                <div className="left">
                                    <h3>{ email }</h3>
                                    <p>Member Since { date_form }</p>
                                </div>
                                <div className="right">
                                    <div className="player-wrapper">
                                        <span>Players</span>
                                        <h6>28</h6>
                                    </div>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <img src="../assets/images/player/sm1.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="../assets/images/player/sm2.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="../assets/images/player/sm3.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="../assets/images/player/sm4.png" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <span>
                                                32+
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Breadcrumb Area End --> */}

            {/* <!-- Gamer Profile area Start --> */}
            <section className="gamer-profile-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="gamer-profile-top-inner">
                                <div className="profile-photo">
                                    <div className="img">
                                        {logUserImage}
                                    </div>
                                    <div className="mybadge">
                                        <img src="../assets/images/gamer/badge.png" alt="" />
                                        <span> { level }</span>
                                    </div>
                                </div>
                                <div className="g-p-t-counters">
                                    <div className="g-p-t-single-counter">
                                        <div className="img">
                                            <img src="../assets/images/gamer/c1.png" alt="" />
                                        </div>
                                        <div className="content">
                                            <h4>687</h4>
                                            <span>Total Match</span>
                                        </div>
                                    </div>
                                    <div className="g-p-t-single-counter">
                                        <div className="img">
                                            <img src="../assets/images/gamer/c2.png" alt="" />
                                        </div>
                                        <div className="content">
                                            <h4>687</h4>
                                            <span>Win Ratio</span>
                                        </div>
                                    </div>
                                    <div className="g-p-t-single-counter">
                                        <div className="img">
                                            <img src="../assets/images/gamer/c3.png" alt="" />
                                        </div>
                                        <div className="content">
                                            <h4>687</h4>
                                            <span>Achievements</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="msg-btn-wrapper">
                                    <a href="#" className="msg-btn"  data-toggle="modal" data-target="#gamer-chat">
                                        <img src="../assets/images/gamer/envelop.png" alt="" />
                                        <span>Message</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Gamer Profile  area End --> */}

            {/* <!-- User Menu Area Start --> */}
            <div className="usermenu-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="usermenu-inner">
                                <div className="left-area">
                                    <ul>
                                        <li>
                                            <Link to="/profile/overview" className="active">Overview</Link>
                                        </li>
                                        <li>
                                            <Link to="/profile/profile">Profile</Link>
                                        </li>
                                        <li>
                                            <a href="gamer-profile3.html">statistics</a>
                                        </li>
                                        <li>
                                            <a href="gamer-profile4.html">play history</a>
                                        </li>
                                        <li>
                                            <a href="gamer-profile5.html">achievement</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="right-area">
                                    <a href="#" className="mybtn2">Follow</a>
                                    <a href="#" className="mybtn2">Invite to Team</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	        {/* <!-- User Menu Area End --> */}

            {/* <!-- User Main Content Area Start --> */}
            <section className="user-main-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4">
                            <aside>
                                <div className="about">
                                    <h4>About Me</h4>
                                    <p>
                                        Nothing Interesting hasn't been written here, what a pity it is quite a nice field 
                                    </p>
                                    <ul>
                                        <li>
                                            <p><i className="fas fa-map-marked-alt"></i> Bern Switzerland</p>
                                        </li>
                                        <li>
                                            <p> <i className="fas fa-calendar-alt"></i> Member Since 08 Jan 2021</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="achievment-area">
                                    <div className="header-area">
                                        <h4>Achievements</h4>
                                        <a href="#">All Rewards <i className="fas fa-chevron-right"></i></a>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className="s-a">
                                                <img src="../assets/custom/images/lv1_small.png" id="lv1Img" style={{ filter: 'grayscale(100%)' }} alt="" />
                                                <span>Guest</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="s-a">
                                                <img src="../assets/custom/images/lv2_small.png" id="lv2Img" style={{ filter: 'grayscale(100%)' }} alt="" />
                                                <span>Pioneer</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="s-a">
                                                <img src="../assets/custom/images/lv3_small.png" id="lv3Img" style={{ filter: 'grayscale(100%)' }} alt="" />
                                                <span>Scout</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="s-a">
                                                <img src="../assets/custom/images/lv4_small.png" id="lv4Img" style={{ filter: 'grayscale(100%)' }} alt="" />
                                                <span>Sapien</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="s-a">
                                                <img src="../assets/custom/images/lv5_small.png" id="lv5Img" style={{ filter: 'grayscale(100%)' }} alt="" />
                                                <span>Squad</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="rank-area">
                                    <div className="top-area">
                                        <div className="left">
                                            <img src="../assets/images/gamer/lavel.png" alt="" />
                                        </div>
                                        <div className="right">
                                            <p>Rank: <span>12</span></p>
                                        </div>
                                    </div>
                                    <div className="bottom-area">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}>75%</div>
                                        </div>
                                        <a href="#">View all Ranks <i className="fas fa-chevron-right"></i></a>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        <div className="col-xl-9 col-lg-8">
                            <main>
                                <div className="main-box" id="task1" style={{ display: 'none' }}>
                                    <div className="header-area">
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4>Mint your PassToken</h4>
                                            <span style={{ float: 'right' }} onClick={() => getPassToken()} id="lv1" className="mybtn2">{ loading ? 'Minting...' : 'PassToken' }</span>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="game-info">
                                                            <img src="../assets/images/gamer/g2.png" alt="" />
                                                            <div className="content">
                                                                <h6>Verify</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="game-info">
                                                            <div className="content">
                                                                <h6>Verify your email </h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {verified ? (
                                                            <span className="mybtn1" style={{ width: '150px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>Verified</span>
                                                        ) : (
                                                            <span className="mybtn2" onClick={() => onResend()} style={{ width: '150px', textAlign: 'center', fontSize: '13px', padding: '10px 25px', cursor: 'pointer' }}>resend</span>
                                                        )}
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="game-info">
                                                            <img src="../assets/images/gamer/g2.png" alt="" />
                                                            <div className="content">
                                                                <h6>Legal Name </h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="game-info">
                                                            <div className="content">
                                                                <h6>Enter your legal first and last name</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {legalnameBoolState ? (
                                                            <span className="mybtn1" style={{ width: '150px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>performed</span>
                                                        ) : (
                                                            <Link to="/profile/profile" className="mybtn2" style={{ width: '150px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>go</Link>
                                                        ) }
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="main-box" id="task2" style={{ display: 'none' }}>
                                    <div className="header-area">
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4>Mint your Access Token</h4>
                                            <span style={{ float: 'right' }} onClick={() => getPioneerToken()} id="lv2" className="mybtn2">{ loading ? 'Minting...' : 'PioneerToken LV2' }</span>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <div className="game-info">
                                                        <img src="../assets/images/gamer/g1.png" alt="" />
                                                        <div className="content">
                                                            <h6>Twitter</h6>
                                                            <span>Twitter Following</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="players">
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm1.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm2.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm3.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm4.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    32+
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Win Ratio</span>
                                                        <h4>63%</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Elo Ratings </span>
                                                        <h4>2368</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="https://twitter.com/MetaFomos?ref_src=twsrc%5Etfw" className="mybtn2" onClick={() => setFollowSite(1)} target="_blank" id="follow1" style={{ width: '125px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>Follow</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="game-info">
                                                        <img src="../assets/images/gamer/g2.png" alt="" />
                                                        <div className="content">
                                                            <h6>Retweet</h6>
                                                            <span>Reweet Following</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="players">
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm1.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm2.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm3.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm4.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    32+
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Win Ratio</span>
                                                        <h4>63%</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Elo Ratings </span>
                                                        <h4>2368</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="https://twitter.com/intent/retweet?tweet_id=463440424141459456&via=MetaFomos&hashtags=MetaFomos" className="mybtn2" onClick={() => setFollowSite(2)} target="_blank" id="follow2" style={{ width: '125px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>Follow</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="game-info">
                                                        <img src="../assets/images/gamer/g3.png" alt="" />
                                                        <div className="content">
                                                            <h6>Instagram</h6>
                                                            <span>Instagram Following</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="players">
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm1.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm2.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm3.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm4.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    32+
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Win Ratio</span>
                                                        <h4>63%</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Elo Ratings </span>
                                                        <h4>2368</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="https://www.instagram.com/metafomos" className="mybtn2" onClick={() => setFollowSite(3)} target="_blank" id='follow3' style={{ width: '125px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>Follow</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="game-info">
                                                        <img src="../assets/images/gamer/g4.png" alt="" />
                                                        <div className="content">
                                                            <h6>Discord</h6>
                                                            <span>Discord Following</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="players">
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm1.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm2.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm3.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm4.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    32+
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Win Ratio</span>
                                                        <h4>63%</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Elo Ratings </span>
                                                        <h4>2368</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="https://discord.com/widget?id=944198467440500757" className="mybtn2" onClick={() => setFollowSite(4)} target="_blank" id="follow4" style={{ width: '125px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>Follow</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="game-info">
                                                        <img src="../assets/images/gamer/g5.png" alt="" />
                                                        <div className="content">
                                                            <h6>Facebook</h6>
                                                            <span>Facebook Following</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="players">
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm1.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm2.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm3.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <img src="../assets/images/player/sm4.png" alt="" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    32+
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Win Ratio</span>
                                                        <h4>63%</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="ratio">
                                                        <span>Elo Ratings </span>
                                                        <h4>2368</h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="https://www.facebook.com/metafomos" className="mybtn2" onClick={() => setFollowSite(5)} target="_blank" id="follow5" style={{ width: '125px', textAlign: 'center', fontSize: '13px', padding: '10px 25px' }}>Follow</a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="main-box" id="task3" style={{ display: 'none' }}>
                                    <div className="header-area">
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4>Mint your Scout Token</h4>
                                            <span style={{ float: 'right' }} id="lv3" className="mybtn2">{ loading ? 'Minting...' : 'ScoutToken LV3' }</span>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- User Main Content Area End --> */}

            {/* <button id='referralLink' data-toggle="modal" data-target="#referralModal" hidden>Referral Link</button> */}
            {/* <!--  input the referral Link --> */}
            {/* <div className="modal fade login-modal sign-in" id="referralModal" tabIndex="-1" role="dialog" aria-labelledby="signin" aria-hidden="true" style={{background: 'rgba(19,11,33,.85)',backdropFilter: 'blur(40px)'}}>
                    <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content" style={{ boxShadow: 'none', background: '#261858' }}>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ top: '4px', right: '10px' }}><span aria-hidden="true" style={{ fontSize: '48px',fontWeight: '100', border:'none' }}>&times;</span></button>
                        <div className="modal-body">
                                <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-m_login" role="tabpanel" aria-labelledby="pills-m_login-tab">

                                    <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', margin: '20px 0' }}>
                                        <img src='../assets/custom/images/network.png' />
                                    </div>

                                    <div className="header-area">
                                        <h6 className="title" style={{textTransform: 'unset', fontSize: '28px'}}>Referral Address</h6>
                                        <span style={{ fontSize: '17px' }}>Please input the Referral Address here</span>
                                    </div>

                                    <div className="form-area" style={{ padding: '0 50px' }}>
                                        <form action="#" method="POST">
                                            
                                            <div className="form-group">
                                                <input id="referralInputLink" className='spec_btn_input' style={{ marginBottom: '0px' }} />
                                                <button onClick={() => onReferralSubmit()} type="button" data-dismiss="modal" className="mybtn2" style={{textTransform: 'unset'}}>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                    
                                </div>
                                </div>
                        </div>
                    </div>
                    </div>
                </div> */}
                {/* <!-- input the referral Link End --> */}

                <button id='joinBtn' data-toggle="modal" data-target="#joinModal" hidden>Thanks join modal</button>
                {/* <!--  input the referral Link --> */}
                <div className="modal fade login-modal sign-in" id="joinModal" tabIndex="-1" role="dialog" aria-labelledby="signin" aria-hidden="true" style={{background: 'rgba(19,11,33,.85)', backdropFilter: 'blur(40px)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content" style={{ boxShadow: 'none', background: '#261858', width: '800px', height: '700px', backgroundImage: "url('../assets/custom/images/thanks.png')", backgroundSize: 'cover' }}>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ top: '4px', right: '10px' }}><span aria-hidden="true" style={{ fontSize: '48px',fontWeight: '100', border:'none' }}>&times;</span></button>
                        <div className="modal-body">
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-m_login" role="tabpanel" aria-labelledby="pills-m_login-tab">

                                        {/* <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', margin: '20px 0' }}>
                                            <img src='../assets/custom/images/thanks.png' />
                                        </div> */}

                                        <div className="form-area" style={{ padding: '0 50px' }}>
                                            <form action="#" method="POST">
                                                
                                                <div className="form-group">
                                                    <button type="button" data-dismiss="modal" className="mybtn2" style={{textTransform: 'unset', position: 'absolute', bottom: '0', left: '50%', transform: 'translate(-50%, -50%)'}}>Close</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* <!-- input the referral Link End --> */}
            <Footer />
        </Fragment>
    )
}

export default Overview;