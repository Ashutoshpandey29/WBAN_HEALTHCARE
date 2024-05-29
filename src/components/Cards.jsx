import React from 'react'
import style from '../css/style.module.css';

export default function Cards(props) {
    return (
        <>
            <div className={`col-lg-3 col-md-3 col-sm-6 my-2 ${style.symptom_card}`}>
                <div className={`card ${style.symptom_card}`} style={{ width: '14rem' }}>
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.desc}</p>
                        <a href="/" className="btn btn-primary btn-sm">Mark</a>
                    </div>
                </div>
            </div>
        </>
    )
}