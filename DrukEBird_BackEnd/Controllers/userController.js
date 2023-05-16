const User = require("./../Models/userModels");
const AppError = require("../utils/appError");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/Users");
  },
  filename: (req, file, cb) => {
    // var obj = JSON.parse(req.cookies.token)
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single("photo");

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
    //filtration
    const filterBody = filterObj(
      req.body,
      "name",
      "email",
      "dob",
      "profession",
    );

    if (req.body.photo !== "undefined") {
      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/assets/Users/`;
      filterBody.photo = `${basePath}${fileName}`;
    }
    // const file = req.file;
    // let imagepath;
    // if (file) {
    //   const fileName = req.file.filename;
    //   const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    //   imagepath = `${basePath}${fileName}`;
    // } else {
    //   imagepath = product.image; //image path is same as the old image path initially
    // }

    // var obj = JSON.parse(req.cookies.token)
    const updateUser = await User.findByIdAndUpdate(req.user._id, filterBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { user: updateUser },
    });
  } catch (err) {
    console.log("Here");
    res.status(500).json({ error: err.message });
  }
};
