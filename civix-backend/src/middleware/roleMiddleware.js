const isCitizen = (req, res, next) => {
    if (req.user && req.user.role === 'citizen') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Citizen role required.' });
    }
};

const isOfficial = (req, res, next) => {
    if (req.user && req.user.role === 'official') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Official role required.' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
};

module.exports = { isCitizen, isOfficial, isAdmin };
