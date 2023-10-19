import React, { useState, useEffect } from 'react';
import '../styles/signin.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Constants from '../Constants';

export const SignIn = () => {

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('wecare_token');
        console.log(token);
        if(token){
            navigate('/dashboard');
        }
    }, [navigate]);

    const [email, setEmail] = useState('');
    // const [userType, setUserType] = useState('ADMIN');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("email: " + email);
        // console.log("password: " + password);
        if (email === "" || email === " ") {
            alert('Enter valid email address');
        } else {
            let data = JSON.stringify({
                "email": email
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                // url: 'https://tabs.care/api/auth/login/wecare/email',
                url: 'http://52.66.136.40:8000/api/v1/auth/get-otp',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: data
            };
            //             axios(config)
            // .then(function (response) {
            //   console.log(JSON.stringify(response.data));
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });
            let response = await axios(config);
            if (response.status === 200) {
                console.log(JSON.stringify(response.data));
                navigate('/otp', {
                    state: {
                        email: email
                    }
                });
            } else {
                console.log(response["message"]);
            }
        }
    }

    const tnc = (e) => {
        e.preventDefault();
    }

    const pp = (e) => {
        e.preventDefault();
    }

    const forgotpassword = (e) => {
        e.preventDefault();
    }

    return (
        <div className="sign-in" >
            <div className="brand-identity">
                <div className="brand-name">Wecare</div>
                <div className="company-name">by <span style={{ textDecoration: 'italic' }}>Tabscare</span></div>
                <div className="brand-short-intro">Fast & Easy Management</div>
            </div>
            <div className="welcome">
                <h2>Welcome back!</h2>
            </div>
            <div className="form-section">
                <form action="" method="">
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {/* <label htmlFor="password">Password</label>
                    <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                    {/* <label htmlFor="usertype">User type</label>
                    <select onChange={e => setUserType(e.target.value)}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="PHARMACIST">PHARMACIST</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="VENDOR">VENDOR</option>
                    </select> */}
                    {/* <input type="submit" value="Sign in" placeholder="Tabscare" /> */}
                    <button variant="primary" type="submit" onClick={handleSubmit}>Sign in</button>
                    <div className="forgot-password" onClick={forgotpassword}>Forgot password</div>
                </form>
            </div>
            <div className="tncnpp">
                <div className="tnc" onClick={tnc}>Terms and Conditions</div>
                <div className="divider">|</div>
                <div className="pp" onClick={pp}>Privacy Policy</div>
            </div>
        </div>
    )
}
