const User = require("./../Models/userModels");
const AppError = require("../utils/appError");


exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(req.body.name);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError("Not for password updates", 400));
    }
    console.log(req.body);
    // //filtration
    const filterBody = filterObj(
      req.body,
      "name",
      "dob",
      "profession",
      "photo"
    );
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
    },{new:true});
    
    res.status(200).json({
      status: "success",
      data: { user: updateUser },
    });
  } catch (err) {
    console.log("Here");
    res.status(500).json({ error: err.message });
  }
};



