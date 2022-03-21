import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home1() {
    const { isAuthenticated } = useSelector(state => state.auth);

    if (!isAuthenticated && isAuthenticated != null) {
        return <Navigate to="/login" />
    }
    return (
        <Fragment>
            <div className="hero-area hero-area2 hero-area3">
                <img className="shape parallax5" src="assets/images/home/h2-shape.png" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content">
                                <div className="content">
                                    <h5 className="subtitle">
                                        PLAY GAMES WIN
                                    </h5>
                                    <h1 className="title">
                                        <img src="assets/images/text.png" alt="" />
                                    </h1>
                                    <div className="links">
                                        <a href="#" className="mybtn1">Play Now</a>
                                        <a href="https://www.youtube.com/watch?v=jssO8-5qmag" className="video_btn play-video mfp-iframe">
                                            <i className="fas fa-play"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home1;