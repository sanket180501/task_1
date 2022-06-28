const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()
const admin = require("../models/admin")
const student = require("../models/student")

function Authmiddle(req,res,next){
    try{
        const token = req.headers["Authorization"].split()[1]
        const user = jwt.verify(token,process.env.jwtsecret)
        res.locals.user = user.username
        next()
    }catch{
        res.json({error:"Authentication failed"})
    }
}

//login admin
router.post('/login',(req,res)=>{
    const {username,password} = req.body
    console.log(bcrypt.hashSync(password,10))
    if(!username || !password){
        return res.json({error:"Both required"})
    }
    admin.findOne({username}).then((user)=>{
        // console.log(user)
        if(bcrypt.compareSync(password,user.password))
            {
                const jwto = jwt.sign({username},process.env.jwtsecret)
                return res.json({jwto})
            }
            return res.send("password mismatch")

    }).catch(err=>{
        console.log(err)
        res.send("Error")
    })
})
//add student
router.post("/AddStudent",Authmiddle,async(req,res)=>{
    const students =new student({
     
        studid: req.body.studid,
        username: req.body.username,
        mobile: req.body.mobile,
        course: req.body.course,
        result: req.body.result

    })

    try{
        const a1 = await students.save()
        res.json(a1)

    }catch(err){
        res.send('Error' +err)

    }
})

//update student
router.put('/update',Authmiddle,async(req,res)=>{
    try {

        let update =await student.updateOne({studid:req.body.studid},{$set:req.body})
        res.send(update)

        
    } catch (err) {
        res.send('Error' +err)    
    }
})

//delete record

router.delete('/delete/:stuid',Authmiddle,async(req,res)=>{
    try{
        let delete_r = await student.deleteOne({studid:req.params.studid})
        res.send(delete_r)
    } catch(err){
        res.send(err)
    }
})


module.exports = router