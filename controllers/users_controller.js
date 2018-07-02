const UserModel = require("../models/user.js")
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

class User {

    static signUp(req,res) {
        const dataUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const hash = bcrypt.hashSync(dataUser.password,10)
        dataUser.password = hash
        UserModel.create(dataUser)
        .then(dataUser=>{
            res.status(200).json({message:"user added!!!",dataUser})
        })
        .catch(err=>{
            res.status(400).json({message:err.message})
        })
    }

    static show(req,res) {
        UserModel.find()
        .then(dataUsers=>{
            res.status(200).json(dataUsers)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static showOne(req,res) {
        const decoded = jwt.verify(req.headers.token,"helloworld123")
        UserModel.findOne({_id: decoded.userId})
        .then(dataUser=>{
            res.status(200).json(dataUser)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static signIn(req,res) {
		UserModel.findOne({email:req.body.email})
		.then(dataUser=>{
			if(dataUser !== null) {
				if(req.body.password!== undefined) {
					bcrypt.compare(req.body.password,dataUser.password,function(err,response) {
						if(response) {
							var token = jwt.sign({ userId: dataUser._id }, "helloworld123");
							res.status(200).json({message:"signin succeed",token})
						}else{
							res.status(400).json({message:"incorrect password/username"})	
						}
					})
				}else{
					var token = jwt.sign({ userId: dataUser._id }, "helloworld123")
					res.status(200).json({message:"signin succeed",token})
				}	
			}else{
				if(req.body.password == undefined) {
					var dataInputUser = {
						password: req.body.userId,
						email: req.body.email,
						username: req.body.username	
					}
					var hash = bcrypt.hashSync(req.body.userId, 10);
					dataInputUser.password = hash

					UserModel.create(dataInputUser)
					.then(dataUser=>{
						var token = jwt.sign({ userId: dataUser._id }, "helloworld123")
						res.status(200).json({message:"signin succeed",token})
					})
					.catch(err=>{
						res.status(400).json({message:err.message})
					})	
				}else{
					res.status(400).json({message:"incorrect password/username"})
				}
			}
			
		})
		.catch(err=>{
			console.log("masukk")
			res.status(500).json({message:err.message})
		})
	}
}    

module.exports = User