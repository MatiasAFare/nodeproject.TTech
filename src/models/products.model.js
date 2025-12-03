import { admin } from '../config/firebase.config.js';

const db = admin.firestore();
const PRODUCTS_COLLECTION = 'products';

export const getAllProducts = async () => {
    try {
        const productsRef = db.collection(PRODUCTS_COLLECTION);
        const querySnapshot = await productsRef.get();

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return products;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw new Error('Failed to fetch products from database');
    }
};

export const getProductById = async (id) => {
    try {
        const productRef = db.collection(PRODUCTS_COLLECTION).doc(id);
        const docSnapshot = await productRef.get();

        if (!docSnapshot.exists) {
            return null;
        }

        return {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product from database');
    }
};

export const createProduct = async (productData) => {
    try {
        const productsRef = db.collection(PRODUCTS_COLLECTION);

        const newProduct = {
            title: productData.title,
            price: parseFloat(productData.price),
            description: productData.description || '',
            category: productData.category,
            image: productData.image || '',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await productsRef.add(newProduct);

        return {
            id: docRef.id,
            ...newProduct
        };
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product in database');
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const productRef = db.collection(PRODUCTS_COLLECTION).doc(id);
        const docSnapshot = await productRef.get();

        if (!docSnapshot.exists) {
            return null;
        }

        const updatedProduct = {
            ...(productData.title && { title: productData.title }),
            ...(productData.price && { price: parseFloat(productData.price) }),
            ...(productData.description !== undefined && { description: productData.description }),
            ...(productData.category && { category: productData.category }),
            ...(productData.image !== undefined && { image: productData.image }),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await productRef.update(updatedProduct);

        return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
            ...updatedProduct
        };
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product in database');
    }
};

export const deleteProduct = async (id) => {
    try {
        const productRef = db.collection(PRODUCTS_COLLECTION).doc(id);
        const docSnapshot = await productRef.get();

        if (!docSnapshot.exists) {
            return false;
        }

        await productRef.delete();
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product from database');
    }
};

