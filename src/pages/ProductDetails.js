import React from 'react'
import { Navbar } from "../components/Navbar";
import { SearchComponent } from "../components/SearchComponent";
import "../styles/product_details.css"

export const ProductDetails = () => {
    return (
        <div className="products">

            <div className="products-body">

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
                        {/* <div className="items-spaced-between">
                            <div className="create-product-button" onClick={() => navigate('/createproduct')}>
                                <img src={addCircleIcon} alt="" />
                                <p>Create Product</p>
                            </div>
                            <div className="search-product">
                                <img src={searchIcon} alt="" />
                                <p>Search Products...</p>
                            </div>
                        </div> */}


                    </div>
                </div>
            </div>
        </div>
    )
}
