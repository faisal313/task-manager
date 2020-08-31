const express = require('express')

const Task = require('../model/task.js')
router = express.Router()

// =============================
// API for tasks
// =============================


router.post('/tasks', (req,res)=> {
	const task = new Task(req.body)

	task.save().then(() => {
		res.send(task)
	}).catch((e)=> {
		res.status(400).send(e)
	})
})

router.get('/tasks/', (req, res)=>{
	Task.find({}).then((task)=>{
		res.send(task)
	}).catch((e)=>{
		res.send(e)
	})
})

router.get('/tasks/:id', (req, res) => {
	const _id = req.params.id

	Task.findById(_id).then((task)=>{
		res.send(task)
	}).catch((e)=>{
		res.send('ID NOT FOUND'+ e)
	})
})


router.patch('/tasks/:id', async (req, res) => { 
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new:
		true, runValidators: true })
		if (!task) {
		return res.status(404).send()
		}
		res.send(task)
	 } 
	catch (e) {
		res.status(400).send(e) 
	}
})


router.delete('/tasks/:id', async (req, res) => { 
	try {
		const task = await Task.findByIdAndDelete(req.params.id)
		if (!task) {
		return res.status(404).send()
		}
		res.send(task) 
	} 
	catch (e) {
		res.status(500).send()
	 }
})
module.exports  = router