const express = require('express')
const User = require('../model/user')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
// ===============

// router.get('/',(req, res)=>{
//     res.send('testing for router')
// })

// app.use(express.json())

router.post('/users',auth, async (req, res)=>{
	const user = new User(req.body)
	try{
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	}
	catch(e){
		res.status(400).send(e)
	}
})

router.post('/users/login',  async (req, res)=> {
	try{ // for login, we'll find existing user for provided - email & password.
		// it will call to mongoose model for definition of findByCredentials middleware function
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({user, token})
	}
	catch(e){
		res.status(400).send()
	}
})


router.get('/users/', (req, res)=>{
	User.find({}).then((user)=>{
		res.send(user)
	}).catch((e)=>{
		res.send(e)
	})
})

router.get('/users/:id', (req, res) => {
	const _id = req.params.id

	User.findById(_id).then((user)=>{
		res.send(user)
	}).catch((e)=>{
		res.send('ID NOT FOUND'+ e)
	})
})

router.patch('/users/:id', async (req, res) => { 
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:
		true, runValidators: true })
		if (!user) {
		return res.status(404).send()
		}
		// needs little modification, password needs to be bcrypted.
		res.send(user) 
	} 
	catch (e) {
		res.status(400).send(e)
	 }
})


router.delete('/users/:id', async (req, res) => { 
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) {
		return res.status(404).send()
		}
		res.send(user) 
	} 
	catch (e) {
		res.status(500).send() 
	}
})


module.exports = router