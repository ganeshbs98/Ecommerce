const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // Fixed typo here
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://siddu:siddu@cluster0.3q6o0ln.mongodb.net/", {
    useNewUrlParser: true, // Fixed typo here
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.listen(port, "192.168.0.105", () => {
  console.log("Server is running on http://192.168.0.105");
});
const User = require("./models/user");
const Order = require("./models/order");
const { log } = require("console");

//funstion tosend the verification  Email to user

const sendVerificationEmail = async (email, verificationToken) => {
  //create a node mailer transport
  const transporter = nodemailer.createTransport({
    //configure the email service
    service: "gmail",
    auth: {
      user: "siddu0335@gmail.com",
      pass: "kzxvmxfowhcvvxfq",
    },
  });

  //compose email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://192.168.0.105:8000/verify/${verificationToken}`,
  };
  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending Verification email", error);
  }
};
//endpoint to register in the app

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //create a new user

    const newUser = new User({ name, email, password });

    //generate vand store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //send verification email for the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verifiy the email

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    //find the user with the given verification token

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification Token" });
    }
    // mark the usere verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Email Verified" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
});

//login endpoint
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //if thebuser already exists
    const user = await User.findOne({ email });
    //if user doesn't exist
    if (!user) {
      return res.status(401).json({ message: "Invalid email and Password" });
    }
    //if the password is wrong
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    //if the email and  passwrod is right generate token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
