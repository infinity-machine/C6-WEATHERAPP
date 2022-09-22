const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    authMiddleware({ req }) {
        let token = req.headers.authorization

        if (!token) return req;

        if (!token.includes('Verify')) {
            throw new ApolloError('INVALID TOKEN');
        }
        token = token.split(' ').pop().trim();
        try {
            // ORIGINAL WITH AGE CHECK
            const { data } = jwt.decode(token, process.env.JWT_SECRET, {
                maxAge: '6h'
            });
            // const { data } = jwt.decode(token, process.env.JWT_SECRET);
            req.user = data;
            return req;
        } catch (err) {
            throw new ApolloError('INVALID TOKEN')
        }
    },

    signToken(user_data) {
        // ORIGINAL WITH EXPIRATION 
        return jwt.sign({ data: user_data }, process.env.JWT_SECRET, {
            expiresIn: '6h'
        });
        // return jwt.sign({ data: user_data }, process.env.JWT_SECRET);
    }
};