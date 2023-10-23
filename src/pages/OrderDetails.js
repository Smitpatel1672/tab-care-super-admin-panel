import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "../styles/order_details.css";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { SearchComponent } from "../components/SearchComponent";
import Table from "react-bootstrap/Table";
import starIcon from "../assets/svg/star.svg";
import starHalfIcon from "../assets/svg/star_half.svg";
import shoppingIcon from "../assets/svg/shopping.svg";
import * as Constants from "../Constants";
import dayjs from "dayjs";
import CommonBreadcramb from "../components/Layout/CommonBreadcramb";

import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import {
    CancelOrder,
    EmailSvg,
    ImportSvg,
    LocationIcon,
    PackagingIcon,
    PhoneSvg,
    ShopIcon,
    TruckSvg,
} from "../components/svgIcons/commonSvgIcons";

export const OrderDetails = () => {
    const location = useLocation();
    const state = location.state;
    const [orderId, setOrderID] = useState(state?.orderId);
    // const headings = ["PRODUCT DETAILS", "MRP", "DISCOUNT", "ITEM PRICE", "QUANTITY", "RATING", "TOTAL AMOUNT"];
    const headings = [
        "PRODUCT DETAILS",
        "ITEM PRICE",
        "QUANTITY",
        "TOTAL AMOUNT",
    ];
    // const data = [
    //     { product: "Dolo 650 mg", mrp: "Gurgaon", discount: "20%", price: "Rs.105", quantity: "20", amount: "50" },
    //     { product: "Dolo 650 mg", mrp: "Gurgaon", discount: "20%", price: "Rs.105", quantity: "20", amount: "50" },
    //     { product: "Dolo 650 mg", mrp: "Gurgaon", discount: "20%", price: "Rs.105", quantity: "20", amount: "50" },
    //     { product: "Dolo 650 mg", mrp: "Gurgaon", discount: "20%", price: "Rs.105", quantity: "20", amount: "50" },
    //     { product: "Dolo 650 mg", mrp: "Gurgaon", discount: "20%", price: "Rs.105", quantity: "20", amount: "50" },
    //     { product: "Dolo 650 mg", mrp: "Gurgaon", discount: "20%", price: "Rs.105", quantity: "20", amount: "50" },
    //     { product: "Dolo 650 mg", mrp: "Gurgaon", discount: "20%", price: "Rs.105", quantity: "20", amount: "50" },
    // ]
    let [orderData, setOrderData] = useState([]);

    useEffect(() => {
        let data = JSON.stringify({
            orderId: orderId,
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: Constants.BASE_URL + "/order/details",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjY2M4MTI2NDkyYTM4M2NlYTM0NSIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQwMjU5Mjl9.f6UA9UD4pw33g29sp5d4L1UWu7GgI-bkgo_nbzwIDys",
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setOrderData(response.data.data);
                let data = response.data?.data;
                if (
                    data?.length &&
                    data[0]?.hasOwnProperty("shiprocketShipmentId") &&
                    data[0]?.shiprocketShipmentId !== undefined
                ) {
                    trackOrderStatus(data[0]?.shiprocketShipmentId);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // const generateToken = async () => {
    //     try {
    //         let config = {
    //             method: 'post',
    //             maxBodyLength: Infinity,
    //             url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin': "*"
    //             },
    //             data: {
    //                 email: "bdm@tabs.care",
    //                 password: "Tabs@1234"
    //             }
    //         };

    //         const response = await axios(config);
    //         console.log(response.data, 'ShiprocketGenerateTokenAPIResponse');

    //         return response.data?.token; // Return the token value directly
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const confirmOrder = async () => {
    //     let token = await generateToken();
    //     let orderDataObj = orderData[0];

    //     let config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': "*"
    //         },
    //         data: {
    //             order_id: orderDataObj?._id,
    //             order_date: dayjs(orderDataObj?.createdAt).format('YYYY-MM-DD HH:mm'),
    //             pickup_location: 'warehouse',
    //             billing_customer_name: orderDataObj?.address?.customerName,
    //             billing_last_name: orderDataObj?.address?.customerName,
    //             billing_address: orderDataObj?.address?.houseNumber,
    //             billing_city: orderDataObj?.address?.city,
    //             billing_pincode: orderDataObj?.address?.postalCode,
    //             billing_state: orderDataObj?.address?.state,
    //             billing_country: orderDataObj?.address?.country,
    //             billing_email: "test@gmail.com",
    //             billing_phone: parseInt(orderDataObj?.address?.phoneNumber),
    //             shipping_is_billing: true,
    //             order_items: [
    //                 {
    //                     name: orderDataObj?.products[0]?.product?.name,
    //                     sku: orderDataObj?.products[0]?.product?.sku_code,
    //                     units: orderDataObj?.products[0]?.quantity,
    //                     selling_price: orderDataObj?.products[0]?.price,
    //                 }
    //             ],
    //             payment_method: "Prepaid",
    //             sub_total: orderDataObj?.amount,
    //             length: 10,
    //             breadth: 10,
    //             height: 10,
    //             weight: 2.5,
    //         }
    //     };

    //     await axios(config)
    //     .then(function (response) {
    //         console.log(response.data,'ShiprocketCreateOrderAPIRes');
    //         addShipmentId(response.data?.order_id);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // };

    const addShipmentId = (shipmentId) => {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: Constants.BASE_URL + "/order/add-shipment-id",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjY2M4MTI2NDkyYTM4M2NlYTM0NSIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQwMjU5Mjl9.f6UA9UD4pw33g29sp5d4L1UWu7GgI-bkgo_nbzwIDys",
                "Content-Type": "application/json",
            },
            data: {
                orderId: orderData[0]?._id,
                shipmentId: shipmentId,
            },
        };

        axios(config)
            .then(function (response) {
                console.log(response.data, "shipmentIdAdded");
                alert(
                    `Your Shiprocked Id is : ${response.data?.data?.shiprocketShipmentId} for your order Id : ${response.data?.data?.id}, Kindly note this for future reference`
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const trackOrderStatus = async (shipmentId) => {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: Constants.BASE_URL + "/order/track-order",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2YyMDY1ZjE0YmZmMTg1NjkyMzBkZCIsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2OTE1NzQ5NTF9.LDryyqxefTngnY0yQyfRBoODAhc2gS9s7_MgZPBzmPY",
                "Content-Type": "application/json",
            },
            data: {
                shipmentId: shipmentId,
            },
        };

        axios(config)
            .then(function (response) {
                console.log(response.data, "orderTrackingDetails");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const confirmOrder = () => {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: Constants.BASE_URL + "/order/confirm-order",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2YyMDY1ZjE0YmZmMTg1NjkyMzBkZCIsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2OTE1NzQ5NTF9.LDryyqxefTngnY0yQyfRBoODAhc2gS9s7_MgZPBzmPY",
                "Content-Type": "application/json",
            },
            data: {
                orderId: orderData[0]?._id,
            },
        };

        axios(config)
            .then(function (response) {
                console.log(response.data, "orderConfirmedAtShiprocket");
                alert(
                    `Your Shiprocked Id is : ${response.data?.data?.shiprocketShipmentId} for your order Id : ${response.data?.data?.id}, Kindly note this for future reference`
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <CommonBreadcramb heading={"Order Details"} />
            <Row className="order_details">
                <Col sm={8}>
                    <Card className="border-0 mb-3">
                        <CardBody>
                            <div className="d-flex justify-content-between mb-5 align-items-center">
                                <b className="order-id">Order ID: {orderId}</b>
                                <Button className="gradiant_btn ">
                                    <ImportSvg /> Import
                                </Button>
                            </div>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        {headings.map((item) => (
                                            <th key={item}>{item}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.map((item, i) => {
                                        return (
                                            // <div className="orders-data-values">
                                            <tr key={i}>
                                                <td key={item.products[i].title}>
                                                    {item.products.map((product) => {
                                                        return product?.product?.name;
                                                    })}
                                                </td>
                                                <td key={item.products[i].mrp}>
                                                    {item.products.map((product) => {
                                                        return product.price;
                                                    })}
                                                </td>
                                                <td key={item.products[i].quantity}>
                                                    {item.products.map((product) => {
                                                        return product.quantity;
                                                    })}
                                                </td>
                                                {/* <td key={"image"+i}>
                                                <img src={starIcon} alt="" />
                                                <img src={starIcon} alt="" />
                                                <img src={starIcon} alt="" />
                                                <img src={starIcon} alt="" />
                                                <img src={starHalfIcon} alt="" />
                                                <img src={editIcon} alt="" />
                                                <img src={deleteIcon} alt="" />
                                            </td> */}
                                                <td key={item.products[i].price}>
                                                    {item.products.map((product) => {
                                                        return product.product.price;
                                                    })}
                                                </td>
                                            </tr>
                                            //     <div className="divider"></div>
                                            // </div>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <div className="dashed-divider"></div>
                            <div className="pricing">
                                <div className="pricing-details">
                                    <div className="pricing-details-title-value">
                                        <p className="pricing-details-title">Sub Total:</p>
                                        <p className="pricing-details-value">
                                            {orderData[0]?.amount}
                                        </p>
                                    </div>
                                    <div className="pricing-details-title-value">
                                        <p className="pricing-details-title">Discount:</p>
                                        <p className="pricing-details-value">0</p>
                                    </div>
                                    <div className="pricing-details-title-value">
                                        <p className="pricing-details-title">Delivery Charge:</p>
                                        <p className="pricing-details-value">0</p>
                                    </div>
                                    <div className="pricing-details-title-value">
                                        <p className="pricing-details-title">GST:</p>
                                        <p className="pricing-details-value">0</p>
                                    </div>
                                    <div className="dashed-divider"></div>
                                    <div className="pricing-details-title-value">
                                        <p className="pricing-details-total">Total (INR):</p>
                                        <p className="pricing-details-total">
                                            Rs. {orderData[0]?.amount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="border-0 mb-3 ">
                        <CardHeader>
                            <div className="d-flex justify-content-between align-items-center">
                                <b>Order Status</b>
                                <div className="actions">
                                    <button
                                        className="confirm-order-button"
                                        onClick={() => confirmOrder()}
                                    >
                                        <LocationIcon /> Change Address
                                    </button>
                                    <button className="confirm-order-button orange">
                                        <CancelOrder /> Cancel Order
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="statuses">
                                <div className="status-icon-and-text">
                                    <div className="status-icon">
                                        <img src={shoppingIcon} alt="" />
                                    </div>
                                    <p>
                                        <b>Order Placed</b> - Wed, 15 Dec 202
                                    </p>
                                </div>
                                <div className="dashed-divider-and-status-details">
                                    <div className="dashed-divider"></div>
                                    <div className="status-details">
                                        <p className="status-details-heading ">
                                            An order has been placed.
                                        </p>
                                        <p className="status-details-body">
                                            Wed, 15 Dec 2021 - 05:34PM
                                        </p>
                                        <p className="status-details-heading">
                                            Seller has proccessed your order.
                                        </p>
                                        <p className="status-details-body">
                                            Thu, 16 Dec 2021 - 5:48AM
                                        </p>
                                    </div>
                                </div>
                                <div className="status-icon-and-text">
                                    <div className="status-icon">
                                        <PackagingIcon />
                                    </div>
                                    <p>
                                        <b>Packed</b> - Thu, 16 Dec 2021
                                    </p>
                                </div>
                                <div className="dashed-divider-and-status-details">
                                    <div className="dashed-divider"></div>
                                    <div className="status-details">
                                        <p className="status-details-heading">
                                            Your Item has been picked up by courier patner.
                                        </p>
                                        <p className="status-details-body">
                                            Fri, 17 Dec 2021 - 9:45AM
                                        </p>
                                    </div>
                                </div>{" "}
                                <div className="status-icon-and-text">
                                    <div className="status-icon">
                                        <ShopIcon />
                                    </div>
                                    <p>
                                        <b>Shipping </b> - Thu, 16 Dec 2021
                                    </p>
                                </div>
                                <div className="dashed-divider-and-status-details">
                                    <div className="dashed-divider"></div>
                                    <div className="status-details">
                                        <p className="status-details-heading">
                                            RQK Logistics - MFDS1400457854
                                            <br />
                                            Your item has been shipped.
                                        </p>
                                        <p className="status-details-body">
                                            Sat, 18 Dec 2021 - 4.54PM
                                        </p>
                                    </div>
                                </div>{" "}
                                <div className="status-icon-and-text ">
                                    <div className="status-icon">
                                        <img src={shoppingIcon} alt="" />
                                    </div>
                                    <p>
                                        <b>Out For Delivery </b>
                                    </p>
                                </div>
                                <div class="dashed-divider-and-status-details">
                                    <div class="dashed-divider"></div>
                                    <div class="status-details">
                                        <p className="status-details-heading">&nbsp; </p>
                                    </div>
                                </div>
                                <div className="status-icon-and-text">
                                    <div className="status-icon">
                                        <img src={shoppingIcon} alt="" />
                                    </div>
                                    <p>
                                        <b>Delivered </b>
                                    </p>
                                </div>
                                <div class="dashed-divider-and-status-details">
                                    <div class="dashed-divider"></div>
                                    <div class="status-details"></div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card className="border-0 mb-3 ">
                        <CardHeader>
                            {" "}
                            <div className="d-flex justify-content-between align-items-center">
                                <b>Logistics Details</b>
                                <div className="actions">
                                    <button
                                        className="confirm-order-button"
                                        onClick={() => confirmOrder()}
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="text-center d-flex align-items-center flex-column justify-content-center ">
                                <TruckSvg />
                                <h5>RQK Logistics</h5>
                                <p className="text-muted mb-0">ID: MFDS1400457854</p>
                                <p className="text-muted mb-5">Payment Mode : Debit Card</p>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="border-0 mb-3 ">
                        <CardHeader>
                            <div className="d-flex justify-content-between align-items-center">
                                <b>Customer Details</b>
                                <div className="actions">
                                    <button
                                        className="confirm-order-button bg-transparent "
                                        onClick={() => confirmOrder()}
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="">
                                <p className="mb-0">Joseph Parkers</p>
                                <p className="text-muted mb-4">Male</p>
                                <p className="d-flex gap-2 align-items-center">
                                    <EmailSvg /> josephparker@gmail.com
                                </p>
                                <p className="d-flex gap-2 align-items-center">
                                    <PhoneSvg /> +(91) 92454 51441
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="border-0 mb-3 ">
                        <CardHeader>
                            <div className="d-flex justify-content-between align-items-center">
                                <b>Billing Address</b>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="">
                                <p className="mb-2">Joseph Parkers</p>
                                <p className="fw-light mb-2"> +(91) 92454 51451</p>
                                <p className="fw-light mb-2"> 2186 Joyce Street Rocky Mount</p>
                                <p className="fw-light mb-2"> Delhi - 25645</p>
                                <p className="fw-light mb-2"> India</p>
                            </div>
                        </CardBody>
                    </Card>{" "}
                    <Card className="border-0 mb-3 ">
                        <CardHeader>
                            <div className="d-flex justify-content-between align-items-center">
                                <b>Shipping Address </b>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="">
                                <p className="mb-2">Joseph Parkers</p>
                                <p className="fw-light mb-2"> +(91) 92454 51451</p>
                                <p className="fw-light mb-2"> 2186 Joyce Street Rocky Mount</p>
                                <p className="fw-light mb-2"> Delhi - 25645</p>
                                <p className="fw-light mb-2"> India</p>
                            </div>
                        </CardBody>
                    </Card> <Card className="border-0 mb-3 ">
                        <CardHeader>
                            <div className="d-flex justify-content-between align-items-center">
                                <b>Payment Details </b>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="">
                                <p className="mb-2 d-flex  gap-2 "><span className="text-muted">Transactions:</span>#VLZ124561278124</p>
                                <p className="mb-2 d-flex  gap-2 "><span className="text-muted">Payment Method:</span>Debit Card</p>
                                <p className="mb-2 d-flex  gap-2 "><span className="text-muted">Card Holder Name:</span>Joseph Parker</p>
                                <p className="mb-2 d-flex  gap-2 "><span className="text-muted">Card Number:</span>xxxx xxxx xxxx 2456</p>
                                <p className="mb-2 d-flex  gap-2 "><span className="text-muted">Total Amount:</span>$415.96</p>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* <div className="order-details">
                <div className="order-details-body">
                    <p className="title">Orders</p>
                    <div className="order-details-cards"> */}
            {/* <div className="order-details-card">
                            <p className="order-id">Order ID: {orderId}</p>

                        </div> */}
            {/* <div className="order-details-card">
                            <div className="order-details-card-heading">
                                <p className="order-id">Order Status</p>
                                <div className="actions">
                                    <div>
                                        <button
                                            className="confirm-order-button"
                                            onClick={() => confirmOrder()}
                                        >
                                            Confirm Order
                                        </button>
                                    </div> */}
            {/* <div className="change-address">
                                </div> */}
            {/* <div className="cancel-order">
                            <p>Cancel Order</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="statuses">
                    <div className="status-icon-and-text">
                        <div className="status-icon">
                            <img src={shoppingIcon} alt="" />
                        </div>
                        <p>Order Placed</p>
                    </div>
                    <div className="dashed-divider-and-status-details">
                        <div className="dashed-divider"></div>
                        <div className="status-details">
                            <p className="status-details-heading">
                                An order has been placed.
                            </p>
                            <p className="status-details-body">
                                Wed, 15 Dec 2021 - 05:34PM
                            </p>
                            <p className="status-details-heading">
                                An order has been placed.
                            </p>
                            <p className="status-details-body">
                                Wed, 15 Dec 2021 - 05:34PM
                            </p>
                        </div>
                    </div>
                    <div className="status-icon-and-text">
                        <div className="status-icon">
                            <img src={shoppingIcon} alt="" />
                        </div>
                        <p>Order Placed</p>
                    </div>
                    <div className="dashed-divider-and-status-details">
                        <div className="dashed-divider"></div>
                        <div className="status-details">
                            <p className="status-details-heading">
                                An order has been placed.
                            </p>
                            <p className="status-details-body">
                                Wed, 15 Dec 2021 - 05:34PM
                            </p>
                            <p className="status-details-heading">
                                An order has been placed.
                            </p>
                            <p className="status-details-body">
                                Wed, 15 Dec 2021 - 05:34PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-details-card-small">
                <div className="order-details-card-heading">
                    <p className="order-id">Customer Details</p>
                    <div className="actions">
                        <div className="change-address">
                            <p>View Profile</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="heading">Joseph</div>
            </div>
        </div >
                </div >
            </div > */}
        </>
    );
};
