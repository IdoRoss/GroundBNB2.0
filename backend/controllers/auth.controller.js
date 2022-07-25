const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const signup = async (req, res) => {
  console.log('signup')
  const user = new User({
    username: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    apartments:[],
    reservations:[]

  });
  user.save((err, user) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            console.log("err0");
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              console.log("err1");
              res.status(500).send({ message: err });
              return;
            }
            console.log("User was registered successfully!");
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            console.log("err2");
            res.status(500).send({ message: err });
            return;
          }
          console.log("User was registered successfully!");
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};



const signin = async (req, res) => {
  console.log('signin')
  User.findOne({
    username: req.body.name,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      req.session.token = token;
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};
const signout = async (req, res) => {
  console.log('signuout')
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

module.exports = {
  signup,
  signin,
  signout
};