import * as authService from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Email and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                status: 400,
                message: 'Password must be at least 6 characters long'
            });
        }

        const result = await authService.registerUser(email, password);

        if (!result.success) {
            return res.status(400).json({
                status: 400,
                message: result.message
            });
        }

        res.status(201).json({
            status: 201,
            message: 'User registered successfully',
            customToken: result.customToken,
            user: result.user
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error during registration'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Email and password are required'
            });
        }

        const result = await authService.authenticate(email, password);

        if (!result.success) {
            return res.status(401).json({
                status: 401,
                message: result.message
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Login successful',
            customToken: result.customToken,
            user: result.user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error during login'
        });
    }
};

