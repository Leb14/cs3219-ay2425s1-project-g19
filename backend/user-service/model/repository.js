const UserModel = require("./user-model.js");
const dotenv = require('dotenv');
dotenv.config();
const { connect } = require("mongoose");

const connectToDB = async () => {
  const mongoDBUri =
    process.env.ENV === "PROD"
      ? process.env.DB_CLOUD_URI
      : process.env.DB_LOCAL_URI;
  await connect(mongoDBUri, {
    serverSelectionTimeoutMS: 5000, // Adjust timeout if needed
  });

};

const createUser = async (username, email, password) => {
  return new UserModel({ username, email, password }).save();
};

const findUserByEmail = async (email) => {
  return UserModel.findOne({ email });
};

const findUserById = async (userId) => {
  return UserModel.findById(userId);
};

const findUserByUsername = async (username) => {
  return UserModel.findOne({ username });
};

const findUserByUsernameOrEmail = async (username, email) => {
  return UserModel.findOne({
    $or: [
      { username }, 
      { email },
    ],
  });
};

const findAllUsers = async () => {
  return UserModel.find();
};

const updateUserById = async (userId, username, email, password) => {
  return UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        username,
        email,
        password,
      },
    },
    { new: true } // return the updated user
  );
};

const updateUserPrivilegeById = async (userId, isAdmin) => {
  return UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        isAdmin,
      },
    },
    { new: true } // return the updated user
  );
};

const deleteUserById = async (userId) => {
  return UserModel.findByIdAndDelete(userId);
};

module.exports = {
  connectToDB,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  findUserByUsernameOrEmail,
  findAllUsers,
  updateUserById,
  updateUserPrivilegeById,
  deleteUserById,
};
