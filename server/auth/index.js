const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');

const JWT_SECRET = 'bother me tommorrow, today i buy no sorrows 69';

module.exports = {
    authMiddleware({ req }) {
        let token = req.headers.authorization
        console.log('TEST');

        if (!token) return req;

        if (!token.includes('Verify')) {
            throw new ApolloError('INVALID TOKEN');
        }

        token = token.split(' ').pop().trim();

        try {
            const { data } = jwt.decode(token, JWT_SECRET, {
                maxAge: '6h'
            });

            req.user = data;
            return req;
        } catch (err) {
            throw new ApolloError('INVALID TOKEN')
        }
    },

    signToken(user_data) {
        return jwt.sign({ data: user_data }, JWT_SECRET, {
            expiresIn: '6h'
        });
    }
};