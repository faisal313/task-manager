const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})


// task don't have password field
// taskSchema.pre('save', async function(next){
// 	const task = this

// 	if(user.isModified('password')){
// 		task.password = await bcrypt.hash(task.password, 8)
// 	}

// 	next()
// })

const Task = mongoose.model('Task', taskSchema)


module.exports = Task