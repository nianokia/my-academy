import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT payload: ", decoded);

        const userId = decoded.userId;
        // const userId = decoded?.id ?? decoded?.userId ?? decoded?.sub ?? decoded?.user?.id ?? null;

        // if (!userId) return res.status(401).json({ error: "Token missing user identifier" });

        req.user = {
            userId: userId,
            role: decoded.role,
            // role: decoded?.role ?? decoded?.user?.role ?? null,
        };

        console.log("req.user: ", req.user);

        next();
    } catch (err) {
        console.error("Token verification failer: ", err.message);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;