import React from "react";
import "../../styles/categories.css";
import { SearchComponent } from "../../components/SearchComponent";
import { Navbar } from "../../components/Navbar";
import searchIcon from "../../assets/svg/search.svg";
import addCircleIcon from "../../assets/svg/add_circle.svg";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import CreateCategory from "../../components/Modal/CreateCategory";
import { useEffect } from "react";
import * as Constants from "../../Constants";
import axios from "axios";
import { getAllCategories } from "../../services/category.service";
import Datatable from "../../components/Datatable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
import EditCategory from "../../components/Modal/EditCategory";
import CommonBreadcramb from "../../components/Layout/CommonBreadcramb";

const imgStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function Categories() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchCategoryData = async () => {
    try {
      let categories = await getAllCategories();
      console.log(categories, 'categories');

      if (categories && categories?.statusCode == 200) {
        // let tableData = await amenityListData(amenities.data, this);
        setData(categories.data);
        let tableData = await renderData(categories.data?.categories);
        setTableData(tableData);
        setLoading(false);
      } else {
        // error
        console.log('error fetching categories : ', categories, categories.message);
        let message = categories && categories?.message !== undefined ? categories.message : "Problem Fetching Records.";
        console.log(message);
        setLoading(false);
      }
    } catch (error) {
      console.log('error catch block', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchCategoryData();
  }, []);

  let options = {
    filter: false,
    search: false,
    selectableRows: false,
    filterType: "dropdown",
    responsive: "scroll",
    rowsPerPageOptions: [10, 20, 50, 100],
    downloadOptions: {
      filename: "parent-category.csv",
    },
  }

  const columnsCategoryTable = [
    {
      name: "Category",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <span>
              <div>
                <Avatar src={value?.image} alt="Avatar" />
                <p>{value.title}</p>
              </div>
            </span>
          );
        },
      },
    },
    {
      name: "Status",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <span>
              <div>
                <p>{value ? 'Live' : 'Draft'}</p>
              </div>
            </span>
          );
        },
      },
    },
    {
      name: "Action",
      options: {
        filter: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(value, "actions");
          return (
            <div className="action_div">
              <IconButton
                title="Edit"
                onClick={() => openEditCategoryModal(value)}
              >
                <EditIcon />
              </IconButton>
              {/* <IconButton
                title="Delete"
                // onClick={() => deleteAmenity(value, thisEvt)}
              >
                <DeleteIcon />
              </IconButton> */}
            </div>
          );
        },
      },
    },
  ];

  const renderData = async (categories) => {
    let temp = [];
    if (categories?.length) {
      categories.map((category) => {
        temp.push([
          {
            image: category.img,
            title: category.title
          },
          category.isActive,
          category.uuid
        ])
      })
    }
    return temp;
  };

  const handleCreateModalClose = () => {
    setOpen(false);
    setLoading(true);
    fetchCategoryData();
  };


  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setCategoryId('')
    setLoading(true);
    fetchCategoryData();
  }

  const openEditCategoryModal = (id) => {
    setCategoryId(id);
    setOpenEditModal(true);
  }

  return (
    <>

      <CommonBreadcramb heading={"Categories"} />
      <div className="products">
        <div className="products-body">
          <div>
            {/* <p className="title">Categories</p> */}
            <div>
              <div className="products-and-options">
                <div className="items-spaced-between">
                  <div
                    className="create-product-button"
                    onClick={() => setOpen(true)}
                  >
                    <img src={addCircleIcon} alt="" />
                    <p>Add Category</p>
                  </div>
                  <div className="search-product">
                    <img src={searchIcon} alt="" />
                    <p>Search...</p>
                  </div>
                </div>
              </div>
              <Box className="products-and-options" sx={{ mt: 1 }}>
                <Paper square>
                  <div>
                    {
                      loading ?
                        <CircularProgress />
                        :
                        <Datatable
                          data={tableData}
                          options={options}
                          columns={columnsCategoryTable}
                          title={"Categories"}
                        />
                    }
                  </div>
                </Paper>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <CreateCategory
        open={open}
        handleClose={handleCreateModalClose}
      />

      <EditCategory
        open={openEditModal}
        categoryId={categoryId}
        handleClose={handleEditModalClose}
      />
    </>
  );
}
