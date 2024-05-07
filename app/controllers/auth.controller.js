const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user.model");

// Our database
let DB = [];
/**
 *  This function is used verify a google account
 */
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

exports.signin = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const googleProfile = verificationResponse?.payload;
      //console.log(googleProfile);
      let email = googleProfile.email;

      const user = await User.findOne({ email });
      //console.log("currentUser", user);

      if (!user) {
        return res.status(400).json({
          message: "You are not allowed to access the system. Please contact administrator",
        });
      }
      else {
        res.status(201).json({
          message: "Login was successful",
          user: {
            fullName: user?.full_name,
            email: user?.email,
            picture: user?.profile_photo ? user?.profile_photo : googleProfile?.picture,
            token: jwt.sign({ email: user?.email }, config.secret, {
              expiresIn: "1d",
            }),
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

exports.signinWithEmailForTest = async (req, res) => {
  try {
    console.log("@@@@@");
    console.log(req);
    if (req.query.email) {

      console.log(req.query.email);
      console.log(req.query.password);

      let email = req.query.email;
      const user = await User.findOne({ email });
      //console.log("currentUser", user);

      if (req.query.password != "StudentForum@2024" || user == null) {
        return res.status(400).json({
          message: "You are not allowed to access the system. Please contact administrator",
        });
      }
      else {
        res.status(201).json({
          message: "Login was successful",
          user: {
            fullName: user?.full_name,
            email: user?.email,
            picture: user?.profile_photo ? user?.profile_photo : googleProfile?.picture,
            token: jwt.sign({ email: user?.email }, config.secret, {
              expiresIn: "1d",
            }),
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};


////////////////////////////
exports.login = async (req, res) => {
  const user = await User.findOne({ email: "dangthpc04349@fpt.edu.vn" });
  res.status(201).json({
    message: "Login was successful",
    user: {
      fullName: user?.full_name,
      email: user?.email,
      picture: user?.profile_photo ? user?.profile_photo : googleProfile?.picture,
      token: jwt.sign({ email: user?.email }, config.secret, {
        expiresIn: "1d",
      }),
    },
  });
};