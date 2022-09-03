const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');

const JWT_SECRET = '4cb634f4ed34ebeadcfe019faa721eab7caabd21da73631d1466944641aac01b974124060762ef269a909f9767e41bdbc5f5c877c3a72f1d260be5f28271c18a';

module.exports = {
    authMiddleware({ req }) {
        let token = req.headers.authorization
        // console.log('TEST');

        if (!token) return req;

        if (!token.includes('Verify')) {
            throw new ApolloError('INVALID TOKEN');
        }

        token = token.split(' ').pop().trim();
        // console.log(token)
        try {
            const { data } = jwt.decode(token, JWT_SECRET, {
                maxAge: '6h'
            });
            // console.log(data)
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