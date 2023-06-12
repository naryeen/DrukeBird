const checklists = require('./../Models/CheckListModel')
const jwt = require('jsonwebtoken')
//const promisify = require('util.promisify')
const { db } = require('./../Models/CheckListModel')

exports.getAllCheckList = async (req, res) => {
    try {
    const birdName = req.query.bird_name || "";
    const checklists1 = await checklists.find({
      BirdName: {$regex: `^${birdName}`, $options: "i"}
    })
    res.status(200).json({data:checklists1,status: 'success'})

  } catch (err) {
    res.status(500).json({ error: err.message});
  }
}
 
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
 
// exports.updateCheckList = async (req, res) => {
//   try {
//     const checklists1 = await checklists.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     })
 
//     res.status(200).json({
//       status: 'success',
//       data: {
//         checklists1,
//       },
//     })
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     })
//   }
// }

exports.updateCheckList = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID of the checklist from the request parameters
    const { status} = req.body; // Get the new status and endpointLocation from the request body

    // Find the checklist by ID and update the status and EndpointLocation in the StartbirdingData array
    const updatedChecklist = await checklists.findByIdAndUpdate(
      id,
      { $set: { "StartbirdingData.$[].status": status} },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        checklist: updatedChecklist,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};


 
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

