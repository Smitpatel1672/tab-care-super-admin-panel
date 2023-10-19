import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import '../styles/orders.css';
import { SearchComponent } from '../components/SearchComponent';
import axios from "axios";
import filter from '../assets/svg/filter.svg';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from 'react-bootstrap/Table';
import viewIcon from "../assets/svg/view.svg";
// import editIcon from "../assets/svg/edit.svg";
// import deleteIcon from "../assets/svg/delete.svg";
import * as Constants from '../Constants';


export const Orders = () => {

    const navigate = useNavigate();
    let [orders, setOrders] = useState([]);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            // url: 'http://localhost:8000/api/order/',
            url: Constants.BASE_URL+'/order/',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjY2M4MTI2NDkyYTM4M2NlYTM0NSIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQwMjU5Mjl9.f6UA9UD4pw33g29sp5d4L1UWu7GgI-bkgo_nbzwIDys'
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                setOrders(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const [userType, setUserType] = useState('ADMIN');
    const [value, setValue] = useState(2);
    // const headings = ["ORDER ID", "CUSTOMER", "PRODUCT", "PHONE", "CITY", "ORDER DATE", "AMOUNT", "PAYMENT METHOD", "DELIVERY STATUS", "ACTION"];
    const headings = ["ORDER ID", "CUSTOMER", "PHONE", "CITY", "ORDER DATE", "AMOUNT", "PAYMENT METHOD", "DELIVERY STATUS", "ACTION"];


    function formatDate(d) {
        const date = new Date(d);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const formattedDate = date.toLocaleString('en-US', options);
        // console.log(formattedDate);
        return formattedDate;
    }

    return (
        <div className="orders">
            <Navbar />
            <div className="orders-body">
                <SearchComponent />
                <p className="title">Orders</p>
                <div className="orders-card">
                    <div className="orders-search-parameters">
                        <input type="search" name="search-order" id="search-order" />
                        <input type="date" name="order-date" id="order-date" />
                        <select onChange={e => setUserType(e.target.value)}>
                            <option value="ALL">All</option>
                            <option value="PHARMACIST">PHARMACIST</option>
                            <option value="DOCTOR">DOCTOR</option>
                            <option value="VENDOR">VENDOR</option>
                        </select>
                        <select onChange={e => setUserType(e.target.value)}>
                            <option value="ALL">All</option>
                            <option value="PHARMACIST">PHARMACIST</option>
                            <option value="DOCTOR">DOCTOR</option>
                            <option value="VENDOR">VENDOR</option>
                        </select>
                        <div className="filter-button">
                            <img src={filter} alt="" />
                            <p>Filter</p>
                        </div>
                    </div>
                    <div className="dashed-divider"></div>
                    <Paper square>
                        <Tabs
                            value={value}
                            textColor="primary"
                            indicatorColor="primary"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            scrollButtons="auto"
                        >
                            <Tab label="All Orders" />
                            <Tab label="Delivered" />
                            <Tab label="Pickups" />
                            <Tab label="Returns" />
                            <Tab label="Cancelled" />
                        </Tabs>
                    </Paper>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {headings.map((item) => (<th key={item}>{item}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item,i) => {
                                return (
                                    // <div className="orders-data-values">
                                    <tr key={i}>
                                        <td>{item._id}</td>
                                        <td>{`${item.user?.firstname ? item.user?.firstname : ''} ${item.user?.lastname ? item.user?.lastname : ''}` }</td>
                                        {/* <td>{(item.products).map((product) => { return (product.product.title + " x " + product.quantity); })}</td> */}
                                        <td>{item.address.phoneNumber}</td>
                                        <td>{item.address.city}</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.paymentMode}</td>
                                        <td style={{ paddingLeft: '2.5vw' }}>
                                            <p>{item.deliveryStatus}</p>
                                        </td>
                                        <td>
                                            <img src={viewIcon} alt="" onClick={() => navigate('/orders/details', { state: { orderId: item._id } })} />
                                            {/* <img src={editIcon} alt="" />
                                            <img src={deleteIcon} alt="" /> */}
                                        </td>
                                    </tr>
                                    //     <div className="divider"></div>
                                    // </div>
                                );
                            })}
                        </tbody>
                    </Table>
                    <div className="divider"></div>
                    <div className="prev-next-nav-buttons">
                        <div className="disabled">Previous</div>
                        <div className="current-page">1</div>
                        <div className="other-page">2</div>
                        <div className="enabled">Next</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
