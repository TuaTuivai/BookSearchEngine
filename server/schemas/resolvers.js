const { AuthenticationError } = require("apollo-server-express");

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
          }
    }
}

module.exports = resolvers;