import Http from './Http';
export const getProducts = (config) => { 
    return Http.get('/products', config)
}

export const getCategories = (config) => {
    return Http.get('/categories', config)
}

export const  getCategory = (id, config) => {
    return Http.get(`/categories/${id}`, config)
}

export const  getCategoryProducts = (id, config) => {
    return Http.get(`/categories/${id}/products`, config)
}

export const getProduct = (config, id) => {
    return Http.get(`/products/${id}`, config)
}

export const getProductComments = (config, id) => {
    return Http.get(`/products/${id}/comments`, config)
}

export const createProductComment = (id, data, config) => {
    return Http.post(`products/${id}/comments`,data, config
        )
}

export const order = (data,config) => {
    return Http.post('/order',data,config)
}