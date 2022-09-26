const { User } = require('../models');
const { ApolloError } = require('apollo-server-express');
const { signToken } = require('../auth');

const resolvers = {
    Query: {
        // async getUsers(_, args, context) {
        //     if (!context.user) throw new ApolloError('NOT AUTHORIZED!', 402);

        //     return await User.find();
        // },
        async getUsers(_, args) {
            return await User.find();
        },
        async me(_, args, context) {
            if (context.user) {console.log(context.user)}
            return await User.find({})
        }
    },

    Mutation: {
        async addUser(_, { email, password }, context) {
            try {
                const user = await User.create({ email, password });

                const token = signToken(user);
                return { user, token };
            } catch (err) {
                throw new ApolloError(err);
            }
        },
        async loginUser(_, { email, password }, context) {
            const user = await User.findOne({ email});

            if (!user) throw new ApolloError('NO USER FOUND WITH THAT EMAIL');

            if (!user.validatePass(password)) throw new ApolloError('YOUR PASSWORD IS INCORRECT');

            try {
                const token = signToken(user);

                return { user, token }
            } catch (err) {
                throw new ApolloError(err);
            }
        },
        // HERE WE GO
        async saveLocation(_, { email, password, location }, context) {
            const user = await User.findOne()

            if (!user) throw new ApolloError('NO USER FOUND WITH THAT EMAIL');

            if(!user.validatePass(password)) throw new ApolloError('YOUR PASSWORD IS INCORRECT')

            try {
                user.savedLocs.push(location);
            } catch(err) {
                throw new ApolloError(err);
            }

        }
    }
};

module.exports = resolvers
