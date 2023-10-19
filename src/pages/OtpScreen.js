import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import '../styles/signin.css';
import axios from 'axios';
import * as Constants from '../Constants';

export const OtpScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [otp, setOtp] = useState('');
    console.log(state.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("otp: " + otp);
        // console.log("password: " + password);
        if (otp === "" || otp === " ") {
            alert('Enter valid otp');
        } else {
            let data = JSON.stringify({
                "email": state.email,
                "otp": otp
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: Constants.BASE_URL+'/auth/verifyEmailOTP',
                url: 'http://52.66.136.40:8000/api/v1/auth/verify-email-OTP',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            let response = await axios(config);
            console.log(response);
            if (response.data?.statusCode === 200) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('wecare_token', response.data?.data?.accessToken);
                navigate('/dashboard');
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
                    <label htmlFor="otp">OTP</label>
                    <input type="text" placeholder="Enter OTP here" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    {/* <input type="submit" value="Sign in" placeholder="Tabscare" /> */}
                    <button variant="primary" type="submit" onClick={handleSubmit}>Sign in</button>
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
