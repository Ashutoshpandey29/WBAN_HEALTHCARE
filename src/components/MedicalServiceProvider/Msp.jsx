import React from 'react'
import './msp.css'
import Doctors from './Doctors'
import { useState, useEffect } from 'react'
import { getData } from '../LoginHos'
import axios from 'axios';

const Msp = (props) => {

    const [alertData, setAlertData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const result = getData();
    if (result === undefined) {
        alert("Please Login First");
        window.location.href = '/login';
    }
    const username = result.data[0].username;
    const address = result.data[0].address;
    const phone = result.data[0].phone;
   

    const fetchData = async () => {

        console.log({ Result_MSP: result });
        const y1 = result.data[0].x;
        const y2 = result.data[0].y;
        const y3 = result.data[0].z;
        const publickey = result.data[0].PublicKey;
        const privatekey = result.data[0].PrivateKey;

        console.log({ y1: y1 });
        console.log({ y2: y2 });
        console.log({ y3: y3 });
        console.log({ publickey: publickey });
        console.log({ privatekey: privatekey });

        console.log({ Username: username });
        const apiUrl = "http://127.0.0.1:4000/api/mspauth/userMSP";
        // Assuming you have a function to fetch data from your API
        try {
            const response = await axios.post(apiUrl, { y1, y2, y3, publickey, privatekey});
            console.log("frontend");
            if (!response.data) {
                throw new Error('No data received');
            }

            console.log(response.data); // Check the extracted data from MongoDB

            setAlertData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className='headermsp'>
                <div>
                    <h1 className='heading'> WELCOME TO {username}!</h1>
                    <span className='details'>
                        <p>Contact: {phone}</p>
                        <p>Address: {address}</p>
                    </span>
                </div>
                <img src='doctor.png' alt='hospital'></img>
            </div>
            <div className='specialists'>
                <h1>Our Specialists</h1>
                <div className='specialist'>
                    {Doctors.map((doctor) => {
                        return (
                            <div key={doctor.id} className='doctor'>
                                <div className='overlay'>
                                    <img src={doctor.img} alt='doctor'></img>
                                    <h2>{doctor.name}</h2>
                                    <h3>{doctor.specialization}</h3>
                                </div>
                                <p>Experience: {doctor.experience}</p>
                                <p>Contact: {doctor.contact}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='alerts'>
                <div className='User'>
                    <h1>ALERTS !!</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>y1</th>
                                <th>y2</th>
                                <th>y3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alertData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.x1}</td>
                                    <td>{item.x2}</td>
                                    <td>{item.x3}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className='button'>Accept</button>
                    <button className='button'>Reject</button>
                </div>
            </div>
        </div>
    )
}

export default Msp;