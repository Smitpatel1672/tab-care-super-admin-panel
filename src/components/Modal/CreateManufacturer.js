import { Box, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Button, FormHelperText, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import '../../styles/create_and_update_modal.css';
import { toastAlert } from '../../helpers/toastAlert';
import { createManufacturer } from '../../services/manufacturer.service';

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
    name: yup
        .string('Enter your firstName')
        .trim()
        .required('Title is required'),
    address: yup
        .string('Enter your address')
        .trim()
        .min(10, 'Address must be at least 10 characters')
        .required('Address is required'),
    isActive: yup
        .boolean()
        .required('isActive is required'),
});

const CreateManufacturer = ({ open, handleClose }) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
          name: '',
          address: '',
          isActive: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            setLoading(true);
            try {
                const res = await createManufacturer(values);
                if(res && res?.statusCode == 200) {
                    setLoading(false);
                    resetForm();
                    toastAlert(res?.message ? res?.message : "Manufacturer created successfully",'success')
                    handleClose();
                }else {
                    console.log('error adding your Data : ', res.response.data.message);
                    setLoading(false);
                    let message = res && res.response.data.message !== undefined ? res.response.data.message : "Problem while adding manufacturer Record.";
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
                                <span className='modal-header'>Create Manufacturer</span>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    className='text-input-field'
                                    label="Manufacturer Name"
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { padding: '22px 0px 0px 12px' },
                                    }}
                                    InputLabelProps={{ style: style.label }}
                                    value={formik.values?.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    id="address"
                                    name="address"
                                    className='text-input-field'
                                    label="Address"
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true,
                                        style: { padding: '22px 0px 0px 12px' },
                                    }}
                                    InputLabelProps={{ style: style.label }}
                                    multiline
                                    rows={3}
                                    value={formik.values?.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
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

export default CreateManufacturer;