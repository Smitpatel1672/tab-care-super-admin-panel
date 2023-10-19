import React,{useState} from 'react'
import {  Tab, Table, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchComponent } from '../components/SearchComponent';
import { Paper } from '@mui/material';
import viewIcon from "../assets/svg/view.svg";
import editIcon from "../assets/svg/edit.svg";
import deleteIcon from "../assets/svg/delete.svg";
import * as Constants from '../Constants';
import addCircleIcon from "../assets/svg/add_circle.svg";
import searchIcon from '../assets/svg/search.svg';
import { Navbar } from '../components/Navbar';

export default function ViewCategoryProduct() {
    const location = useLocation();
    const state = location.state;
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  
    if (!state || !state.filteredProducts) {
      // Handle the case where state or filteredProducts is not available
      return null;
    }
  
    const filteredProducts = state.filteredProducts;
    const headings = ["S. No.", "PRODUCT", "CATEGORY", "PRICE", "MRP", "ORDERS", "SALE", "ACTION"];
  return (
    <div className="products">
    <Navbar />
    <div className="products-body">
        <SearchComponent />
        <p className="title" style={{fontSize:"20px",fontWeight:"600"}}>Categories ({filteredProducts[0]?.category})</p>
        <div className="filter-and-products">           
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
                        {filteredProducts.map((item, i) => {
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
