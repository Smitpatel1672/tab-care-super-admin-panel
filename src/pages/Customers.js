import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { SearchComponent} from "../components/SearchComponent";
import '../styles/sellers.css'
import filter from '../assets/svg/filter.svg';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from 'react-bootstrap/Table';
import viewIcon from "../assets/svg/view.svg";
import editIcon from "../assets/svg/edit.svg";

export const Customers = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState('ADMIN');
    const [value, setValue] = useState(0);
    const headings = ["S. No.","CUSTOMER ID", "NAME", "PHONE", "CITY", "STATE", "ORDERS", "SALE", "ACTION"];
    const data = [
        { customerId: "#283456", name: "Vicky Sharma", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50"},
        { customerId: "#283456", name: "Vicky Sharma", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { customerId: "#283456", name: "Vicky Sharma", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { customerId: "#283456", name: "Vicky Sharma", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { customerId: "#283456", name: "Vicky Sharma", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { customerId: "#283456", name: "Vicky Sharma", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { customerId: "#283456", name: "Vicky Sharma", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
    ]
  return (
    <div className="orders">
            <Navbar />
            <div className="orders-body">
                <SearchComponent />
                <p className="title">Customers</p>
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
                            <Tab label="All Customers" />
                            <Tab label="Active Customers" />
                            <Tab label="Offline Customers" />
                            <Tab label="Unverified Customers" />
                        </Tabs>
                    </Paper>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {headings.map((item) => (<th>{item}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,i) => {
                                return (
                                    // <div className="orders-data-values">
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{item.customerId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>{item.orders}</td>
                                        <td>{item.sale}</td>
                                        <td>
                                            <img src={viewIcon} alt="" onClick={() => navigate('/orders/details', {state: {orderId: item.orderId}})}/>
                                            <img src={editIcon} alt="" />
                                            {/* <img src={deleteIcon} alt="" /> */}
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
