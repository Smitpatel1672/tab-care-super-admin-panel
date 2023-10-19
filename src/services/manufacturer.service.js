import axios from 'axios';

const Url = 'http://52.66.136.40:8000/api/v1/manufacturer';

const headers = {
    'content-type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlclR5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY5NTEwNjY2NSwiZXhwIjoxNzI2NjQyNjY1fQ.1Wa56vaNrraocN9FbtyfRi3d_k9RBjT2223vm7SIpuM'
}

export const getAllManufacturers = async () => {
    try{
        let response = await axios.get(Url+"/get-all-manufacturer",{ headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        if(error?.response?.data?.statusCode == 401) {
            // passed props to clearCookie() function
            // logout user and clear all data
        }
        return error;
    }
};

export const createManufacturer = async (payload) => {
    try{
        if(!payload) return false;
        let body = {
            name: payload?.name?.trim(),
            address: payload?.address?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/create-manufacturer", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const editManufacturer = async (payload, manufacturerId) => {
    try{
        if(!payload) return false;
        let body = {
            manufacturerId,
            name: payload?.name?.trim(),
            address: payload?.address?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/edit-manufacturer", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const getManufacturerById = async (manufacturerId) => {
    try{
        let response = await axios.get(Url+`/get-single-manufacturer/${manufacturerId}`,{ headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        if(error?.response?.data?.statusCode == 401) {
            // passed props to clearCookie() function
            // logout user and clear all data
        }
        return error;
    }
};