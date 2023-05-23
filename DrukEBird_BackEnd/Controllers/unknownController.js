const Unknown = require("./../Models/unknownModel");
const AppError = require("./../utils/appError");

exports.getAllUnknownBirds = async (req, res, next) => {
  try {
    const unknownBirds = await Unknown.find();
    res.status(200).json({ data: unknownBirds, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUnknownBird = async(req, res) => {
    try{
        const unknownBird = await Unknown.create(req.body);
        console.log(req.body.name);
        res.json({data: unknownBird, status: "success" })
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

}
exports.getUnknownBird = async (req, res) => {
    try {
      const unknownBird = await Unknown.findById(req.params.id);
      res.json({ data: unknownBird, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateUnknownBird = async (req, res) => {
    try {
      const unknownBird = await Unknown.findByIdAndUpdate(req.params.id, req.body);
      res.json({ data: unknownBird, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.deleteUnknownBird = async (req, res) => {
    try {
      const unknownBird = await Unknown.findByIdAndDelete(req.params.id);
      res.json({ data: unknownBird, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };