import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { SearchComponent } from "../components/SearchComponent";
import "../styles/products.css";
import addCircleIcon from "../assets/svg/add_circle.svg";
import searchIcon from "../assets/svg/search.svg";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from "react-bootstrap/Table";
import viewIcon from "../assets/svg/view.svg";
import editIcon from "../assets/svg/edit.svg";
import deleteIcon from "../assets/svg/delete.svg";
import * as Constants from "../Constants";
import CommonBreadcramb from "../components/Layout/CommonBreadcramb";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, Col, FormGroup, Input, Row } from "reactstrap";
import { Slider } from "@material-ui/core";
import UploadSvgIcon from "../assets/svg/upload_svg.svg";
export const Products = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("wecare_token");

    const [value, setValue] = useState(0);
    const headings = [
        "S. No.",
        "PRODUCT",
        "CATEGORY",
        "PRICE",
        "MRP",
        "ORDERS",
        "SALE",
        "ACTION",
    ];
    let [data, setData] = useState([]);
    // const data = [
    //     { product: "Vicky Sharma", category: "Dolo 650 mg", price: "50", mrp: "85.50", rating:"4.5", orders: "5000", sale: "50" },
    //     { product: "Vicky Sharma", category: "Dolo 650 mg", price: "50", mrp: "85.50", rating:"4.5", orders: "5000", sale: "50" },
    //     { product: "Vicky Sharma", category: "Dolo 650 mg", price: "50", mrp: "85.50", rating:"4.5", orders: "5000", sale: "50" },
    //     { product: "Vicky Sharma", category: "Dolo 650 mg", price: "50", mrp: "85.50", rating:"4.5", orders: "5000", sale: "50" },
    //     { product: "Vicky Sharma", category: "Dolo 650 mg", price: "50", mrp: "85.50", rating:"4.5", orders: "5000", sale: "50" },
    //     { product: "Vicky Sharma", category: "Dolo 650 mg", price: "50", mrp: "85.50", rating:"4.5", orders: "5000", sale: "50" },
    //     { product: "Vicky Sharma", category: "Dolo 650 mg", price: "50", mrp: "85.50", rating:"4.5", orders: "5000", sale: "50" },
    // ]

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: Constants.BASE_URL + "/product",
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-type": "application/json",
            },
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
                setData([
                    {
                        product: "Vicky Sharma",
                        category: "Dolo 650 mg",
                        price: "50",
                        mrp: "85.50",
                        rating: "4.5",
                        orders: "5000",
                        sale: "50",
                    },
                    {
                        product: "Vicky Sharma",
                        category: "Dolo 650 mg",
                        price: "50",
                        mrp: "85.50",
                        rating: "4.5",
                        orders: "5000",
                        sale: "50",
                    },
                    {
                        product: "Vicky Sharma",
                        category: "Dolo 650 mg",
                        price: "50",
                        mrp: "85.50",
                        rating: "4.5",
                        orders: "5000",
                        sale: "50",
                    },
                    {
                        product: "Vicky Sharma",
                        category: "Dolo 650 mg",
                        price: "50",
                        mrp: "85.50",
                        rating: "4.5",
                        orders: "5000",
                        sale: "50",
                    },
                    {
                        product: "Vicky Sharma",
                        category: "Dolo 650 mg",
                        price: "50",
                        mrp: "85.50",
                        rating: "4.5",
                        orders: "5000",
                        sale: "50",
                    },
                    {
                        product: "Vicky Sharma",
                        category: "Dolo 650 mg",
                        price: "50",
                        mrp: "85.50",
                        rating: "4.5",
                        orders: "5000",
                        sale: "50",
                    },
                    {
                        product: "Vicky Sharma",
                        category: "Dolo 650 mg",
                        price: "50",
                        mrp: "85.50",
                        rating: "4.5",
                        orders: "5000",
                        sale: "50",
                    },
                ]);
            });
    }, [setData, token]);

    function handleDelete(e) {
        let config = {
            method: "delete",
            maxBodyLength: Infinity,
            url: Constants.BASE_URL + "/product/" + e,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert(response.data.message);
                let arr = [];
                data.map((element) => {
                    if (element.id !== e) {
                        arr.push(element);
                    }
                    return setData(arr);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const [open, setOpen] = useState('');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    const [values, setValues] = useState([100, 1000]);

    const handleChange = (event, newValues) => {
        setValues(newValues);
    };

    const valueLabelFormat = (value) => {
        return `$${value}`;
    };


    return (
        <>
            <CommonBreadcramb heading={"Products"} />
            <Row className="products">
                <Col md={3}>
                    <Card className="border-0 profuct_filter">
                        <div className="items-spaced-between">
                            <p className="filter-heading">Filters</p>
                            <p className="underlined-button">Clear All</p>
                        </div>
                        <div className="divider"></div>
                        <Accordion flush open={open} toggle={toggle}>
                            <AccordionItem>
                                <AccordionHeader targetId="1" className="m-0">Category</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <p className="mb-1">
                                        Headache
                                    </p>
                                    <p className="mb-1">
                                        Painkiller
                                    </p>
                                    <p className="mb-1">
                                        Mobiles
                                    </p>
                                    <p className="mb-1">
                                        <FormGroup check>
                                            <Input type="checkbox" id="myCheckbox" />
                                            {' '}
                                            <p htmlFor="myCheckbox" check>
                                                Electronics
                                            </p>
                                        </FormGroup>
                                    </p>
                                    <p className="mb-1">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Home" />
                                            {' '}
                                            <p htmlFor="Home" check>
                                                Home & Furniture
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-1 ">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Appliances" />
                                            {' '}
                                            <p htmlFor="Appliances" check>
                                                Appliances
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-1">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Kids" />
                                            {' '}
                                            <p htmlFor="Kids" check>
                                                Kids
                                            </p>
                                        </FormGroup>
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="2" className="m-0">PRICE</AccordionHeader>
                                <AccordionBody accordionId="2">
                                    <Slider
                                        value={values}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={valueLabelFormat}
                                        aria-labelledby="range-slider"
                                        min={100}  // Minimum value
                                        max={10000} // Maximum value
                                    />
                                    <div className="min-max">
                                        <Input type="text" name="min" id="min" placeholder="Min." />
                                        <p className="mb-0">to</p>
                                        <Input type="text" name="max" id="max" placeholder="Max." />
                                    </div>
                                </AccordionBody>
                            </AccordionItem> <AccordionItem>
                                <AccordionHeader targetId="3" className="m-0">BRANDS</AccordionHeader>
                                <AccordionBody accordionId="3">
                                    <Input class="form-control mr-sm-2 mb-4" type="search" placeholder="Search" aria-label="Search" />
                                    <p className="mb-0">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Home" />
                                            {' '}
                                            <p htmlFor="Home" check>
                                                Home & Furniture
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-0 ">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Appliances" />
                                            {' '}
                                            <p htmlFor="Appliances" check>
                                                Appliances
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-0">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Kids" />
                                            {' '}
                                            <p htmlFor="Kids" check>
                                                Kids
                                            </p>
                                        </FormGroup>
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="5" className="m-0">DISCOUNT</AccordionHeader>
                                <AccordionBody accordionId="5">
                                    <p className="mb-0">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Home" />
                                            {' '}
                                            <p htmlFor="Home" check>
                                                Home & Furniture
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-0 ">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Appliances" />
                                            {' '}
                                            <p htmlFor="Appliances" check>
                                                Appliances
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-0">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Kids" />
                                            {' '}
                                            <p htmlFor="Kids" check>
                                                Kids
                                            </p>
                                        </FormGroup>
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="4" className="m-0">RATING</AccordionHeader>
                                <AccordionBody accordionId="4">
                                    <p className="mb-0">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Home" />
                                            {' '}
                                            <p htmlFor="Home" check>
                                                Home & Furniture
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-0 ">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Appliances" />
                                            {' '}
                                            <p htmlFor="Appliances" check>
                                                Appliances
                                            </p>
                                        </FormGroup>
                                    </p><p className="mb-0">
                                        <FormGroup check>
                                            <Input type="checkbox" id="Kids" />
                                            {' '}
                                            <p htmlFor="Kids" check>
                                                Kids
                                            </p>
                                        </FormGroup>
                                    </p>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                        {/* <CardBody>
                            <p>BRANDS</p>
                            <p>Manufacturing Company</p>
                            <p> rating</p>
                            <p>Uses</p>
                            <p>Discount</p>
                            <p>Age</p>
                        </CardBody> */}
                    </Card>
                    <div className="filter"></div>
                </Col>{" "}
                <Col md={9}>
                    <Card className='border-0'>
                        <div className="items-spaced-between">
                            <div className="d-flex gap-3">

                                <div
                                    className="create-product-button"
                                    onClick={() => navigate("/createproduct")}
                                >
                                    <img src={addCircleIcon} alt="" />
                                    <p>Create Product</p>
                                </div>
                                <div
                                    className="create-product-button"
                                    onClick={() => navigate("/createproduct")}
                                >
                                    <img src={UploadSvgIcon} alt="" />
                                    <p>Bulk Upload</p>
                                </div>
                            </div>
                            <div className="search-product">
                                <img src={searchIcon} alt="" />
                                <p>Search Products...</p>
                            </div>
                        </div>
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
                                <Tab label="All" />
                                <Tab label="Published" />
                                <Tab label="Draft" />
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
                                {data.map((product, index) => {
                                    return (
                                        // <div className="orders-data-values">
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{product.product}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>{product.mrp}</td>
                                            <td>{product.orders}</td>
                                            <td>{product.sale}</td>
                                            {/* <td key={i + 1}>{i + 1}</td>
                                            <td key={item.images} className="product-image-and-name"><img src={Constants.IMAGE_BASE_URL + item.images[0]} style={{ height: '40px', width: '40px' }} alt={item.name} />{item.name}</td>
                                            <td key={item.category}>{item.category}</td>
                                            <td key={item.price}>{item.price}</td>
                                            <td key={item.mrp}>{item.mrp}</td> */}
                                            {/* <td key={item}>{item.rating}</td> */}
                                            {/* <td key={item.orders}>{item.orders}</td>
                                            <td key={item.sale}>{item.sale}</td>
                                            <td key={item + "action" + i}>
                                                <img src={viewIcon} alt="" onClick={() => navigate('/orders/details', { state: {} })} />
                                                <img src={editIcon} alt="" />
                                                <img src={deleteIcon} alt="" onClick={() => handleDelete(item.id)} />
                                            </td> */}
                                        </tr>
                                        //     <div className="divider"></div>
                                        // </div>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Card>
                    <div className="products-and-options">



                    </div>
                </Col>
            </Row>
            {/* <div className="filter-and-products">


            </div> */}
            {/* </div> */}

        </>
    );
};
