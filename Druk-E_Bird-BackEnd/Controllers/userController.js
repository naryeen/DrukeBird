const User = require('../Models/userModels')

exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).json({data:user, status: 'success'})
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id, req.body);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({data: user, status: "success"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
}



