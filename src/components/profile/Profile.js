import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthFlag } from '../../actions/auth';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../include/Footer';
import { getLevelandFollow, savePersonalData } from '../../actions/profile';

const Profile = () => {
    const { isAuthenticated, authFlag}= useSelector(state => state.auth);
    const { avatar, register_type, email, date_form, firstname, lastname } = useSelector(state => state.auth.user);
    const { referrallink, level, followCount } = useSelector(state => state.profile);

    const [formData, setFormData] = useState({
         g_firstname: '', 
         g_lastname: '',
    });
    const [accessLabel, setAccessLabel] = useState('');
    const dispatch = useDispatch();

    const { g_firstname, g_lastname } = formData;

    useEffect( async () => {
        const body = document.querySelector('#root');
        body.scrollIntoView({
            behavior: 'smooth'
        }, 500);

        //referral Link part
        dispatch(getLevelandFollow());
        //referral Link part end

        // from db and display the lv1~lv5 button.
        // from db and display the lv1~lv5 button end.
      }, []);


    useEffect(() => {

        switch (parseInt(level)) {
            case 0:
                setAccessLabel('');
                break;
            case 1:
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOGUEST</span>);
                break;
            case 2:
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOPIONEER</span>);
                break;
            case 3:
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOSCOUT</span>);
                break;
            case 4:
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOSAPIEN</span>);
                break;
            case 5:
                setAccessLabel(<span style={{ color: 'white', fontSize: '30px', float: 'right', fontWeight: '700' }}> <span style={{ fontSize: '20px' }}>ACCESS LEVEL</span> &nbsp; FOMOSQUAD</span>);
                break;
            default:
                setAccessLabel('');
                break;
        }
    }, [level])

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

     const onChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     }

    const onPersonalEdit = () => {
          const editBtn = document.querySelector("#editBtn");
          editBtn.click();
    }

    const onPersonalAction = () => {
          const data = {
               firstname: g_firstname,
               lastname: g_lastname
          }
          dispatch(savePersonalData(data));
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
                                            <Link to="/profile/overview">Overview</Link>
                                        </li>
                                        <li>
                                            <Link to="/profile/profile" className="active">Profile</Link>
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
                              <div className="col-xl-12">
                                   <main>
                                        <div className="main-box u-setting-area">
                                             <div className="header-area">
                                                  <h4>Setting</h4>
                                             </div>
                                             <div className="row justify-content-center">
                                                  <div className="col-md-9">
                                                       <div className="single-user-setting">
                                                            <div className="s-title-area">
                                                                 <h4>Personal Details</h4>
                                                                 <span className='personal_edit' onClick={() => onPersonalEdit()}> <i className="fas fa-edit"></i> Edit</span>
                                                            </div>
                                                            <div className="s-content-area">
                                                                 <div className="table-responsive">
                                                                 <table className="table">
                                                                      <tr>
                                                                           <td>First Name <span>:</span></td>
                                                                           <td>{ firstname }</td>
                                                                      </tr>
                                                                      <tr>
                                                                           <td>Last Name <span>:</span></td>
                                                                           <td>{ lastname }</td>
                                                                      </tr>
                                                                 </table>
                                                            </div>
                                                            </div>
                                                       </div>
                                                       {/* <div className="single-user-setting">
                                                            <div className="s-title-area">
                                                                 <h4>Account Settings</h4>
                                                                 <a href="#"> <i className="fas fa-edit"></i> Edit</a>
                                                            </div>
                                                            <div className="s-content-area">
                                                                 <div className="table-responsive">
                                                                 <table className="table">
                                                                      <tr>
                                                                           <td>Language <span>:</span></td>
                                                                           <td>English (United States)</td>
                                                                      </tr>
                                                                      <tr>
                                                                           <td>Time Zone <span>:</span></td>
                                                                           <td>(GMT-06:00) Central America</td>
                                                                      </tr>
                                                                      <tr>
                                                                           <td>Status <span>:</span></td>
                                                                           <td>Active</td>
                                                                      </tr>
                                                                 </table>
                                                            </div>
                                                            </div>
                                                       </div>
                                                       <div className="single-user-setting">
                                                            <div className="s-title-area">
                                                                 <h4>Email Addresses</h4>
                                                                 <a href="#"> <i className="fas fa-edit"></i> Edit</a>
                                                            </div>
                                                            <div className="s-content-area">
                                                                 <div className="table-responsive">
                                                                 <table className="table">
                                                                      <tr>
                                                                           <td>Email <span>:</span></td>
                                                                           <td>albert349@gmail.com</td>
                                                                      </tr>
                                                                 </table>
                                                            </div>
                                                            </div>
                                                       </div>
                                                       <div className="single-user-setting">
                                                            <div className="s-title-area">
                                                                 <h4>Phone</h4>
                                                                 <a href="#"> <i className="fas fa-edit"></i> Edit</a>
                                                            </div>
                                                            <div className="s-content-area">
                                                                 <div className="table-responsive">
                                                                 <table className="table">
                                                                      <tr>
                                                                           <td>Mobile <span>:</span></td>
                                                                           <td>+1 234-567-8925</td>
                                                                      </tr>
                                                                 </table>
                                                            </div>
                                                            </div>
                                                       </div>
                                                       <div className="single-user-setting">
                                                            <div className="s-title-area">
                                                                 <h4>Security</h4>
                                                                 <a href="#"> <i className="fas fa-edit"></i> Edit</a>
                                                            </div>
                                                            <div className="s-content-area">
                                                                 <div className="table-responsive">
                                                                 <table className="table">
                                                                      <tr>
                                                                           <td>Password <span>:</span></td>
                                                                           <td>********</td>
                                                                      </tr>
                                                                 </table>
                                                            </div>
                                                            </div>
                                                       </div> */}
                                                  </div>
                                             </div>
                                        </div>
                                   </main>
                              </div>
                         </div>
                    </div>
               </section>
               {/* <!-- User Main Content Area End --> */}

               <button id='editBtn' data-toggle="modal" data-target="#editModal" hidden>Referral Link</button>
            {/* <!--  input the referral Link --> */}
            <div className="modal fade login-modal sign-in" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="signin" aria-hidden="true" style={{background: 'rgba(19,11,33,.85)',backdropFilter: 'blur(40px)'}}>
                    <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content" style={{ boxShadow: 'none', background: '#261858' }}>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ top: '4px', right: '10px' }}><span aria-hidden="true" style={{ fontSize: '48px',fontWeight: '100', border:'none' }}>&times;</span></button>
                        <div className="modal-body">
                                <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-m_login" role="tabpanel" aria-labelledby="pills-m_login-tab">


                                   <div className="header-area">
                                        <h6 className="title" style={{textTransform: 'unset', fontSize: '28px'}}>Personal Data</h6>
                                    </div>

                                    <div className="form-area" style={{ padding: '0 50px' }}>
                                        <form action="#" method="POST">
                                            
                                            <div className="form-group">
                                                <input placeholder="First Name" defaultValue={firstname} onChange={onChange} name="g_firstname" className='spec_btn_input' style={{ marginBottom: '20px' }} />
                                                <input placeholder="Last Name" defaultValue={lastname} onChange={onChange} name="g_lastname" className='spec_btn_input' style={{ marginBottom: '10px' }} />
                                                <button onClick={() => onPersonalAction()} type="button" className="mybtn2" style={{textTransform: 'unset'}}>Submit</button>
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

export default Profile;