const redisClient = require('../config/redis');

const cache = async (req, res, next) => {
    try {
        const key = `book:${req.params.id || 'all'}`;
        const cachedData = await redisClient.get(key);
        
        if (cachedData) {
            console.log('Serving from cache');
            return res.json(JSON.parse(cachedData));
        }
        
        next();
    } catch (error) {
        console.error('Cache Error:', error);
        next();
    }
};
module.exports = cache;