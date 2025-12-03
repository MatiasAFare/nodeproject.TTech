import * as productsService from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        res.status(200).json({
            status: 200,
            message: 'Products retrieved successfully',
            data: products
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving products'
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: `Product with ID ${id} not found`
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Product retrieved successfully',
            data: product
        });
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving product'
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { title, price, description, category, image } = req.body;

        // Validate required fields
        if (!title || !price || !category) {
            return res.status(400).json({
                status: 400,
                message: 'Title, price, and category are required'
            });
        }

        const newProduct = await productsService.createProduct({
            title,
            price,
            description,
            category,
            image
        });

        res.status(201).json({
            status: 201,
            message: 'Product created successfully',
            data: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            status: 500,
            message: 'Error creating product'
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category, image } = req.body;

        // Validate that at least one field is provided
        if (!title && !price && !description && !category && !image) {
            return res.status(400).json({
                status: 400,
                message: 'At least one field must be provided to update'
            });
        }

        const updatedProduct = await productsService.updateProduct(id, {
            title,
            price,
            description,
            category,
            image
        });

        if (!updatedProduct) {
            return res.status(404).json({
                status: 404,
                message: `Product with ID ${id} not found`
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            status: 500,
            message: 'Error updating product'
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await productsService.deleteProduct(id);

        if (!result) {
            return res.status(404).json({
                status: 404,
                message: `Product with ID ${id} not found`
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            status: 500,
            message: 'Error deleting product'
        });
    }
};
