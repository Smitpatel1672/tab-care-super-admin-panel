import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SearchComponent } from "../components/SearchComponent";
import "../styles/create_product.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InputWithLabel } from "../components/InputWithLabel";
import axios from "axios";
import { read, utils } from "xlsx";
// import Paper from "@material-ui/core/Paper";
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Typography from '@mui/material/Typography';
import * as Constants from "../Constants";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import InputOption from "../components/Input/InputOption";
import DateTimePicker from "../components/Input/DateTimePicker";
import CategoryOption from "../components/Input/CategoryOption";
import ReactSelect from "../components/Input/ReactSelect";
import CommonBreadcramb from "../components/Layout/CommonBreadcramb";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const CreateProduct = () => {
  // const HomeComponent = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("wecare_token");

  let [excelData, setExcelData] = useState([]);

  const headings = [
    "Product",
    "Prescription Required",
    "Category",
    "Manufacturing Company",
    "MRP",
    "Discount",
    "Packaging",
    "Uses",
  ];

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          console.log(rows);
          setExcelData(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // const handleExport = () => {
  //     const headings = [[
  //         'Movie',
  //         'Category',
  //         'Director',
  //         'Rating'
  //     ]];
  //     const wb = utils.book_new();
  //     const ws = utils.json_to_sheet([]);
  //     utils.sheet_add_aoa(ws, headings);
  //     utils.sheet_add_json(ws, excelData, { origin: 'A2', skipHeader: true });
  //     utils.book_append_sheet(wb, ws, 'Report');
  //     writeFile(wb, 'Movie Report.xlsx');
  // }

  //     return (
  //         <>
  //             <div className="row mb-2 mt-5">
  //                 <div className="col-sm-6 offset-3">
  //                     <div className="row">
  //                         <div className="col-md-6">
  //                             <div className="input-group">
  //                                 <div className="custom-file">
  //                                     <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
  //                                         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
  //                                     <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                         <div className="col-md-6">
  //                             <button onClick={handleExport} className="btn btn-primary float-right">
  //                                 Export <i className="fa fa-download"></i>
  //                             </button>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>
  //             <div className="row">
  //                 <div className="col-sm-6 offset-3">
  //                     <table className="table">
  //                         <thead>
  //                             <tr>
  //                                 <th scope="col">Id</th>
  //                                 <th scope="col">Movie</th>
  //                                 <th scope="col">Category</th>
  //                                 <th scope="col">Director</th>
  //                                 <th scope="col">Rating</th>
  //                             </tr>
  //                         </thead>
  //                         <tbody>
  //                                 {
  //                                     movies.length
  //                                     ?
  //                                     movies.map((movie, index) => (
  //                                         <tr key={index}>
  //                                             <th scope="row">{ index + 1 }</th>
  //                                             <td>{ movie.Movie }</td>
  //                                             <td>{ movie.Category }</td>
  //                                             <td>{ movie.Director }</td>
  //                                             <td><span className="badge bg-warning text-dark">{ movie.Rating }</span></td>
  //                                         </tr>
  //                                     ))
  //                                     :
  //                                     <tr>
  //                                         <td colSpan="5" className="text-center">No Movies Found.</td>
  //                                     </tr>
  //                                 }
  //                         </tbody>
  //                     </table>
  //                 </div>
  //             </div>
  //         </>

  //     );
  // };

  // export default HomeComponent;

  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  let [categories, setCategories] = useState(["-select category-"]);
  let [sub_categories, setSubCategories] = useState(["-select category-"]);
  let [arr, setArr] = useState(inputArr);
  let [sku_code, setSkuCode] = useState("");
  let [name, setName] = useState("");
  let [images, setImages] = useState([]);
  let [category_id, setCategoryID] = useState("");
  let [category, setCategory] = useState("");
  let [sub_category_id, setSubCategoryID] = useState("");
  let [sub_category, setSubCategory] = useState("");
  let [schedule, setSchedule] = useState("");
  let [manufacturing_company, setManufacturingCompany] = useState("");
  let [manufacturer_address, setManufacturerCompanyAddress] = useState("");
  let [salt_composition, setSaltComposition] = useState("");
  let [medicine_type, setMedicineType] = useState("");
  let [stock, setStock] = useState("");
  let [introduction, setIntroduction] = useState("");
  let [ingredients, setIngredients] = useState("");
  let [benefits, setBenefits] = useState("");
  let [description, setDescription] = useState("");
  let [how_to_use, setHowToUse] = useState("");
  let [safety_advice, setSafetyAdvice] = useState("");
  let [if_miss, setIfMiss] = useState("");
  let [packaging, setPackaging] = useState("");
  let [mrp, setMRP] = useState("");
  let [discount, setDiscount] = useState("");
  let [gst, setGST] = useState("");
  let [price, setPrice] = useState("");
  let [prescription_required, setPrescriptionRequired] = useState("");
  let [label, setLabel] = useState("");
  let [fact_box, setFactBox] = useState("");
  let [primary_use, setPrimaryUse] = useState("");
  let [salt_synonyms, setSaltSynonyms] = useState("");
  let [storage, setStorage] = useState("");
  let [use_of, setUseOf] = useState("");
  let [common_side_effect, setCommonSideEffect] = useState("");
  let [alcohol_interaction, setAlcoholInteraction] = useState("");
  let [pregnancy_interaction, setPregnancyInteraction] = useState("");
  let [lactatin_interaction, setLactatinInteraction] = useState("");
  let [driving_interaction, setDrivingInteraction] = useState("");
  let [kidney_interaction, setKidneyInteraction] = useState("");
  let [liver_interaction, setLiverInteraction] = useState("");
  let [other_drugs_interaction, setOtherDrugsInteraction] = useState("");
  let [country_of_origin, setCountryOfOrigin] = useState("");

  // let [manufacturingCompany, setManufacturingCompany] = useState("");
  // let [manufacturingCompanyAddress, setManufacturingCompanyAddress] = useState("");
  // let [description, setDesc] = useState("");
  // let [introduction, setIntroduction] = useState("");
  // let [benefits, setBenefits] = useState("");
  // let [howToUse, setHowToUse] = useState("");
  // let [safetyAdvice, setSafetyAdvice] = useState("");
  // let [ingredients, setIngredients] = useState("");
  // let [prescriptionRequired, setPrescriptionRequired] = useState(false);
  // let [packaging, setPackaging] = useState("");
  // let [mrp, setMrp] = useState("");
  // let [discount, setDiscount] = useState("");
  // let [price, setPrice] = useState("");

  // images = setImages( [
  //     "https://i.imgur.com/AagPgGE.jpg",
  //     "https://i.imgur.com/grxIzhD.jpg",
  //     "https://i.imgur.com/dJQ8SAr.jpg",
  //     "https://i.imgur.com/jxmXNUA.jpg",
  //     "https://i.imgur.com/st1HAEr.jpg",
  //     "https://i.imgur.com/oQt4Cnx.jpg",
  //     "https://i.imgur.com/xUw3JnK.jpg",
  //     "https://i.imgur.com/CEnPxDo.jpg"
  // ]);
  console.log("arr", arr);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  let handleSkuChange = (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setSkuCode((name) => {
      name = e.target.value;
      //console.log(name);
      return name;
    });
  };

  let handleNameChange = (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setName((name) => {
      name = e.target.value;
      //console.log(name);
      return name;
    });
  };

  let handleCategoryChange = async (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setCategory(e.target.value.toString().split(",")[0]);
    setCategoryID(e.target.value.toString().split(",")[1]);
    console.log(category);
    console.log(category_id);
  };

  const handleLinkChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  // const [imageUrls, setImageUrls] = useState([]);

  // const handleLinkChange = (event, index) => {
  //     const updatedUrls = [...imageUrls];
  //     updatedUrls[index] = event.target.value;
  //     setImageUrls(updatedUrls);
  // };
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: Constants.BASE_URL + "/category",
      headers: {
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjY5YTIyYzc0MjEzYjA2YTE3Nzc3ZiIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzI5ODk3NDJ9.HzQzSvgRsNWY1k08DRU_aScNE2zJaz13GMG2JeOHsYI'
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        let categoriesResponse = response.data.data;
        // console.log(categoriesResponse[0].title);
        setCategories(categoriesResponse);
        setCategory(categoriesResponse[0].title);
        setCategoryID(categoriesResponse[0].id);
        console.log(category);
        console.log(category_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [category, category_id]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: Constants.BASE_URL + "/category/subcategory",
      headers: {
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjY5YTIyYzc0MjEzYjA2YTE3Nzc3ZiIsInBob25lIjoiODk3MjA2MTQwMCIsInVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzI5ODk3NDJ9.HzQzSvgRsNWY1k08DRU_aScNE2zJaz13GMG2JeOHsYI'
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        let subCategoriesResponse = response.data.data;
        // console.log(categoriesResponse[0].title);
        setSubCategories(subCategoriesResponse);
        setSubCategory(subCategoriesResponse[0].title);
        setSubCategoryID(subCategoriesResponse[0].id);
        console.log(sub_category);
        console.log(sub_category_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [sub_category, sub_category_id]);

  let handlePrescriptionChange = (e) => {
    // e.preventDefault();
    // const index = e.target.id;
    setPrescriptionRequired((prescriptionRequired) => {
      prescriptionRequired = e.target.value;
      return prescriptionRequired;
    });
    //console.log(title);
    return false;
  };

  let handleManufacturingCompanyChange = (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setManufacturingCompany((manufacturingCompany) => {
      manufacturingCompany = e.target.value.toString();
      return manufacturingCompany;
    });
    //console.log(title);
  };

  let handleMrpChange = (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setMRP((mrp) => {
      mrp = e.target.value.toString();
      return mrp;
    });
    //console.log(title);
  };

  let handleDiscountChange = (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setDiscount((discount) => {
      discount = e.target.value.toString();
      return discount;
    });
    //console.log(title);
  };

  let handlePriceChange = (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setPrice((price) => {
      price = e.target.value.toString();
      return price;
    });
    //console.log(title);
  };

  let handlePackagingChange = (e) => {
    e.preventDefault();
    // const index = e.target.id;
    setPackaging((packaging) => {
      packaging = e.target.value.toString();
      return packaging;
    });
    //console.log(title);
  };

  let handleSubmit = async (e) => {
    // e.preventDefault();
    if (excelData.length) {
      let createProductRequestData = [];
      for (let i = 0; i < excelData.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (categories[j].title === excelData[i].CATEGORY) {
            setCategory(categories[j].title);
            setCategoryID(categories[j].id);
            break;
          }
        }
        for (let j = 0; j < sub_categories.length; j++) {
          if (sub_categories[j].title === excelData[i].SUB_CATEGORY) {
            setSubCategory(sub_categories[j].title);
            setSubCategoryID(sub_categories[j].id);
            break;
          }
        }
        // setOpen(true);
        // setSkuCode(extractedData => {
        //     extractedData = excelData[i].SKU_CODE;
        //     return extractedData
        // });
        // setName(excelData[i].NAME);
        // setImages(extracted_data => { return excelData[i].IMAGE_URL.split(",") });
        // setManufacturingCompany(extracted_data => { return excelData[i].MANUFACTURERS });
        // setManufacturerCompanyAddress(extracted_data => { return excelData[i].MANUFACTURER_ADDRESS });
        // setSaltComposition(extracted_data => { return excelData[i].SALT_COMPOSITION });
        // setMedicineType(extracted_data => { return excelData[i].MEDICINE_TYPE });
        // setStock(extracted_data => { return excelData[i].STOCK });
        // setIntroduction(extracted_data => { return excelData[i].INTRODUCTION });
        // setIngredients(extracted_data => { return excelData[i].INGREDIENTS });
        // setBenefits(extracted_data => { return excelData[i].BENEFITS });
        // setDescription(extracted_data => { return excelData[i].DESCRIPTION });
        // setHowToUse(extracted_data => { return excelData[i].HOW_TO_USE });
        // setSafetyAdvice(extracted_data => { return excelData[i].SAFETY_ADVICE });
        // setIfMiss(extracted_data => { return excelData[i].IF_MISS });
        // setPackaging(extracted_data => { return excelData[i].PACKAGING });
        // setMRP(extracted_data => { return excelData[i].MRP });
        // setDiscount(extracted_data => { return excelData[i].DISCOUNT === "" ? "0" : excelData[i].DISCOUNT });
        // setGST(extracted_data => { return excelData[i].GST === "" ? "0" : excelData[i].GST });
        // setPrescriptionRequired(extracted_data => { return excelData[i].prescription_required === "NO" ? false : true });
        // setLabel(extracted_data => { return excelData[i].LABEL });
        // setFactBox(extracted_data => { return excelData[i].FACT_BOX });
        // setPrimaryUse(extracted_data => { return excelData[i].PRIMARY_USE });
        // setSaltSynonyms(extracted_data => { return excelData[i].SALT_SYNONYMS });
        // setStorage(extracted_data => { return excelData[i].STORAGE });
        // setUseOf(extracted_data => { return excelData[i].USE_OF });
        // setCommonSideEffect(extracted_data => { return excelData[i].COMMON_SIDE_EFFECT });
        // setAlcoholInteraction(extracted_data => { return excelData[i].ALCOHOL_INTERACTION });
        // setPregnancyInteraction(extracted_data => { return excelData[i].PREGNANCY_INTERATION });
        // setLactatinInteraction(extracted_data => { return excelData[i].LACTATIN_INTERATION });
        // setDrivingInteraction(extracted_data => { return excelData[i].DRIVING_INTERATION });
        // setKidneyInteraction(extracted_data => { return excelData[i].KIDNEY_INTERATION });
        // setLiverInteraction(extracted_data => { return excelData[i].LIVER_INTERATION });
        // setOtherDrugsInteraction(extracted_data => { return excelData[i].OTHER_DRUG_INTERATION });
        // setCountryOfOrigin(extracted_data => { return excelData[i].COUNTRY_OF_ORIGIN });

        //now let's create json to upload data to api
        createProductRequestData.push({
          sku_code: excelData[i].SKU_CODE ?? "" ?? "",
          name: excelData[i].NAME ?? "",
          images: excelData[i].IMAGE_URL.split(",") ?? [],
          category_id: category_id ?? "",
          category: category ?? "",
          sub_category_id: sub_category_id ?? "",
          sub_category: sub_category ?? "",
          schedule: excelData[i].SCHEDULE ?? "",
          manufacturing_company: excelData[i].MANUFACTURERS ?? "",
          manufacturer_address: excelData[i].MANUFACTURER_ADDRESS ?? "",
          salt_composition: excelData[i].SALT_COMPOSITION ?? "",
          medicine_type: excelData[i].MEDICINE_TYPE ?? "",
          stock: excelData[i].STOCK ?? "",
          introduction: excelData[i].INTRODUCTION ?? "",
          ingredients: excelData[i].INGREDIENTS ?? "",
          benefits: excelData[i].BENEFITS ?? "",
          description: excelData[i].DESCRIPTION ?? "",
          how_to_use: excelData[i].HOW_TO_USE ?? "",
          safety_advice: excelData[i].SAFETY_ADVICE ?? "",
          if_miss: excelData[i].IF_MISS ?? "",
          packaging: excelData[i].PACKAGING ?? "",
          mrp: excelData[i].MRP ?? "",
          discount: excelData[i].DISCOUNT ?? "0",
          gst: excelData[i].GST ?? "0",
          // price: (excelData[i].MRP ?? 0) - (excelData[i].DISCOUNT ?? 0),
          prescription_required:
            excelData[i].prescription_required === "NO" ? false : true ?? "",
          label: excelData[i].LABEL ?? "",
          fact_box: excelData[i].FACT_BOX ?? "",
          primary_use: excelData[i].PRIMARY_USE ?? "",
          salt_synonyms: excelData[i].SALT_SYNONYMS ?? "",
          storage: excelData[i].STORAGE ?? "",
          use_of: excelData[i].USE_OF ?? "",
          common_side_effect: excelData[i].COMMON_SIDE_EFFECT ?? "",
          alcohol_interaction: excelData[i].ALCOHOL_INTERACTION ?? "",
          pregnancy_interaction: excelData[i].PREGNANCY_INTERACTION ?? "",
          lactatin_interaction: excelData[i].LACTATIN_INTERACTION ?? "",
          driving_interaction: excelData[i].DRIVING_INTERACTION ?? "",
          kidney_interaction: excelData[i].KIDNEY_INTERACTION ?? "",
          liver_interaction: excelData[i].LIVER_INTERACTION ?? "",
          otherDrugs_interaction: excelData[i].OTHER_DRUGS_INTERACTION ?? "",
          country_of_origin: excelData[i].COUNTRY_OF_ORIGIN ?? "",
        });
        // console.log(createProductRequestData);
      }
      console.log(createProductRequestData);
      // const config = {
      //     method: 'post',
      //     maxBodyLength: Infinity,
      //     url: Constants.BASE_URL + '/product/create',
      //     // url: 'http://localhost:8000/api/product/create',
      //     headers: {
      //         'Authorization': 'Bearer' + token,
      //         'Content-Type': 'application/x-www-form-urlencoded'
      //     },
      //     data: JSON.stringify({ "products": createProductRequestData }),
      //     redirect: 'follow'
      // };
      // let response = await axios(config);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ products: createProductRequestData }),
        redirect: "follow",
      };
      let response = await fetch(
        Constants.BASE_URL + "/product/create",
        requestOptions
      );

      if (response) {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          alert("Product Created Successfully");
          setSkuCode("");
          setName("");
          setImages("".split(","));
          setManufacturingCompany("");
          setManufacturerCompanyAddress("");
          setSaltComposition("");
          setMedicineType("");
          setStock("");
          setIntroduction("");
          setIngredients("");
          setBenefits("");
          setDescription("");
          setHowToUse("");
          setSafetyAdvice("");
          setIfMiss("");
          setPackaging("");
          setMRP("");
          setDiscount("0");
          setGST("0");
          setPrescriptionRequired(false);
          setLabel("");
          setFactBox("");
          setPrimaryUse("");
          setSaltSynonyms("");
          setStorage("");
          setUseOf("");
          setCommonSideEffect("");
          setAlcoholInteraction("");
          setPregnancyInteraction("");
          setLactatinInteraction("");
          setDrivingInteraction("");
          setKidneyInteraction("");
          setLiverInteraction("");
          setOtherDrugsInteraction("");
          setCountryOfOrigin("");
          setOpen(false);
          navigate("/products");
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Something went wrong");
      }
    } else {
      let createProductRequestData = [];
      createProductRequestData.push({
        sku_code: sku_code,
        name: name,
        images: arr.map((item) => item.value),
        category_id: category_id,
        category: category,
        sub_category_id: sub_category_id,
        sub_category: sub_category,
        schedule: schedule,
        manufacturing_company: manufacturing_company,
        manufacturer_address: manufacturer_address,
        salt_composition: salt_composition,
        medicine_type: medicine_type,
        stock: stock,
        introduction: introduction,
        ingredients: ingredients,
        benefits: benefits,
        description: description,
        how_to_use: how_to_use,
        safety_advice: safety_advice,
        if_miss: if_miss,
        packaging: packaging,
        mrp: mrp,
        discount: discount,
        gst: gst,
        price: price,
        prescription_required: prescription_required,
        label: label,
        fact_box: fact_box,
        primary_use: primary_use,
        salt_synonyms: salt_synonyms,
        storage: storage,
        use_of: use_of,
        common_side_effect: common_side_effect,
        alcohol_interaction: alcohol_interaction,
        pregnancy_interaction: pregnancy_interaction,
        lactatin_interaction: lactatin_interaction,
        driving_interaction: driving_interaction,
        kidney_interaction: kidney_interaction,
        liver_interaction: liver_interaction,
        otherDrugs_interaction: other_drugs_interaction,
        country_of_origin: country_of_origin,
      });

      console.log(createProductRequestData);
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer" + token);
      let config = {
        method: "post",
        url: Constants.BASE_URL + "/product/create",
        // url: 'http://localhost:8000/api/product/create',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { products: createProductRequestData },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.status));
          console.log(JSON.stringify(response.data));
          if (response.status === 200) {
            alert("Product Created Successfully");
            setName("");
            setPrescriptionRequired(false);
            setDescription("");
            setManufacturingCompany("");
            setMRP("");
            setDiscount("");
            setPackaging("");
            setHowToUse("");
            navigate("/products");
          } else {
            alert("Something went wrong");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(excelData);
    if (excelData.length !== 0) {
      //   setOpen(true);
    }
  }, [
    excelData,
    sku_code,
    name,
    images,
    category_id,
    category,
    sub_category_id,
    sub_category,
    schedule,
    manufacturing_company,
    manufacturer_address,
    salt_composition,
    medicine_type,
    stock,
    introduction,
    ingredients,
    benefits,
    description,
    how_to_use,
    safety_advice,
    if_miss,
    packaging,
    mrp,
    discount,
    gst,
    price,
    prescription_required,
    label,
    fact_box,
    primary_use,
    salt_synonyms,
    storage,
    use_of,
    common_side_effect,
    alcohol_interaction,
    pregnancy_interaction,
    lactatin_interaction,
    driving_interaction,
    kidney_interaction,
    liver_interaction,
    other_drugs_interaction,
    country_of_origin,
  ]);

  return (
    <>
      <CommonBreadcramb heading={"Create Product"} />
      <Row>
        <Col sm={8}>
          <Card className="p-3 border-0 mb-3 gray_input">
            <p>SKU Code</p>
            <InputWithLabel
              placeholder="Enter Sku code"
              onChange={handleSkuChange}
              value={sku_code}
            />
            <p>Product Title</p>
            <InputWithLabel
              placeholder="Enter product name"
              onChange={handleNameChange}
              value={name}
            />

            <FormGroup>
              <p className="heading">Product Description</p>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                config={{
                  height: "400px",
                  placeholder: "Enter your text here...",
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ event, editor, data });
                  setDescription(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </FormGroup>
          </Card>
          <Card className="p-0 border-0 mb-3 gray_input">
            <CardHeader className="py-3 bg-white" tag={"h5"}>
              Product Gallery
            </CardHeader>
            <CardBody>
              <FormGroup>
                <p className="mb-0">Product Image</p>
                <small className="text-muted d-block   mb-2">
                  Add Product main Image.
                </small>
                <Input id="exampleFile" name="file" type="file" />
              </FormGroup>
              <FormGroup>
                <p className="mb-0">Product Gallery</p>
                <small className="text-muted d-block   mb-3">
                  Add Product Gallery Images.
                </small>
                <div class="dropzone">
                  <label for="characterAvtar" class="dropzone-container mb-2">
                    <div class="file-icon">
                      <svg
                        width="52"
                        height="46"
                        viewBox="0 0 52 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M25.8185 24.3477L35.5774 34.1043L32.3229 37.3588L28.1185 33.1544V45.9999H23.5185V33.1498L19.3141 37.3588L16.0596 34.1043L25.8185 24.3477ZM25.8189 5.17772e-08C33.9935 0.000387196 40.8708 6.126 41.8131 14.2462C47.7194 15.8569 51.6247 21.4659 51.0858 27.5641C50.5469 33.6623 45.7184 38.4995 39.6212 39.0494L39.6189 34.5C39.6262 26.9735 33.602 20.8295 26.0772 20.6885C18.5525 20.5476 12.3025 26.4619 12.028 33.9829L12.0189 34.5V39.0494C5.92131 38.5003 1.09209 33.6635 0.552603 27.5651C0.0131129 21.4667 3.91821 15.8572 9.82465 14.2462C10.766 6.12549 17.6438 -0.000650306 25.8189 5.17772e-08H25.8189Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div class="dropzone-title fw-semibold">
                      Drop files here or click to upload.
                    </div>
                  </label>
                  <input
                    id="characterAvtar"
                    name="characterAvtar"
                    type="file"
                    accept="image/*"
                    class="form-control"
                  />
                </div>
              </FormGroup>
            </CardBody>
          </Card>
          <Card className="p-0 border-0 mb-3 gray_input general_tab">
            <CardHeader className="p-0 bg-white ">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className="active"
                    onClick={function noRefCheck() { }}
                  >
                    General Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="" onClick={function noRefCheck() { }}>
                    Meta Data
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody>
              <InputWithLabel
                heading="Manufacturing Company"
                placeholder="Enter product manufacturer company name"
                onChange={handleManufacturingCompanyChange}
                value={manufacturing_company}
              />
              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Manufacturer Brand"
                    placeholder="Enter manufacturer brand"
                    onChange={handleManufacturingCompanyChange}
                    value={manufacturing_company}
                  />
                </Col>
                <Col md={3}>
                  <InputWithLabel
                    heading="Price"
                    placeholder=""
                    onChange={handlePriceChange}
                    value={price}
                  />
                </Col>
                <Col md={3}>
                  <InputWithLabel
                    heading="Discount"
                    placeholder="Eg: 20.50 or 20.00"
                    onChange={handleDiscountChange}
                    value={discount}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className="p-0 border-0 gray_input mb-3">
            <CardBody>
              <Row>
                <Col md={6}>
                  <p>Salt Composition</p>
                  <InputWithLabel
                    placeholder="Enter Salt Composition"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
                <Col md={6}>
                  <p>Medicine Type</p>
                  <InputWithLabel
                    placeholder="Enter Medicine Type"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <p>Label</p>
                  <InputWithLabel
                    placeholder="Label"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
                <Col md={6}>
                  <p>Introduction</p>
                  <InputWithLabel
                    placeholder="Introduction"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <p>Ingredients</p>
                  <InputWithLabel
                    placeholder="Ingredients"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
                <Col md={6}>
                  <p>Benefits</p>
                  <InputWithLabel
                    placeholder="Benefits"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <p>Safety Advice</p>
                  <InputWithLabel
                    placeholder="Safety Advice"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
                <Col md={6}>
                  <p>If Miss</p>
                  <InputWithLabel
                    placeholder="If Miss"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>
                <Col md={3}>
                  <InputWithLabel
                    heading="Packaging"
                    placeholder="Eg: 1 kg powder"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={3}>
                  <InputWithLabel
                    heading="MRP in INR"
                    placeholder="Eg: 45.10 or 45.00"
                    onChange={handleMrpChange}
                    value={mrp}
                  />
                </Col>{" "}
                <Col md={3}>
                  <p>GST</p>
                  <InputWithLabel
                    placeholder="GST"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />
                </Col>{" "}

                <Col md={3} >
                  <p>Stock</p>
                  <InputWithLabel
                    placeholder="Enter Stock Details"
                    onChange={handleSkuChange}
                    value={sku_code}
                  />

                </Col>
              </Row>
              <FormGroup check inline>
                <Input
                  type="checkbox"
                  name="prescription_required"
                  id="prescription_required"
                  onChange={handlePrescriptionChange}
                  value={prescription_required}
                />
                <Label check htmlFor="prescription_required">
                  Prescription Required
                </Label>
              </FormGroup>

              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Primary Use"
                    placeholder="Primary Use"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={6}>
                  <InputWithLabel
                    heading="Salt Synonyms"
                    placeholder="Salt Synonyms"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Storage"
                    placeholder="Storage"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={6}>
                  <InputWithLabel
                    heading="Use Of"
                    placeholder="Use Of"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Common Side Effect"
                    placeholder="Common Side Effect"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={6}>
                  <InputWithLabel
                    heading="Alcohol Interaction"
                    placeholder="Alcohol Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Pregnancy Interaction"
                    placeholder="Pregnancy Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={6}>
                  <InputWithLabel
                    heading="Lactate Interaction"
                    placeholder="Lactate Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Driving Interaction"
                    placeholder="Driving Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={6}>
                  <InputWithLabel
                    heading="Kidney Interaction"
                    placeholder="Kidney Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Liver Interaction"
                    placeholder="Liver Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={6}>
                  <InputWithLabel
                    heading="Other Drugs Interaction"
                    placeholder="Other Drugs Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <InputWithLabel
                    heading="Manufacturer Interaction"
                    placeholder="Manufacturer Interaction"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
                <Col md={6}>
                  <InputWithLabel
                    heading="QA"
                    placeholder="QA"
                    onChange={handlePackagingChange}
                    value={packaging}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>{" "}
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </Col>
        <Col sm={4}>
          <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              Product Gallery
            </CardHeader>
            <CardBody>
              <InputOption label={"Status"} option={"Published"} />
              <InputOption label={"Visibility"} option={"Public"} />
            </CardBody>
          </Card>{" "}
          <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              Publish Schedule
            </CardHeader>
            <CardBody>
              <DateTimePicker
                label={"Publish Date & Time"}
                placeholder={"Enter publish date"}
              />
            </CardBody>
          </Card>
          <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              Product Parent Category
            </CardHeader>
            <CardBody>
              <CategoryOption
                label={"Select product category"}
                option={"Fashion"}
              />
            </CardBody>
          </Card>
          <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              Product Sub Category
            </CardHeader>
            <CardBody>
              <CategoryOption
                label={"Select Sub category"}
                option={"Fashion"}
              />
            </CardBody>
          </Card>
          <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              Product Sub Sub Categorys
            </CardHeader>
            <CardBody>
              <CategoryOption
                label={"Select Sub Sub category"}
                option={"Fashion"}
              />
            </CardBody>
          </Card>
          <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              Product Tags
            </CardHeader>
            <CardBody>
              <ReactSelect />
            </CardBody>
          </Card>
          <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              Product Short Description
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="exampleDatetime" className="category_bar">
                  Add short description for product
                </Label>
                <Input
                  id="exampleText"
                  name="text"
                  type="textarea"
                  placeholder="Must enter minimum of a 100 characters"
                />
              </FormGroup>
            </CardBody>
          </Card> <Card className="p-0 border-0 gray_input mb-3">
            <CardHeader className="py-3 bg-white" tag={"h6"}>
              How to Use
            </CardHeader>
            <CardBody>
              <FormGroup>

                <CKEditor
                  editor={ClassicEditor}
                  data={how_to_use}
                  config={{
                    placeholder: "Enter your text here...",
                  }}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setHowToUse(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />

              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row >

      {/* <div className="items-spaced-between">
        <p className="title">Create Product</p>
        <input
          type="file"
          name="file"
          className="upload-excel-btn"
          id="inputGroupFile"
          required
          onChange={handleImport}
        />
       
    </div >  */}
      {/* <div className="upload-excel-btn" onClick={handleImport}>
        Upload Excel
      </div> */}
      {/* title and description */}
      {/* <div className="form">
        <div className="title-description">
          <InputWithLabel
            heading="SKU Code"
            placeholder="Enter Sku code"
            onChange={handleSkuChange}
            value={sku_code}
          />
          <InputWithLabel
            heading="Product Title"
            placeholder="Enter product name"
            onChange={handleNameChange}
            value={name}
          />
          <div className="checkbox-with-label">
            <input
              type="checkbox"
              name="prescription_required"
              id="prescription_required"
              onChange={handlePrescriptionChange}
              value={prescription_required}
            />
            <label htmlFor="prescription_required">Prescription Required</label>
          </div>
          <p className="heading">Description</p>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            config={{
              placeholder: "Enter your text here...",
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              setDescription(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          <label htmlFor="category">Category</label>
          <select onChange={handleCategoryChange}>
            {categories.map((item, i) => {
              // console.log(item.id);
              return (
                <option id={i} value={[item.title, item.id]}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
      </div> */}
      {/* images */}
      {/* <div className="form">
        <div className="title-description">
          <p className="heading">Images</p>
          {arr.map((item, i) => {
            return (
              <input
                type="text"
                id={i}
                placeholder={"Enter product image url " + (i + 1)}
                onChange={handleLinkChange}
                value={item.value}
                style={{ color: "black" }}
              />
            );
          })}

          <p className="add-new-url" onClick={addInput}>
            Add
          </p>
        </div>
      </div> */}
      {/* manufacturing and cost */}
      {/* <div className="form">
        <div className="title-description">
          <InputWithLabel
            heading="Manufacturing Company"
            placeholder="Enter product manufacturer company name"
            onChange={handleManufacturingCompanyChange}
            value={manufacturing_company}
          />
          <div className="product-price-related-details">
            <InputWithLabel
              heading="MRP in INR"
              placeholder="Eg: 45.10 or 45.00"
              onChange={handleMrpChange}
              value={mrp}
            />
            <InputWithLabel
              heading="Discount percentage"
              placeholder="Eg: 20.50 or 20.00"
              onChange={handleDiscountChange}
              value={discount}
            />
            <InputWithLabel
              heading="Price"
              placeholder=""
              onChange={handlePriceChange}
              value={price}
            />
          </div>
          <div className="product-price-related-details"></div>
        </div>
      </div>
      <div className="form">
        <div className="title-description">
          <p className="heading">How to Uses</p>
          <CKEditor
            editor={ClassicEditor}
            data={how_to_use}
            config={{
              placeholder: "Enter your text here...",
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              setHowToUse(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
      </div> */}

      {/* </div> */}
      {/* </div> */}
      {/* <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Product details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {headings.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((item, i) => {
                return (
                  // <div className="orders-data-values">
                  <tr key={i}>
                    <td>{item.NAME}</td>
                    <td>{item.PRESCRIPTION_REQUIRED}</td>
                    <td>{item.CATEGORY}</td>
                    <td>{item.MRP}</td>
                    <td>{item.DISCOUNT}</td>
                    <td>{item.MANUFACTURERS}</td>
                    <td>{item.MANUFACTURER_ADDRESS}</td>
                    <td>{item.PACKAGING}</td>
                    <td>{item.HOW_TO_USE}</td>
                    <td>{item.BENEFITS}</td>
                  </tr>
                  //     <div className="divider"></div>
                  // </div>
                );
              })}
            </tbody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(e) => {
              handleSubmit();
              handleClose();
            }}
          >
            SAVE
          </Button>
        </DialogActions>
      </BootstrapDialog> */}
    </>
  );
};
