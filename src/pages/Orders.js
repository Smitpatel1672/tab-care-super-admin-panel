import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../styles/orders.css";
import { SearchComponent } from "../components/SearchComponent";
import axios from "axios";
import filter from "../assets/svg/filter.svg";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
// import Table from "react-bootstrap/Table";
import viewIcon from "../assets/svg/view.svg";
// import editIcon from "../assets/svg/edit.svg";
// import deleteIcon from "../assets/svg/delete.svg";
import * as Constants from "../Constants";
import CommonBreadcramb from "../components/Layout/CommonBreadcramb";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Input,
    Row,
} from "reactstrap";
import {
    AllOrderSvg,
    ClickSvg,
    CloseButtonSvg,
    DeleteIcon,
    DeliveredSvg,
    EditIcon,
    EyeIcon,
    ReturnSvg,
    SearchIcon,
    SquarIconSvg,
} from "../components/svgIcons/commonSvgIcons";
import CommonTable from "../components/common/Table";
import { Table } from "react-bootstrap";
import CommonPagination from "../components/common/CommonPagination";

export const Orders = () => {
    const navigate = useNavigate();
    let [orders, setOrders] = useState([]);

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            // url: 'http://localhost:8000/api/order/',
            url: Constants.BASE_URL + "/order/",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjY2M4MTI2NDkyYTM4M2NlYTM0NSIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQwMjU5Mjl9.f6UA9UD4pw33g29sp5d4L1UWu7GgI-bkgo_nbzwIDys",
            },
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data);
                setOrders(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const [userType, setUserType] = useState("ADMIN");
    const [value, setValue] = useState(2);
    // const headings = ["ORDER ID", "CUSTOMER", "PRODUCT", "PHONE", "CITY", "ORDER DATE", "AMOUNT", "PAYMENT METHOD", "DELIVERY STATUS", "ACTION"];

    function formatDate(d) {
        const date = new Date(d);
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        const formattedDate = date.toLocaleString("en-US", options);
        // console.log(formattedDate);
        return formattedDate;
    }
    const columns = [
        {
            dataField: "selected",
            text: "",
            formatter: (row) => <input type="checkbox" checked={row} />,
            headerStyle: () => {
                return { width: "4%" };
            },
            classes: "text-center",
        },
        {
            dataField: "_id",
            text: "ORDER ID",
            sort: true,
            headerStyle: () => {
                return { width: "8%" };
            },
            classes: "text-primary",
        },
        {
            dataField: "user",
            text: "CUSTOMER",
            formatter: (cell, row) =>
                `${cell?.firstname ? cell.firstname : ""} ${cell?.lastname ? cell.lastname : ""
                }`,
            sort: true,
            headerStyle: () => {
                return { width: "9%" };
            },
        },
        {
            dataField: "address.phoneNumber",
            text: "PRODUCT",
            sort: true,
            headerStyle: () => {
                return { width: "9%" };
            },
        },
        {
            dataField: "address.city",
            text: "LOCATION",
            sort: true,
            headerStyle: () => {
                return { width: "14%" };
            },
        },
        {
            dataField: "createdAt",
            text: "ORDER DATE",
            formatter: (cell) => formatDate(cell), // Implement your formatDate function
            sort: true,
            headerStyle: () => {
                return { width: "12%" };
            },
        },
        {
            dataField: "amount",
            text: "AMOUNT",
            sort: true,
            headerStyle: () => {
                return { width: "8%" };
            },
        },
        {
            dataField: "paymentMode",
            text: "PAYMENT METHOD",
            headerStyle: () => {
                return { width: "14%" };
            },
            sort: true,
        },
        {
            dataField: "deliveryStatus",
            text: "DELIVERY STATUS",
            formatter: (row) => <Badge className="badge_success">{row}</Badge>,
            sort: true,
            headerStyle: () => {
                return { width: "14%" };
            },
        },
        {
            dataField: "actions",
            text: "ACTION",
            formatter: (row) => (
                <div className="actions_table">
                    {" "}
                    <Button ><EyeIcon /></Button>
                    <Button><EditIcon /></Button>
                    <Button><DeleteIcon /></Button>
                </div>
            ),
        },
    ];
    const data = [
        {
            _id: "VZ1001",
            user: {
                firstname: "Frank",
                lastname: "Hook",
            },
            address: {
                phoneNumber: "Dolo 300",
                city: "Kabuliwala, Jama Masjid",
            },
            createdAt: "20 Dec, 2021, 02:21 AM",
            amount: "$654",
            deliveryStatus: "DELIVERED",
            paymentMode: "Mastercard",
            selected: false,
        },
        {
            _id: "VZ1001",
            user: {
                firstname: "Frank",
                lastname: "Hook",
            },
            address: {
                phoneNumber: "Dolo 300",
                city: "Kabuliwala, Jama Masjid",
            },
            createdAt: "20 Dec, 2021, 02:21 AM",
            amount: "$654",
            deliveryStatus: "DELIVERED",
            paymentMode: "Mastercard",
            selected: false,
        },
    ];
    return (
        <>
            <CommonBreadcramb heading={"Orders"} />
            <Card className="border-0 mb-4 orders_main ">
                <CardHeader className="border-0  pt-4">
                    <Row>
                        <Col sm={4}>
                            <div className="form-group has-search">
                                <i className="form-control-feedback">
                                    <SearchIcon />
                                </i>
                                <Input
                                    type="search"
                                    name="search-order"
                                    id="search-order"
                                    className="form-control mb-0 "
                                    placeholder="Search for name, tasks, projects or something..."
                                />
                            </div>
                        </Col>
                        <Col>
                            <Input type="date" name="order-date" id="order-date" />
                        </Col>
                        <Col>
                            <Input
                                name="select"
                                type="select"
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="ALL">All</option>
                                <option value="PHARMACIST">PHARMACIST</option>
                                <option value="DOCTOR">DOCTOR</option>
                                <option value="VENDOR">VENDOR</option>
                            </Input>
                        </Col>
                        <Col>
                            <Input
                                name="select"
                                type="select"
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="ALL">All</option>
                                <option value="PHARMACIST">PHARMACIST</option>
                                <option value="DOCTOR">DOCTOR</option>
                                <option value="VENDOR">VENDOR</option>
                            </Input>
                        </Col>{" "}
                        <Col>
                            <Input
                                name="select"
                                type="select"
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="ALL">All</option>
                                <option value="PHARMACIST">PHARMACIST</option>
                                <option value="DOCTOR">DOCTOR</option>
                                <option value="VENDOR">VENDOR</option>
                            </Input>
                        </Col>
                        <Col>
                            <Button className="filter-button mt-0 gap-2">
                                <img src={filter} alt="" />
                                Filter
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
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
                            <Tab
                                icon={<AllOrderSvg />} // Add an icon to the tab
                                label="All Orders"
                                className="Order-tab"
                            />
                            <Tab
                                icon={<ClickSvg />}
                                className="Order-tab"
                                label="Delivered"
                            />
                            <Tab
                                icon={<DeliveredSvg />}
                                className="Order-tab"
                                label="Pickups"
                            />
                            <Tab icon={<ReturnSvg />} className="Order-tab" label="Returns" />
                            <Tab
                                icon={<CloseButtonSvg />}
                                className="Order-tab"
                                label="Cancelled"
                            />
                        </Tabs>
                    </Paper>
                    <CommonTable
                        columns={columns}
                        data={
                            data ? data : []
                            // orders ? orders : []
                        }
                    />
                    <CommonPagination />
                </CardBody>
            </Card>

            {/* <div className="orders-card"> */}
            {/* <div className="orders-search-parameters">
                    <input type="search" name="search-order" id="search-order" />
                    <input type="date" name="order-date" id="order-date" />
                    <select onChange={(e) => setUserType(e.target.value)}>
                        <option value="ALL">All</option>
                        <option value="PHARMACIST">PHARMACIST</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="VENDOR">VENDOR</option>
                    </select>
                    <select onChange={(e) => setUserType(e.target.value)}>
                        <option value="ALL">All</option>
                        <option value="PHARMACIST">PHARMACIST</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="VENDOR">VENDOR</option>
                    </select>
                    <div className="filter-button">
                        <img src={filter} alt="" />
                        <p>Filter</p>
                    </div>
                </div> */}
            {/* <div className="dashed-divider"></div>
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
                            {headings.map((item) => (
                                <th key={item}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, i) => {
                            return ( 
                                // <div className="orders-data-values">
                    <tr key={i}>
                        <td>{item._id}</td>
                        <td>{`${item.user?.firstname ? item.user?.firstname : ""
                            } ${item.user?.lastname ? item.user?.lastname : ""}`}</td> */}
            {/* <td>{(item.products).map((product) => { return (product.product.title + " x " + product.quantity); })}</td> */}
            {/* <td>{item.address.phoneNumber}</td>
                <td>{item.address.city}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.amount}</td>
                <td>{item.paymentMode}</td>
                <td style={{ paddingLeft: "2.5vw" }}>
                    <p>{item.deliveryStatus}</p>
                </td>
                <td>
                    <img
                        src={viewIcon}
                        alt=""
                        onClick={() =>
                            navigate("/orders/details", {
                                state: { orderId: item._id },
                            })
                        }
                    /> */}
            {/* <img src={editIcon} alt="" />
                                            <img src={deleteIcon} alt="" /> */}
            {/* </td>
        </tr >
                                //     <div className="divider"></div>
                                // </div >
                );
                        })}
            </tbody >
        </Table >
                <div className="divider"></div>
                <div className="prev-next-nav-buttons">
                    <div className="disabled">Previous</div>
                    <div className="current-page">1</div>
                    <div className="other-page">2</div>
                    <div className="enabled">Next</div>
                </div>
            </div > */}
        </>
    );
};
