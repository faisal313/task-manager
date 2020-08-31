const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({ 
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		validate(value){
			if(value<0){
				throw new Error('Age must be a positive number.')
			}
		}
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true, // convert email to lowercase
		trim: true, // remove spaces from email
		validate(value){
			if(!validator.isEmail(value)){  // validating email w/ validator
				throw new Error('Email is invalid.')
			}
		}
	},

	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 7,
		validate(value){
			if(value.toLowerCase()==='password'){
				throw new Error('password should not contain password.')
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
})


userSchema.methods.generateAuthToken = async function(){
	const user = this
	const token = jwt.sign({_id: user._id.toString()}, 'thisismysecret')

	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}

// we can call various methods to userSchema
// here we are finding the user by email & password
// userSchema.statics.findByCredentials will be called from login router
userSchema.statics.findByCredentials= async (providedEmail, providedPassword)=>{
	// checking for email using findOne({search criteria})
	const user = await User.findOne({email: providedEmail})
	if(!user){
		throw new Error('Unable to login')
	}

	// comparing password with already saved password
	const isMatch = await bcrypt.compare(providedPassword, user.password)
	if(!isMatch){
		throw new Error('Unable to login')
	}

	// if user found just return it
	return user
}

// middleware by me
userSchema.pre('save', async function(next){
	const user = this
	// console.log('just before saving')
	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

// saving data
const User = mongoose.model('User', userSchema)


module.exports = User
