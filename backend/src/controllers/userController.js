const registerUser = (req, res) => {
  const { email, password } = req.body;
  // You can save user in DB here
  res.json({ msg: "User registered" });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  // You can check credentials here
  res.json({ msg: "User logged in" });
};

module.exports = { registerUser, loginUser };