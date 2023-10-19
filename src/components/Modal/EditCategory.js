import { Box, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Button, FormHelperText, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import '../../styles/create_and_update_modal.css';
import { toastAlert } from '../../helpers/toastAlert';
import { createCategory, editCategory, getCategoryById } from '../../services/category.service';

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

const EditCategory = ({ open, handleClose, categoryId }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(open) {
            // Fetch category data by categoryId
            getCategoryData(); // Assuming you have a function to fetch category data
        }
    }, [open, categoryId])

    const formik = useFormik({
        initialValues: {
          title: '',
          desc: '',
          imageURL: '',
          isActive: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const res = await editCategory(values,categoryId);
                if(res && res?.statusCode == 200) {
                    setLoading(false);
                    resetForm();
                    toastAlert(res?.message ? res?.message : "Category edited successfully",'success')
                    handleClose();
                }else {
                    console.log('error adding your Data : ', res.response.data.message);
                    setLoading(false);
                    let message = res && res.response.data.message !== undefined ? res.response.data.message : "Problem while updating category Records.";
                    toastAlert(message,'error')
                }
            } catch (error) {
                console.error(error);
                toastAlert("something went wrong!, please try again",'error')
                setLoading(false);
            }
        },
    });

    const getCategoryData = async () => {
        try {
            const categoryData = await getCategoryById(categoryId);
            console.log(categoryData,'categoryData');
            if(categoryData && categoryData?.statusCode == 200) {
                formik.setValues({
                    title: categoryData.data.title,
                    desc: categoryData.data.description,
                    imageURL: categoryData.data.img,
                    isActive: categoryData.data.isActive,
                });
            } else {
                console.log('error fetching category data: ', categoryData, categoryData?.message);
                let message = categoryData && categoryData?.message !== undefined ? categoryData.message : 'Problem fetching category data.';
                toastAlert(message, 'error');
            }
        } catch (error) {
            console.error(error);
            toastAlert('Something went wrong! Please try again', 'error');
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
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <span className='modal-header'>Edit Category</span>
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
                                                    'Edit'
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

export default EditCategory;