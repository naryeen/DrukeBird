const checklists = require('./../Models/CheckListModel')
const jwt = require('jsonwebtoken')
//const promisify = require('util.promisify')
const { db } = require('./../Models/CheckListModel')

// exports.getAllCheckList = async (req, res) => {
//     try {
//     const birdName = req.query.bird_name || "";
//     const checklists1 = await checklists.find({
//       BirdName: {$regex: `^${birdName}`, $options: "i"}
//     })
//     res.status(200).json({data:checklists1,status: 'success'})

//   } catch (err) {
//     res.status(500).json({ error: err.message});
//   }
// }

exports.getAllCheckList = async (req, res) => {
  try {
    const birdName = req.query.bird_name || "";
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page

    // Calculate the skip value to determine the starting index of the items to retrieve
    const skip = (page - 1) * limit;

    // Query the checklists collection with pagination
    const checklists1 = await checklists
      .find({ BirdName: { $regex: `^${birdName}`, $options: "i" } })
      .skip(skip)
      .limit(limit);

    // Count the total number of items matching the query
    const totalCount = await checklists
      .find({ BirdName: { $regex: `^${birdName}`, $options: "i" } })
      .countDocuments();

    // Calculate the total number of pages based on the total count and limit
    const totalPages = Math.ceil(totalCount / limit);

    // Respond with the paginated checklists
    res.status(200).json({
      data: checklists1,
      status: "success",
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: page,
      },
    });
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: err.message });
  }
};
 
exports.createCheckList = async (req, res) => {
  try{
    const NewCheckList = await checklists.insertMany(req.body)
    res.json({data: NewCheckList, status: "success"});

  }catch (err){
      res.status(500).json({error: err.message});
  }
}

exports.getCheckList = async (req, res) => {
  try{
      const userCheckList = await checklists.findOne(req.params.userId, req.body);
      res.json({data: userCheckList, status: "success"});
  }catch (err){
      res.status(500).json({error: err.message});
  }
}
 
exports.updateCheckList = async (req, res) => {
  try {
    const checklists1 = await checklists.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
 
    res.status(200).json({
      status: 'success',
      data: {
        checklists1,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}
 
exports.deleteCheckList = async (req, res) => {
  try {
    const checklists1 = await checklists.findByIdAndDelete(req.params.id)
 
    res.status(200).json({
      status: 'success',
      data: {
        checklists1,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.deleteAllCheckList = async (req, res) => {
    
    db.collections.checklists.deleteMany({ user: req.params.id }).then(function(){

        res.status(200).json({
            status: 'success',
        })

    }).catch(function(error){
        
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    });
  }

