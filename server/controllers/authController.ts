const { User } = require("../models/index");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201);
    res.send({
      error: null,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500);
    res.send({ data: null, error: error });
  }
};
