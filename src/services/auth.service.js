import * as authModel from '../models/auth.model.js';
import { auth as adminAuth } from '../config/firebase.config.js';

/**
 * Register a new user in Firebase Authentication
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Registration result
 */
export const registerUser = async (email, password) => {
    try {
        // Check if user already exists
        const existingUser = await authModel.getUserByEmail(email);
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists with this email'
            };
        }

        // Create user in Firebase Auth
        const userRecord = await authModel.createUser(email, password);

        // Generate custom token for immediate login
        const customToken = await adminAuth.createCustomToken(userRecord.uid);

        return {
            success: true,
            message: 'User registered successfully',
            customToken,
            user: {
                uid: userRecord.uid,
                email: userRecord.email
            }
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: error.message || 'Registration failed'
        };
    }
};

/**
 * Authenticate user with Firebase (Note: actual login happens on client-side)
 * This endpoint is mainly for documentation/testing purposes
 * In production, clients should use Firebase Client SDK to login and get ID tokens
 */
export const authenticate = async (email, password) => {
    try {
        // Check if user exists
        const userRecord = await authModel.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }

        // Generate custom token (client will exchange this for ID token)
        const customToken = await adminAuth.createCustomToken(userRecord.uid);

        return {
            success: true,
            message: 'Authentication successful',
            customToken,
            user: {
                uid: userRecord.uid,
                email: userRecord.email
            }
        };
    } catch (error) {
        console.error('Authentication error:', error);
        return {
            success: false,
            message: 'Authentication failed'
        };
    }
};

/**
 * Verify Firebase ID token
 * @param {string} idToken - Firebase ID token
 * @returns {Promise<Object>} Verification result
 */
export const verifyTokenService = async (idToken) => {
    try {
        const decodedToken = await authModel.verifyIdToken(idToken);
        return {
            valid: true,
            decoded: decodedToken
        };
    } catch (error) {
        return {
            valid: false,
            error: error.message
        };
    }
};
