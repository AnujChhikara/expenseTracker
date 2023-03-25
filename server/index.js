const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./UserSchema");
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopApp");
}
mongoose.set("strictQuery", false);
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 4000;

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    // // Hash the password
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      hashpassword: req.body.password,
    });

    // Save the user to the database

    await user.save();

    // Respond with a success message
    res.json({ message: "User created successfully", status: "okay" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user! Email already in use" });
  }
});

app.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    // Compare the provided password with the hashed password in the database

    // If the passwords match, log the user in
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );
      return res.json({ token });
    } else {
      return res.json({ message: "Invalid email or password", user: false });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("beckend");
});

app.post("/hello", async (req, res) => {
  console.log(req.body);
  res.json({ message: "User created successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
