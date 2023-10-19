import React from "react";
import "../styles/categories.css";
import { SearchComponent } from "../components/SearchComponent";
import { Navbar } from "../components/Navbar";
import searchIcon from "../assets/svg/search.svg";
import addCircleIcon from "../assets/svg/add_circle.svg";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import * as Constants from "../Constants";
import axios from "axios";
import Datatable from "../components/Datatable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
import { getAllManufacturers } from "../services/manufacturer.service";
import CreateManufacturer from "../components/Modal/CreateManufacturer";
import EditManufacturer from "../components/Modal/EditManufacturer";
import CommonBreadcramb from "../components/Layout/CommonBreadcramb";

const imgStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function Manufacturers() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [manufacturerId, setManufacturerId] = useState('');
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchManufacturersData = async () => {
    try {
      let manufacturers = await getAllManufacturers();
      console.log(manufacturers, 'manufacturers');

      if (manufacturers && manufacturers?.statusCode == 200) {
        // let tableData = await amenityListData(amenities.data, this);
        setData(manufacturers.data);
        let tableData = await renderData(manufacturers.data?.manufacturers);
        setTableData(tableData);
        setLoading(false);
      } else {
        // error
        console.log('error fetching manufacturers : ', manufacturers, manufacturers.message);
        let message = manufacturers && manufacturers?.message !== undefined ? manufacturers.message : "Problem Fetching Records.";
        setLoading(false);
      }
    } catch (error) {
      console.log('error catch block', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchManufacturersData();
  }, []);

  let options = {
    filter: false,
    search: false,
    selectableRows: false,
    filterType: "dropdown",
    responsive: "scroll",
    rowsPerPageOptions: [10, 20, 50, 100],
    downloadOptions: {
      filename: "manufacturers.csv",
    },
  }

  const columnsManufacturerTable = [
    {
      name: "Manufacturer Name",
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
      name: "Manufacturer Address",
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
                onClick={() => openEditCategoryModel(value)}
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

  const renderData = async (manufacturers) => {
    let temp = [];
    if (manufacturers?.length) {
      manufacturers.map((manufacturer) => {
        temp.push([
          manufacturer.name,
          manufacturer.address,
          manufacturer.isActive,
          manufacturer.uuid
        ])
      })
    }
    return temp;
  };

  const handleCreateModalClose = () => {
    setOpen(false);
    setLoading(true);
    fetchManufacturersData();
  }

  const openEditCategoryModel = (id) => {
    setManufacturerId(id);
    setOpenEditModal(true);
  }

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setManufacturerId('');
    setLoading(true);
    fetchManufacturersData();
  }

  return (
    <>
      <CommonBreadcramb heading={"Manufacturers"} />
      <div className="products">
        <div className="products-body">

          <div>
            <p className="title">Manufacturers</p>
            <div>
              <div className="products-and-options">
                <div className="items-spaced-between">
                  <div
                    className="create-product-button"
                    onClick={() => setOpen(true)}
                  >
                    <img src={addCircleIcon} alt="" />
                    <p>Add Manufacturer</p>
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
                          columns={columnsManufacturerTable}
                          title={"Manufacturers"}
                        />
                    }
                  </div>
                </Paper>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <CreateManufacturer
        open={open}
        handleClose={handleCreateModalClose}
      />

      <EditManufacturer
        open={openEditModal}
        manufacturerId={manufacturerId}
        handleClose={handleEditModalClose}
      />
    </>
  );
}
