const express = require('express')
const router = express.Router()
const student = require('../models/student')
require('dotenv').config()
const jwt= require('jsonwebtoken')



//middelware authentication

function Authmiddle(req,res,next){
    const authHeader =req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1]
    if (token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user=user
        next()
    })
    

}

//student login
router.post('/login',(req,res)=>{

    const username=req.body.studid
    const user={name: username}
    const accessToken=jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})

})

//get results
router.get('/result',Authmiddle,async(req,res)=>{
    try {
            const students= await student.find({studid: req.user.name})
            res.json(students)
    } catch (error) {
        res.send('Error' +error)

        
    }
})



//Update student details 
router.put('/update',Authmiddle,async(req,res)=>{
    try {

        let update =await student.updateOne({studid:req.user.name},{$set:req.body})
        res.send({status:"updated"})

        
    } catch (error) {
        res.send('Error' +error)
        
    }
})


module.exports=router
