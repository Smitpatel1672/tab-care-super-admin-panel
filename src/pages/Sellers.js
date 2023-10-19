import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { SearchComponent } from "../components/SearchComponent";
import '../styles/sellers.css'
import filter from '../assets/svg/filter.svg';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from 'react-bootstrap/Table';
import viewIcon from "../assets/svg/view.svg";
import editIcon from "../assets/svg/edit.svg";
import CommonBreadcramb from '../components/Layout/CommonBreadcramb';

export const Sellers = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState('ADMIN');
    const [value, setValue] = useState(0);
    const headings = ["S. No.", "SELLER ID", "SELLER", "CONTACT PERSON", "CONTACT PERSON PHONE No.", "CITY", "STATE", "ORDERS", "SALE", "ACTION"];
    const data = [
        { sellerId: "#283456", seller: "Vicky Sharma", contactPerson: "Dolo 650 mg", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { sellerId: "#283456", seller: "Vicky Sharma", contactPerson: "Dolo 650 mg", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { sellerId: "#283456", seller: "Vicky Sharma", contactPerson: "Dolo 650 mg", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { sellerId: "#283456", seller: "Vicky Sharma", contactPerson: "Dolo 650 mg", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { sellerId: "#283456", seller: "Vicky Sharma", contactPerson: "Dolo 650 mg", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { sellerId: "#283456", seller: "Vicky Sharma", contactPerson: "Dolo 650 mg", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
        { sellerId: "#283456", seller: "Vicky Sharma", contactPerson: "Dolo 650 mg", phone: "9887766554", city: "Gurgaon", state: "20 Feb, 2023", orders: "5000", sale: "50" },
    ]
    return (
        <>
            <CommonBreadcramb heading={"Products"} />
            <div className="orders">

                <div className="orders-body">

                    <p className="title">Sellers</p>
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
                                <Tab label="All Sellers" />
                                <Tab label="Pending" />
                                <Tab label="Open" />
                                <Tab label="Closed" />
                                <Tab label="Blocked" />
                            </Tabs>
                        </Paper>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {headings.map((item) => (<th>{item}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => {
                                    return (
                                        // <div className="orders-data-values">
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.sellerId}</td>
                                            <td>{item.seller}</td>
                                            <td>{item.contactPerson}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.city}</td>
                                            <td>{item.state}</td>
                                            <td>{item.orders}</td>
                                            <td>{item.sale}</td>
                                            <td>
                                                <img src={viewIcon} alt="" onClick={() => navigate('/orders/details', { state: { orderId: item.orderId } })} />
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
        </>
    )
}
