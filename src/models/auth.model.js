import { auth } from '../config/firebase.config.js';

/**
 * Create a new user in Firebase Authentication
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Created user record
 */
export const createUser = async (email, password) => {
    try {
        const userRecord = await auth.createUser({
            email,
            password,
            emailVerified: false
        });
        return userRecord;
    } catch (error) {
        console.error('Error creating user in Firebase Auth:', error);
        throw error;
    }
};

/**
 * Get user by email from Firebase Authentication
 * @param {string} email - User email
 * @returns {Promise<Object|null>} User record or null if not found
 */
export const getUserByEmail = async (email) => {
    try {
        const userRecord = await auth.getUserByEmail(email);
        return userRecord;
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            return null;
        }
        console.error('Error getting user by email:', error);
        throw error;
    }
};

/**
 * Verify Firebase ID token
 * @param {string} idToken - Firebase ID token
 * @returns {Promise<Object>} Decoded token
 */
export const verifyIdToken = async (idToken) => {
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying ID token:', error);
        throw error;
    }
};

/**
 * Delete user from Firebase Authentication
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (uid) => {
    try {
        await auth.deleteUser(uid);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
