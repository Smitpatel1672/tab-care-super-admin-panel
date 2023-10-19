import { Box, Divider, Modal, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import * as Constants from "../../Constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CreateCategory({ open, setOpen }) {
  const [catName, setCatName] = useState("");
  const token = localStorage.getItem("wecare_token");

  const handleClose = () => {
    setOpen(false);
  };

  
  const [imageUrl, setImageUrl] = useState('');

  const handleLinkChange = (event) => {
      setImageUrl(event.target.value);
  };

  const createCatHandler = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ title: catName,img:imageUrl }),
      redirect: "follow",
    };
    let response = await fetch(
      Constants.BASE_URL + "/category/add",
      requestOptions
    );
    if (response) {
      if (response.status === 200) {
        alert("Category Created Successfully");
        setOpen(false);
      } else {
        alert("Something went wrong");
      }
    } else {
      alert("Something went wrong");
    }

  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create categories
        </Typography>
        <Divider />
        <div className="category-component">
          <input type="text" onChange={(e) => setCatName(e.target.value)} />
        </div>
        <input
        type="text"
        placeholder="Enter product image URL"
        onChange={handleLinkChange}
        value={imageUrl}
        style={{ color: "black" }}
    />
        <div
          className="create-product-button"
          onClick={() => createCatHandler()}
        >
          <p>Create</p>
        </div>
      </Box>
    </Modal>
  );
}
