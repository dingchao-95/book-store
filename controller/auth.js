const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  let errMessage = req.flash("Error");
  if (errMessage.length > 0) {
    errMessage = errMessage[0];
  } else {
    errMessage = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "login",
    errorMessage: errMessage
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("Error", "Invalid Email or Password");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let errMessage = req.flash("Error");
  if (errMessage.length > 0) {
    errMessage = errMessage[0];
  } else {
    errMessage = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "SIgnup page",
    errorMessage: errMessage
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash(
          "Error",
          "Email already exists, please enter another Email Address"
        );
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
        });
    })
    .catch(err => {
      console.log(err);
    });
};
