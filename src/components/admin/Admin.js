import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/profile';
import { Navigate } from 'react-router-dom';

function Admin() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.profile);

    useEffect(async () => {
        await dispatch(getUsers());
    }, [])

    let usersList = <></>;

    if (users.length != 0) {
        usersList = users.map(user => (
            <tr>
                <td>Level{user.level}</td>
                <td>{user.email}</td>
                <td>{user.date_form}</td>
            </tr>
        ))
    }

    if (!isAuthenticated && isAuthenticated != null) {
        return <Navigate to="/login" />
    }

    return (
        <Fragment>
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
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Level</th>
                                                    <th>email</th>
                                                    <th>joined at</th>
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
        </Fragment>
    )
}

export default Admin;