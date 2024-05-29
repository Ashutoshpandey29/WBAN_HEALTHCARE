import './App.css';

import Navbar from './components/Navbar.jsx';
import Carousel from './components/Carousel';
import Login from './components/Login';
import Signup from './components/Signup';
import LoginHos from './components/LoginHos';
import SignupHos from './components/SignupHos.jsx';
import Choice from './components/Choice';
import MspHome from './components/MedicalServiceProvider/MspHome';

import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import Home from './components/Home';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route exact path='/home' element={<Home />} />
					<Route exact path='/' element={<Carousel />} />
					<Route exact path='/signup' element={<Signup />} />
					<Route exact path="/login" element={<Login />} />

					<Route exact path="/loginHos" element={<LoginHos />} />
					<Route exact path="/signupHos" element={<SignupHos />} />
					<Route exact path="/msp" element={<MspHome />} />
					{/* <Route exact path='/signup' element={<Choice />} /> */}

				</Routes>
			</Router>
		</>
	);
}

export default App;
