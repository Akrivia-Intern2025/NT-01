const { getUserById, updateUserById, deleteUserById, getAllUsers, getUserByEmail, updatePassword } = require('./user.queries');
const { sendResetEmail } = require('./user.service');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user_id: user.user_id, username: user.username, email: user.email, profilePic: user.profile_pic, thumbnail: user.thumbnail });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body.password ? { ...req.body, password: await bcrypt.hash(req.body.password, 10) } : req.body;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await updateUserById(id, updatedFields);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await deleteUserById(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
    await sendResetEmail(email, token);
    res.json({ message: 'Password reset link sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    await updatePassword(decoded.user_id, newPassword);
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { getUser, updateUser, deleteUser, forgotPassword, resetPassword };
