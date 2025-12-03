import { verifyTokenService } from '../services/auth.service.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                status: 401,
                message: 'No authorization header provided'
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'No token provided'
            });
        }

        // Verify Firebase ID token (async)
        const verification = await verifyTokenService(token);

        if (!verification.valid) {
            return res.status(403).json({
                status: 403,
                message: 'Invalid or expired token',
                error: verification.error
            });
        }

        // Attach user data to request
        req.user = verification.decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({
            status: 403,
            message: 'Token verification failed'
        });
    }
};
