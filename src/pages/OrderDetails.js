import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import "../styles/order_details.css";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { SearchComponent } from "../components/SearchComponent";
import Table from 'react-bootstrap/Table';
import starIcon from "../assets/svg/star.svg";
import starHalfIcon from "../assets/svg/star_half.svg";
import shoppingIcon from "../assets/svg/shopping.svg";
import * as Constants from '../Constants';
import dayjs from 'dayjs';

export const OrderDetails = () => {
    const location = useLocation();
    const state = location.state;
    const [orderId, setOrderID] = useState(state?.orderId);
    // const headings = ["PRODUCT DETAILS", "MRP", "DISCOUNT", "ITEM PRICE", "QUANTITY", "RATING", "TOTAL AMOUNT"];
    const headings = ["PRODUCT DETAILS", "ITEM PRICE", "QUANTITY", "TOTAL AMOUNT"];
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
            "orderId": orderId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Constants.BASE_URL+'/order/details',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjY2M4MTI2NDkyYTM4M2NlYTM0NSIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQwMjU5Mjl9.f6UA9UD4pw33g29sp5d4L1UWu7GgI-bkgo_nbzwIDys',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setOrderData(response.data.data);
                let data = response.data?.data;
                if(data?.length && data[0]?.hasOwnProperty('shiprocketShipmentId') && data[0]?.shiprocketShipmentId !== undefined) {
                    trackOrderStatus(data[0]?.shiprocketShipmentId);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },[]);

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
            method: 'post',
            maxBodyLength: Infinity,
            url: Constants.BASE_URL+'/order/add-shipment-id',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjY2M4MTI2NDkyYTM4M2NlYTM0NSIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQwMjU5Mjl9.f6UA9UD4pw33g29sp5d4L1UWu7GgI-bkgo_nbzwIDys',
                'Content-Type': 'application/json'
            },
            data: {
                orderId: orderData[0]?._id,
                shipmentId: shipmentId
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data,'shipmentIdAdded');
                alert(`Your Shiprocked Id is : ${response.data?.data?.shiprocketShipmentId} for your order Id : ${response.data?.data?.id}, Kindly note this for future reference`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const trackOrderStatus = async (shipmentId) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Constants.BASE_URL+'/order/track-order',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2YyMDY1ZjE0YmZmMTg1NjkyMzBkZCIsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2OTE1NzQ5NTF9.LDryyqxefTngnY0yQyfRBoODAhc2gS9s7_MgZPBzmPY',
                'Content-Type': 'application/json'
            },
            data: {
                shipmentId: shipmentId,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data,'orderTrackingDetails');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const confirmOrder = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Constants.BASE_URL+'/order/confirm-order',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2YyMDY1ZjE0YmZmMTg1NjkyMzBkZCIsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2OTE1NzQ5NTF9.LDryyqxefTngnY0yQyfRBoODAhc2gS9s7_MgZPBzmPY',
                'Content-Type': 'application/json'
            },
            data: {
                orderId: orderData[0]?._id,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data,'orderConfirmedAtShiprocket');
                alert(`Your Shiprocked Id is : ${response.data?.data?.shiprocketShipmentId} for your order Id : ${response.data?.data?.id}, Kindly note this for future reference`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="order-details">
            <Navbar />
            <div className="order-details-body">
                <SearchComponent />
                <p className="title">Orders</p>
                <div className="order-details-cards">
                    <div className="order-details-card">
                        <p className="order-id">Order ID: {orderId}</p>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {headings.map((item) => (<th key={item}>{item}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.map((item,i) => {
                                    return (
                                        // <div className="orders-data-values">
                                        <tr key={i}>
                                            <td key={item.products[i].title}>{(item.products).map((product) => { return (product?.product?.name); })}</td>
                                            <td key={item.products[i].mrp}>{(item.products).map((product) => { return (product.price); })}</td>
                                            <td key={item.products[i].quantity}>{(item.products).map((product) => { return (product.quantity); })}</td>
                                            {/* <td key={"image"+i}>
                                                <img src={starIcon} alt="" />
                                                <img src={starIcon} alt="" />
                                                <img src={starIcon} alt="" />
                                                <img src={starIcon} alt="" />
                                                <img src={starHalfIcon} alt="" />
                                                <img src={editIcon} alt="" />
                                                <img src={deleteIcon} alt="" />
                                            </td> */}
                                            <td key={item.products[i].price}>{(item.products).map((product) => { return (product.product.price); })}</td>
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
                                    <p className="pricing-details-value">{orderData[0]?.amount}</p>
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
                                    <p className="pricing-details-total">Rs. {orderData[0]?.amount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-details-card">
                        <div className="order-details-card-heading">
                            <p className="order-id">Order Status</p>
                            <div className="actions">
                                <div>
                                    <button
                                        className='confirm-order-button'
                                        onClick={() => confirmOrder()}
                                    >
                                        Confirm Order
                                    </button>
                                </div>
                                {/* <div className="change-address">
                                </div> */}
                                <div className="cancel-order">
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
                                    <p className="status-details-heading">An order has been placed.</p>
                                    <p className="status-details-body">Wed, 15 Dec 2021 - 05:34PM</p>
                                    <p className="status-details-heading">An order has been placed.</p>
                                    <p className="status-details-body">Wed, 15 Dec 2021 - 05:34PM</p>
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
                                    <p className="status-details-heading">An order has been placed.</p>
                                    <p className="status-details-body">Wed, 15 Dec 2021 - 05:34PM</p>
                                    <p className="status-details-heading">An order has been placed.</p>
                                    <p className="status-details-body">Wed, 15 Dec 2021 - 05:34PM</p>
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
                </div>
            </div>
        </div>
    )
}
