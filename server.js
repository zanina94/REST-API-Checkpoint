const express = require ('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express()
app.use(express.json())
const url = 'mongodb://127.0.0.1:27017/restapi'
mongoose.connect(url, { useNewUrlParser: true },(err)=>{
    err ? console.error(err) : console.log('database is connected')
})

const port = process.env.PORT || 5000;

//Get All Users
app.get('/getUsers', (req, res) => {
    User.find((err,data)=>{
      err ? console.error(err) : res.status(200).json({
        status: 'Success',
        data : data
      })
    })
})

//Create New User
app.post('/createUser', (req, res) => {
    let user = new User(req.body)
        
    User.create(user,(err,data)=>{
      err ? console.error(err) : res.status(200).json({
        status: 'Success',
        data : user
      })
    })
})

//Delete User
app.delete('/deleteUser/:id',(req,res)=>{
    User.findByIdAndDelete({_id:req.params.id}, (err,msg)=>{
        err ? console.error(err) : res.status(200).json({
            status: 'Success',
            msg : 'user was deleted'
          }) 
    })
})

//Update User 
app.put('/updateUser/:id',(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},req.body,(err,msg)=>{
        err ? console.error(err) : res.status(200).json({
            status: 'Success',
            data : req.body,
            msg : `user ${req.params.id} was updated`
          }) 
    })
    })


app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server is running at ${port}`)
})