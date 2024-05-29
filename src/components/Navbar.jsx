import React from 'react'
import style from '../css/style.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className={`navbar navbar-expand-lg bg-danger navbar-dark ${style.custom}`}>
                <div className={`container-fluid ${style.custom} `}>
                    {/* <a id={style.nav_btn_home} className="navbar-brand" href="/">Health</a> */}
                    <Link id={style.nav_btn_home} className="navbar-brand" to="/">
                        <img src="logo.png" alt="Logo" width="120" height="30" className="d-inline-block align-text-top mx-4" />
                        Health Care
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li> */}
                        </ul>}
                        <form className="d-flex justify-content-end px-3" role="search">
                            <Link to="/login" >

                                <button id={style.nav_btn_l} className={`btn btn-outline-success mx-4 text-light ${style.nav_btn} px-5`} type="submit">User</button>
                            </Link>
                            <Link to="/loginHos">
                                <button id={style.nav_btn_r} className={`btn btn-outline-danger text-light ${style.nav_btn} px-5`} type="submit">Hospital</button>

                            </Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
