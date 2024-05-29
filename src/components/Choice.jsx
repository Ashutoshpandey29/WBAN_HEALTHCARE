import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Choice() {

	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/home');
	};

	const [hos, sethos] = useState(0);

	const handleClick = (e) => {
		sethos(e.target.value);
	}

	return (
		<div id='choice_back'>
			<div className='check_div'>

				<div className="form-check mx-5 my-5">
					<input onClick={handleClick} className="form-check-input" value={0} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
					<label className="form-check-label" for="flexRadioDefault1">
						<img src='user_choice.jpeg' id='user_choice_img' />
						<h5 className='mx-5'>Patient</h5>
					</label>
				</div>
				<div className="form-check mx-5 my-5">
					<input onClick={handleClick} className="form-check-input" value={1} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
					<label className="form-check-label" for="flexRadioDefault2">
						<img src='hospital_choice.jpeg' id='hospital_choice_img' />
						<h5 className='mx-5'>Hospital</h5>
					</label>
				</div>
			</div>

			<form onSubmit={handleSubmit} className='form_cred form_cred_s'>
				<h3 id='signuphere'>SignUp Here</h3>

				<label className='label_cred mod_lbl' for="username">Username</label>
				<input className='input_cred mod_inp' type="text" placeholder="Email or Phone" id="username" />

				<label className='label_cred mod_lbl' for="username">Health-Care ID</label>
				<input disabled={hos == 0} className='input_cred mod_inp' type="text" placeholder="Unique Hospital ID" id="healthcareid" />

				<label className='label_cred mod_lbl' for="username">Date Of Birth/Incorporation</label>
				<input className='input_cred mod_inp' type="text" placeholder="DD/MM/YYYY" id="dob" />

				<label className='label_cred mod_lbl' for="username">Mail/Phone</label>
				<input className='input_cred mod_inp' type="text" placeholder="example@domain.com" id="mail" />

				<label className='label_cred mod_lbl ' for="password">Password</label>
				<input className='input_cred mod_inp' type="password" placeholder="use a strong password" id="password" />

				<button className='button_cred'>Sign Up</button>
				<Link to='/login' >
					<button className='button_cred'>Have An Account? Log In</button>
				</Link>
			</form>
		</div>
	)
}
