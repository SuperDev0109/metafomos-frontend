import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/profile';
import { Navigate } from 'react-router-dom';
import { registerByAdmin, editUser, deleteUser } from '../../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
    const dispatch = useDispatch();
    const { isAuthenticated, admin } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.profile);
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: ''
    });
    const [usersData, setUsersData] = useState([]);

    const { id, email, password } = formData;

    useEffect(async () => {
        await dispatch(getUsers());
    }, [])

    useEffect(async () => {
        setUsersData(users);
    }, [users])

    let usersList = <></>;

    if (users.length != 0) {
        usersList = users.map((user, index) => (
            <tr key={user._id}>
                <td>Level{user.level}</td>
                <td>{user.email}</td>
                <td>{user.date_form}</td>
                <td>
                    <span onClick={() => updateUserModal(`${user.email}`, `${user._id}`)} style={{ marginRight: '20px', cursor: 'pointer' }}>
                        <i className='fas fa-edit' />
                    </span>
                    <span onClick={() => deleteUserModal(`${user._id}`)} style={{ marginRight: '20px', cursor: 'pointer' }}>
                        <i className='fas fa-trash-alt' />
                    </span>
                </td>
            </tr>
        ))
    }

    if (!isAuthenticated && isAuthenticated != null) {
        return <Navigate to="/login" />
    }
    if(!admin && admin != null) {
        return <Navigate to="/login" />
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const addUser = () => {
        console.log(email, password);
        const data = {
            email: email,
            password: password
        }
        dispatch(registerByAdmin(data));
    }

    const addUserModal = () => {
        const addBtn = document.querySelector("#modal_add");
        addBtn.click();
    }

    const updateUser = () => {
        // console.log(email, password);
        const data = {
            id: id,
            email: email,
            password: password
        }
        console.log(data);
        dispatch(editUser(data));
    }

    const updateUserModal = (email, id) => {
        setFormData({ email, id});
        const updateBtn = document.querySelector("#modal_update");
        updateBtn.click();
    }

    const deleteUserModal = (id) => {
        // console.log(id);
        if(confirm("This user will be delete!") == true) {
            console.log(id);
            const data = {
                id: id,
            }
            dispatch(deleteUser(data));
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <section className="user-main-dashboard" style={{ paddingTop: '210px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <main>
                                <div className="main-box affiliate-box">
                                    <div className="aff-table">
                                        <div className="header-area">
                                            <h4>User Lists</h4>
                                            <div className="d-pick">
                                                {/* <input type="date" /> */}
                                                <span className="mybtn2" onClick={() => addUserModal()} target="_blank" id="follow1" style={{ width: '125px', textAlign: 'center', fontSize: '13px', padding: '10px 25px', cursor: 'pointer' }}>Add</span>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Level</th>
                                                    <th>email</th>
                                                    <th>joined at</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { usersList }
                                            </tbody>
                                            </table>
                                        </div>
                                        {/* <div className="view-more-area">
                                            <a href="#">Show More <i className="fas fa-chevron-down"></i></a>
                                        </div> */}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </section>


        <button id='modal_add' data-toggle="modal" data-target="#addModal" hidden>Add modal</button>
      {/* <!-- Warning Network --> */}
      <div className="modal fade login-modal sign-in" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="signin" aria-hidden="true" style={{background: 'rgba(19,11,33,.85)',backdropFilter: 'blur(40px)'}}>
            <div className="modal-dialog modal-dialog-centered " role="document">
               <div className="modal-content" style={{ boxShadow: 'none', background: '#261858' }}>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ top: '4px', right: '10px' }}><span aria-hidden="true" style={{ fontSize: '48px',fontWeight: '100', border:'none' }}>&times;</span></button>
                  <div className="modal-body">
                        <div className="tab-content" id="pills-tabContent">
                           <div className="tab-pane fade show active" id="pills-m_login" role="tabpanel" aria-labelledby="pills-m_login-tab">

                              {/* <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', margin: '20px 0' }}>
                                 <img src='../assets/custom/images/network.png' />
                              </div> */}

                              <div className="header-area" style={{ padding: '0', marginBottom: '0' }}>
                                 {/* <h6 className="title" style={{textTransform: 'unset', fontSize: '28px'}}>  </h6>
                                 <span style={{ fontSize: '17px' }}>You need to connect to supported network</span> */}
                                <div className='admin_login'>
                                    <div className='right'>
                                        <div className='panel1'>
                                            <span id='type_modal'>Add User</span>
                                        </div>
                                        <div className='panel2'>
                                            <div className='email_panel'>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    onChange={onChange} 
                                                    placeholder='abc@gmail.com' 
                                                    />
                                            </div>
                                            <div className='email_panel'>
                                                <input 
                                                    type="password" 
                                                    name="password" 
                                                    onChange={onChange} 
                                                    placeholder='Password' 
                                                />
                                            </div>
                                        </div>
                                        <button className='panel3' onClick={() => addUser()}><span>Add User</span></button>
                                    </div>
                                </div>
                              </div>                              
                           </div>
                        </div>
                  </div>
               </div>
               </div>
         </div>
         {/* <!-- Warning Network End --> */}

         <button id='modal_update' data-toggle="modal" data-target="#updateModal" hidden>update modal</button>
      {/* <!-- Warning Network --> */}
      <div className="modal fade login-modal sign-in" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="signin" aria-hidden="true" style={{background: 'rgba(19,11,33,.85)',backdropFilter: 'blur(40px)'}}>
            <div className="modal-dialog modal-dialog-centered " role="document">
               <div className="modal-content" style={{ boxShadow: 'none', background: '#261858' }}>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ top: '4px', right: '10px' }}><span aria-hidden="true" style={{ fontSize: '48px',fontWeight: '100', border:'none' }}>&times;</span></button>
                  <div className="modal-body">
                        <div className="tab-content" id="pills-tabContent">
                           <div className="tab-pane fade show active" id="pills-m_login" role="tabpanel" aria-labelledby="pills-m_login-tab">

                              {/* <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', margin: '20px 0' }}>
                                 <img src='../assets/custom/images/network.png' />
                              </div> */}

                              <div className="header-area" style={{ padding: '0', marginBottom: '0' }}>
                                 {/* <h6 className="title" style={{textTransform: 'unset', fontSize: '28px'}}>  </h6>
                                 <span style={{ fontSize: '17px' }}>You need to connect to supported network</span> */}
                                <div className='admin_login'>
                                    <div className='right'>
                                        <div className='panel1'>
                                            <span id='type_modal'>Edit User</span>
                                        </div>
                                        <div className='panel2'>
                                            <div className='email_panel'>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    onChange={onChange} 
                                                    value={email}
                                                    placeholder='abc@gmail.com' 
                                                    />
                                            </div>
                                            <div className='email_panel'>
                                                <input 
                                                    type="password" 
                                                    name="password" 
                                                    onChange={onChange}
                                                    placeholder='Password' 
                                                />
                                            </div>
                                        </div>
                                        <button className='panel3' onClick={() => updateUser()}><span>Save</span></button>
                                    </div>
                                </div>
                              </div>                              
                           </div>
                        </div>
                  </div>
               </div>
               </div>
         </div>
         {/* <!-- Warning Network End --> */}
        </Fragment>
    )
}

export default Admin;