const bcrypt = require('bcryptjs');
const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig);

const getUserById = async (userId) => {
  return db('users').where({ user_id: userId }).first();
};

const updateUserById = async (userId, updatedFields) => {
  return db('users').where({ user_id: userId }).update(updatedFields);
};

const deleteUserById = async (userId) => {
  return db('users').where({ user_id: userId }).del();
};

const getAllUsers = async () => {
  return db('users').select('user_id', 'first_name', 'username', 'email', 'status');
};

const getUserByEmail = async (email) => {
  return db('users').where({ email }).first();
};

const updatePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return db('users').where({ user_id: userId }).update({ password: hashedPassword });
};

module.exports = { getUserById, updateUserById, deleteUserById, getAllUsers, getUserByEmail, updatePassword };
