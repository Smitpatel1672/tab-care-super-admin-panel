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
import { useEffect } from "react";
import * as Constants from "../../Constants";
import { getAllSubCategories } from "../../services/category.service";
import Datatable from "../../components/Datatable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
import CreateSubCategory from "../../components/Modal/CreateSubCategory";
import EditSubCategory from "../../components/Modal/EditSubCategory";
import CommonBreadcramb from "../../components/Layout/CommonBreadcramb";

const imgStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function SubCategories() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fetchSubCategoryData = async () => {
    try {
      let subCategories = await getAllSubCategories();
      console.log(subCategories, 'subCategories');

      if (subCategories && subCategories?.statusCode == 200) {
        // let tableData = await amenityListData(amenities.data, this);
        setData(subCategories.data);
        let tableData = await renderData(subCategories.data?.subcategories);
        setTableData(tableData);
        setLoading(false);
      } else {
        // error
        console.log('error fetching subcategories : ', subCategories, subCategories.message);
        let message = subCategories && subCategories?.message !== undefined ? subCategories.message : "Problem Fetching Records.";
        console.log(message);
        setLoading(false);
      }
    } catch (error) {
      console.log('error catch block', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubCategoryData();
  }, []);

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setSubCategoryId('')
    setLoading(true);
    fetchSubCategoryData();
  }

  const openEditSubCategoryModal = (id) => {
    setSubCategoryId(id);
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
                onClick={() => openEditSubCategoryModal(value)}
              >
                <EditIcon />
              </IconButton>
              {/* <IconButton
                title="Delete"
                style={{ 'color' : 'rgba(236, 36, 48, 0.51)'}}
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

  const renderData = async (subCategories) => {
    let temp = [];
    if (subCategories?.length) {
      subCategories.map((subCategory) => {
        temp.push([
          {
            image: subCategory.img,
            title: subCategory.title
          },
          subCategory.category.title,
          subCategory.isActive,
          subCategory.uuid
        ])
      })
    }
    return temp;
  }

  const handleCreateModalClose = () => {
    setOpen(false);
    setLoading(true);
    fetchSubCategoryData();
  }

  return (
    <>
      <CommonBreadcramb heading={"Sub Categories "} />
      <div className="products">

        <div className="products-body">

          <div>
            <p className="title">Sub Categories</p>
            <div>
              <div className="products-and-options">
                <div className="items-spaced-between">
                  <div
                    className="create-product-button"
                    onClick={() => setOpen(true)}
                  >
                    <img src={addCircleIcon} alt="" />
                    <p>Add Sub Category</p>
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
                          columns={columnsSubCategoryTable}
                          title={"Sub Categories"}
                        />
                    }
                  </div>
                </Paper>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <CreateSubCategory
        open={open}
        handleClose={handleCreateModalClose}
      />

      <EditSubCategory
        open={openEditModal}
        subCategoryId={subCategoryId}
        handleClose={handleEditModalClose}
      />
    </>
  );
}
