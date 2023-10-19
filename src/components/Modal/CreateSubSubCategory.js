import { Box, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Button, FormHelperText, CircularProgress, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import '../../styles/create_and_update_modal.css';
import { toastAlert } from '../../helpers/toastAlert';
import { categoryWiseSubCategory, createSubSubCategory, getAllCategories } from '../../services/category.service';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    label: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '19px',
        letterSpacing: '1.63913e-08px',
        color: '#556480',
    },
};

const validationSchema = yup.object().shape({
    category: yup.object().shape({
        id: yup.number().required('ID is required'),
        uuid: yup.string().uuid('Invalid UUID format').required('UUID is required'),
        title: yup
            .string()
            .trim()
            .required('Title is required'),
        description: yup
            .string()
            .trim()
            .required('Description is required'),
        img: yup.string().required('Image is required'),
        isActive: yup.boolean().required('isActive is required'),
        createdAt: yup.date().required('createdAt is required'),
        updatedAt: yup.date().required('updatedAt is required'),
    }).default(null).required('Must Select any Category'),
    subCategory: yup.object().shape({
        id: yup.number().required('ID is required'),
        categoryId: yup.number().required('ID is required'),
        uuid: yup.string().uuid('Invalid UUID format').required('UUID is required'),
        title: yup
            .string()
            .trim()
            .required('Title is required'),
        description: yup
            .string()
            .trim()
            .required('Description is required'),
        img: yup.string().required('Image is required'),
        isActive: yup.boolean().required('isActive is required'),
        createdAt: yup.date().required('createdAt is required'),
        updatedAt: yup.date().required('updatedAt is required'),
    }).default(null).required('Must Select any Sub Category'),
    title: yup
        .string('Enter your firstName')
        .trim()
        .required('Title is required'),
    desc: yup
        .string('Enter your lastName')
        .trim()
        .required('Description is required'),
    imageURL: yup
        .string('Enter your lastName')
        .trim()
        .required('Image URL is required'),
    isActive: yup
        .boolean()
        .required('isActive is required'),
});

const CreateSubSubCategory = ({ open, handleClose }) => {
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const fetchCategoryData = async () => {
        try {
            let categories = await getAllCategories();
            console.log(categories,'categories');

            if(categories && categories?.statusCode == 200) {
                setCategoryData(categories.data?.categories);
            } else {
                // error
                console.log('error fetching categories : ', categories, categories.message);
                let message = categories && categories?.message !== undefined ? categories.message : "Problem Fetching Records.";
                console.log(message);
            }
        } catch (error) {
            console.log('error catch block', error);
        }
    }

    const fetchCategoryWiseSubCategory = async (categoryId) => {
        try {
            let subCategories = await categoryWiseSubCategory(categoryId);
            console.log(subCategories,'subCategories');

            if(subCategories && subCategories?.statusCode == 200) {
                setSubCategoryData(subCategories.data?.length ? subCategories.data : []);
                if(!subCategories.data?.length) {
                    toastAlert('SubCategory Not Found','error');
                }
            } else {
                // error
                console.log('error fetching subCategories : ', subCategories, subCategories.message);
                setSubCategoryData([]);
                let message = subCategories && subCategories?.response?.data?.message !== undefined ? subCategories?.response?.data?.message : "Problem Fetching Records.";
                toastAlert(message,'error');
                console.log(message);
            }
        } catch (error) {
            console.log('error catch block', error);
            toastAlert('something went wrong','error');
        }
    }

    const formik = useFormik({
        initialValues: {
            category: null,
            subCategory: null,
            title: '',
            desc: '',
            imageURL: '',
            isActive: true
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            setLoading(true);
            try {
                const res = await createSubSubCategory(values);
                if(res && res?.statusCode == 200) {
                    setLoading(false);
                    resetForm();
                    toastAlert(res?.message ? res?.message : "Sub Sub Category created successfully",'success')
                    handleClose();
                }else {
                    console.log('error adding your Data : ', res.response.data.message);
                    setLoading(false);
                    let message = res && res.response.data.message !== undefined ? res.response.data.message : "Problem while adding sub sub category Records.";
                    toastAlert(message,'error')
                }
            } catch (error) {
                console.error(error);
                toastAlert("something went wrong!, please try again",'error')
                setLoading(false);
            }
        },
    });

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Box sx={style}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <span className='modal-header'>Create Sub Sub Category</span>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Autocomplete
                                    id="category"
                                    className='autocomplete-field'
                                    name='category'
                                    value={formik.values.category || null}
                                    options={categoryData}
                                    autoHighlight
                                    onChange={(_, value) => {
                                        formik.setFieldValue('category', value || null);
                                        formik.setFieldValue('subCategory', null);
                                        fetchCategoryWiseSubCategory(value.uuid)
                                    }}
                                    getOptionLabel={(option) => option?.title ? option?.title : ""}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            {option.title}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose a Category"
                                            variant="filled"
                                            value={formik.values.category?.title || ""}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                            InputLabelProps={{ style: style.label }}
                                            error={formik.touched.category && Boolean(formik.errors?.category)}
                                            helperText={formik.touched.category && formik.errors?.category}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Autocomplete
                                    id="subCategory"
                                    className='autocomplete-field'
                                    name='subCategory'
                                    value={formik.values.subCategory || null}
                                    options={subCategoryData}
                                    disabled={subCategoryData.length === 0}
                                    autoHighlight
                                    onChange={(_, value) => {
                                        formik.setFieldValue('subCategory', value || null)
                                    }}
                                    getOptionLabel={(option) => option?.title ? option?.title : ""}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            {option.title}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose a Sub Category"
                                            variant="filled"
                                            value={formik.values.subCategory?.title || ""}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                            InputLabelProps={{ style: style.label }}
                                            error={formik.touched.subCategory && Boolean(formik.errors?.subCategory)}
                                            helperText={formik.touched.subCategory && formik.errors?.subCategory}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    id="title"
                                    name="title"
                                    className='text-input-field'
                                    label="Title"
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { padding: '22px 0px 0px 12px' },
                                    }}
                                    InputLabelProps={{ style: style.label }}
                                    value={formik.values?.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    id="desc"
                                    name="desc"
                                    className='text-input-field'
                                    label="Description"
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { padding: '22px 0px 0px 12px' },
                                    }}
                                    InputLabelProps={{ style: style.label }}
                                    multiline
                                    rows={3}
                                    value={formik.values?.desc}
                                    onChange={formik.handleChange}
                                    error={formik.touched.desc && Boolean(formik.errors.desc)}
                                    helperText={formik.touched.desc && formik.errors.desc}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    id="imageURL"
                                    name="imageURL"
                                    className='text-input-field'
                                    label="Image url"
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { padding: '22px 0px 0px 12px' },
                                    }}
                                    InputLabelProps={{ style: style.label }}
                                    value={formik.values?.imageURL}
                                    onChange={formik.handleChange}
                                    error={formik.touched.imageURL && Boolean(formik.errors.imageURL)}
                                    helperText={formik.touched.imageURL && formik.errors.imageURL}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className='radio-btn-main'>
                                        <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <FormLabel
                                                id="demo-row-radio-buttons-group-label"
                                                className='radio-group-label'
                                            >
                                                Status
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                className='radio-group-main'
                                                value={formik.values?.isActive}
                                                onChange={(event) => {
                                                    formik.setFieldValue('isActive', event.target.value === 'true');
                                                }}
                                                error={formik.touched.isActive && Boolean(formik.errors.isActive)}
                                            >
                                                <FormControlLabel
                                                    value={true}
                                                    control={<Radio className='is-active-radio-button'/>}
                                                    label={
                                                        <div className='live-label-style'>
                                                            <span>Live</span>
                                                        </div>
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={false}
                                                    control={<Radio className='is-active-radio-button'/>}
                                                    label={
                                                        <div className='draft-label-style'>
                                                            <span>Draft</span>
                                                        </div>
                                                    }
                                                />
                                            </RadioGroup>
                                            {formik.touched.isActive && formik.errors.isActive && (
                                                <FormHelperText error>{formik.errors.isActive}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className='create-btn-grid'>
                                        <Button
                                            className='create-btn'
                                            onClick={formik.handleSubmit}
                                        >
                                            {
                                                loading ?
                                                    <CircularProgress style={{ color: "white" }} size={20}/>
                                                :
                                                    'Create'
                                            }
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default CreateSubSubCategory;