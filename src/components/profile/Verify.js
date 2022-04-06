import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyLink } from '../../actions/profile';

const Verify = () => {
     let { id } = useParams();
     const dispatch = useDispatch();

     useEffect(async () => {
          const data = {
               verifyLink: id,
          }
          dispatch(verifyLink(data));
     }, [])

     return (
          <Fragment>
               {/* <!-- Breadcrumb Area Start --> */}
            <section className="breadcrumb-area gamer-profile">
                <div className="container">
                    <div className="row">
                        <h3 id='verifyText'></h3>
                    </div>
                </div>
            </section>
            {/* <!-- Breadcrumb Area End --> */}
          </Fragment>
     )
}

export default Verify;