import * as productsModel from '../models/products.model.js';

export const getAllProducts = async () => {
    return await productsModel.getAllProducts();
};

export const getProductById = async (id) => {
    return await productsModel.getProductById(id);
};

export const createProduct = async (productData) => {
    return await productsModel.createProduct(productData);
};

export const updateProduct = async (id, productData) => {
    return await productsModel.updateProduct(id, productData);
};

export const deleteProduct = async (id) => {
    return await productsModel.deleteProduct(id);
};
