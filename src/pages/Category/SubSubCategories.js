import React from "react";
import "../../styles/categories.css";
import { SearchComponent } from "../../components/SearchComponent";
import { Navbar } from "../../components/Navbar";
import searchIcon from "../../assets/svg/search.svg";
import addCircleIcon from "../../assets/svg/add_circle.svg";
import { useNavigate } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import * as Constants from "../../Constants";
import axios from "axios";
import { getAllSubSubCategories } from "../../services/category.service";
import Datatable from "../../components/Datatable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
import CreateSubSubCategory from "../../components/Modal/CreateSubSubCategory";
import EditSubSubCategory from "../../components/Modal/EditSubSubCategory";
import CommonBreadcramb from "../../components/Layout/CommonBreadcramb";

const imgStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function SubSubCategories() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [subSubCategoryId, setSubSubCategoryId] = useState('');
  const [tableData, setTableData] = useState([]);

  const fetchSubSubCategoryData = async () => {
    try {
      let subSubCategories = await getAllSubSubCategories();
      console.log(subSubCategories, 'subSubCategories');

      if (subSubCategories && subSubCategories?.statusCode == 200) {
        // let tableData = await amenityListData(amenities.data, this);
        setData(subSubCategories.data);
        let tableData = await renderData(subSubCategories.data?.subSubCategories);
        setTableData(tableData);
        setLoading(false);
      } else {
        // error
        console.log('error fetching subSubcategories : ', subSubCategories, subSubCategories.message);
        let message = subSubCategories && subSubCategories?.message !== undefined ? subSubCategories.message : "Problem Fetching Records.";
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
    fetchSubSubCategoryData();
  }, []);

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setSubSubCategoryId('');
    setLoading(true);
    fetchSubSubCategoryData();
  }

  const openEditSubSubCategoryModal = (id) => {
    setSubSubCategoryId(id);
    setOpenEditModal(true);
  }

  const columnsSubCategoryTable = [
    {
      name: "SubCategory",
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
      name: "Sub Category",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <span>
              <div>
                <p>{value}</p>
              </div>
            </span>
          );
        },
      },
    },
    {
      name: "Parent Category",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <span>
              <div>
                <p>{value}</p>
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
                onClick={() => openEditSubSubCategoryModal(value)}
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

  const renderData = async (subSubCategories) => {
    let temp = [];
    if (subSubCategories?.length) {
      subSubCategories.map((subSubCategory) => {
        temp.push([
          {
            image: subSubCategory.img,
            title: subSubCategory.title
          },
          subSubCategory.subCategory?.title,
          subSubCategory.category?.title,
          subSubCategory.isActive,
          subSubCategory.uuid
        ])
      })
    }
    return temp;
  }

  const handleCreateModalClose = () => {
    setOpen(false);
    setLoading(true);
    fetchSubSubCategoryData();
  }

  return (
    <>
      <CommonBreadcramb heading={"Sub Sub Categories"} />
      <div className="products">
        <div className="products-body">

          <div>
            <p className="title">Sub Sub Categories</p>
            <div>
              <div className="products-and-options">
                <div className="items-spaced-between">
                  <div
                    className="create-product-button"
                    onClick={() => setOpen(true)}
                  >
                    <img src={addCircleIcon} alt="" />
                    <p>Add Sub Sub Category</p>
                  </div>
                  <div className="search-product">
                    <img src={searchIcon} alt="" />
                    <p>Search...</p>
                  </div>
                </div>
              </div>
              <Box className="products-and-options" sx={{ mt: 1 }}>
                <Paper square>
                  {
                    loading ?
                      <CircularProgress />
                      :
                      <Datatable
                        data={tableData}
                        options={options}
                        columns={columnsSubCategoryTable}
                        title={"Sub Sub Categories"}
                      />
                  }
                </Paper>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <CreateSubSubCategory
        open={open}
        handleClose={handleCreateModalClose}
      />

      <EditSubSubCategory
        open={openEditModal}
        subSubCategoryId={subSubCategoryId}
        handleClose={handleEditModalClose}
      />
    </>
  );
}
