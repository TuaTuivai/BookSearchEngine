const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const {signToken} = require("../utils/auth")

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            const foundUser = await User.findOne({
                    _id: context.user._id
            });
        
            if (!foundUser) {
              throw new AuthenticationError("Not logged in!")
            }
        
            // res.json(foundUser);
            return foundUser;
          },
    },
    Mutation: {
        createUser :  async function (parent, args, context) {
            const user = await User.create(args);
        
            if (!user) {
                throw new AuthenticationError("Something is wrong!")
            }
            const token = signToken(user);
            // res.json({ token, user });
            return {
                token, user
            }
          },
        login: async function (parent, args, context) {
            const user = await User.findOne({email: args.email});
            if (!user) {
            // return res.status(400).json({ message: "Can't find this user" });
            throw new AuthenticationError("Something is wrong!")
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if (!correctPw) {
            // return res.status(400).json({ message: 'Wrong password!' });
            throw new AuthenticationError("Something is wrong!")
            }
            const token = signToken(user);
            // res.json({ token, user });
            return {token, user}
        }
    }
}

module.exports = resolvers;