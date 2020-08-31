require('./db/mongoose.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

userRouter = require('./routers/user.js')
taskRouter = require('./routers/task.js')

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)



// ----------------
app.get('/', (req,res)=>{ // just a Welcome page.
	res.send('<h2>Welcome to our API</h2>')
})

app.listen(port, ()=>{
	console.log(`server is up on port: ${port}`)
})



