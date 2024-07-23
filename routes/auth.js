const router = require("express").Router()
const User = require("../models/User")

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
  res.send("This is the protected profile route.")
})

// Register
router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send("Email already exists")

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

// Login
router.post("/login", async (req, res) => {
  // Check if email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Email or password is wrong")

  // Check password
  const validPass = req.body.password === user.password ? true : false
  if (!validPass) return res.status(400).send("Invalid password")
  else return res.status(200).send("Login success")
})

module.exports = router

