import axios from 'axios';

const Url = 'http://52.66.136.40:8000/api/v1/category';

const headers = {
    'content-type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlclR5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY5NTEwNjY2NSwiZXhwIjoxNzI2NjQyNjY1fQ.1Wa56vaNrraocN9FbtyfRi3d_k9RBjT2223vm7SIpuM'
}

export const getAllCategories = async () => {
    try{
        let response = await axios.get(Url+"/get-all",{ headers });
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

export const getAllSubCategories = async () => {
    try{
        let response = await axios.get(Url+"/get-all-subcategory",{ headers });
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

export const getAllSubSubCategories = async () => {
    try{
        let response = await axios.get(Url+"/get-all-sub-subcategory",{ headers });
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

export const createCategory = async (payload) => {
    try{
        if(!payload) return false;
        let body = {
            title: payload?.title?.trim(),
            desc: payload?.desc?.trim(),
            img: payload?.imageURL?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/add", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
}

export const createSubCategory = async (payload) => {
    try{
        if(!payload) return false;
        let body = {
            categoryId: payload?.category?.uuid, 
            title: payload?.title?.trim(),
            desc: payload?.desc?.trim(),
            img: payload?.imageURL?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/create-subcategory", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const categoryWiseSubCategory = async(categoryId) => {
    try{
        if(!categoryId) return false;
        let response = await axios.get(Url+`/get-category-wise-subcategory/${categoryId}`,{ headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const createSubSubCategory = async (payload) => {
    try{
        if(!payload) return false;
        let body = {
            categoryId: payload?.category?.uuid, 
            subCategoryId: payload?.subCategory?.uuid,
            title: payload?.title?.trim(),
            desc: payload?.desc?.trim(),
            img: payload?.imageURL?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/create-sub-subcategory", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const getCategoryById = async(categoryId) => {
    try{
        if(!categoryId) return false;
        let response = await axios.get(Url+`/${categoryId}`,{ headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const editCategory = async (payload, categoryId) => {
    try{
        if(!payload) return false;
        let body = {
            categoryId,
            title: payload?.title?.trim(),
            desc: payload?.desc?.trim(),
            img: payload?.imageURL?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/edit", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const getSubCategoryById = async(subCategoryId) => {
    try{
        if(!subCategoryId) return false;
        let response = await axios.get(Url+`/subcategory/${subCategoryId}`,{ headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const editSubCategory = async (payload, subCategoryId) => {
    try{
        if(!payload) return false;
        let body = {
            subCategoryId,
            categoryId: payload?.category?.uuid,
            title: payload?.title?.trim(),
            desc: payload?.desc?.trim(),
            img: payload?.imageURL?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/edit-subcategory", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const getSubSubCategoryById = async(subSubCategoryId) => {
    try{
        if(!subSubCategoryId) return false;
        let response = await axios.get(Url+`/sub-subcategory/${subSubCategoryId}`,{ headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};

export const editSubSubCategory = async (payload, subSubCategoryId) => {
    try{
        if(!payload) return false;
        let body = {
            subSubCategoryId,
            subCategoryId: payload?.subCategory?.uuid,
            categoryId: payload?.category?.uuid,
            title: payload?.title?.trim(),
            desc: payload?.desc?.trim(),
            img: payload?.imageURL?.trim(),
            isActive: payload?.isActive
        }
        let response = await axios.post(Url+"/edit-sub-subcategory", body, { headers });
        if(response && response.status == 200) return response.data;
        return response;
    }catch(error){
        console.log('error', error, error.response);
        // TODO: handle error better in an seprate function.
        return error;
    }
};