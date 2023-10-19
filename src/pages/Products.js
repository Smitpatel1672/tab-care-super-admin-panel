import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { SearchComponent } from "../components/SearchComponent";
import '../styles/products.css';
import addCircleIcon from "../assets/svg/add_circle.svg";
import searchIcon from '../assets/svg/search.svg';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from 'react-bootstrap/Table';
import viewIcon from "../assets/svg/view.svg";
import editIcon from "../assets/svg/edit.svg";
import deleteIcon from "../assets/svg/delete.svg";
import * as Constants from '../Constants';

export const Products = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('wecare_token');

    const [value, setValue] = useState(0);
    const headings = ["S. No.", "PRODUCT", "CATEGORY", "PRICE", "MRP", "ORDERS", "SALE", "ACTION"];
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
            method: 'get',
            maxBodyLength: Infinity,
            url: Constants.BASE_URL+'/product',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [setData, token]);

    function handleDelete(e){
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: Constants.BASE_URL+'/product/'+e,
            headers: { 
              'Content-Type': 'application/json', 
              'Accept': 'application/json', 
              'Authorization': 'Bearer '+token
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            alert(response.data.message);
            let arr = [];
            data.map((element)=>{
                if(element.id!==e){
                    arr.push(element);
                }
                return setData(arr);
            });
          })
          .catch((error) => {
            console.log(error);
          });
          
    };

    return (
        <div className="products">
            <Navbar />
            <div className="products-body">
                <SearchComponent />
                <p className="title">Products</p>
                <div className="filter-and-products">
                    <div className="filter">
                        <div className="items-spaced-between">
                            <p className="filter-heading">Filters</p>
                            <p className="underlined-button">Clear All</p>
                        </div>
                        <div className="divider"></div>
                        <p>Category</p>
                        <p>Price</p>
                        <div className="price-range">
                            <input type="range" name="" id="" />
                            <div className="min-max">
                                <input type="text" name="min" id="min" placeholder="Min." />
                                <p>to</p>
                                <input type="text" name="max" id="max" placeholder="Max." />
                            </div>
                        </div>
                        <p>Prescription Required</p>
                        <p>Manufacturing Company</p>
                        <p> rating</p>
                        <p>Uses</p>
                        <p>Discount</p>
                        <p>Age</p>
                    </div>
                    <div className="products-and-options">
                        <div className="items-spaced-between">
                            <div className="create-product-button" onClick={() => navigate('/createproduct')}>
                                <img src={addCircleIcon} alt="" />
                                <p>Create Product</p>
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
                                    {headings.map((item) => (<th key={item}>{item}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => {
                                    return (
                                        // <div className="orders-data-values">
                                        <tr key={i}>
                                            <td key={i + 1}>{i + 1}</td>
                                            <td key={item.images} className="product-image-and-name"><img src={Constants.IMAGE_BASE_URL+item.images[0]} style={{ height: '40px', width: '40px' }} alt={item.name} />{item.name}</td>
                                            <td key={item.category}>{item.category}</td>
                                            <td key={item.price}>{item.price}</td>
                                            <td key={item.mrp}>{item.mrp}</td>
                                            {/* <td key={item}>{item.rating}</td> */}
                                            <td key={item.orders}>{item.orders}</td> 
                                            <td key={item.sale}>{item.sale}</td>
                                            <td key={item + "action" + i}>
                                                <img src={viewIcon} alt="" onClick={() => navigate('/orders/details', { state: {} })} />
                                                <img src={editIcon} alt="" />
                                                <img src={deleteIcon} alt="" onClick={()=>handleDelete(item.id)}/>
                                            </td>
                                        </tr>
                                        //     <div className="divider"></div>
                                        // </div>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
