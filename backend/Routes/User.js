const express = require('express');
const User = require('../models/User');
const router = express.Router()
const paillier = require("paillier-bigint");
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser').json();

// 8767897677
router.post('/login',bodyParser,(req,res)=>{
    let {email,password}=req.body
    if(email=="" || password == ""){
        res.json({
            status:"FAILURE",
            message:"input fields are empty"
        })
    }
    else{
        User.find({email}).then(result=>{
            if (result) {
                console.log(result);
                const hashedpass = result[0].password
                bcrypt.compare(password,hashedpass).then(data=>{
                    if (data) {
                        console.log({
                          status: "Successfull",
                          message: "Logged In Successfully!!",
                          data: result,
                        });
                        res.json({
                            status:"Successfull",
                            message:"Logged In Successfully!!",
                            data:result
                        })
                    }
                    else{
                        res.json({
                            status:"FAILURE",
                            message:"Incorrect Password. Enter Again !!"
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                    res.json({
                        status:"FAILED",
                        message:"Error occured while checking user password"
                    })
                })
            }
        }).catch(err=>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"User with this mail does not exist"
            })
        })
    }
})


router.post('/signup',bodyParser, async(req,res)=>{
    // res.send({msg:"signup done"})
    // let {name,email,password} = req.body;
    let {name,email,password} = req.body;
    let { publicKey, privateKey } = await paillier.generateRandomKeys(64);

    // const a = publicKey.encrypt(32)

    publicKey.n = publicKey.n.toString()
    publicKey._n2 = publicKey._n2.toString()
    publicKey.g = publicKey.g.toString()
    const pubJSON = JSON.stringify(publicKey)
    const pubBase64 = btoa(pubJSON)
    // console.log("pub ", pubBase64)
    
    privateKey.lambda = privateKey.lambda.toString()
    privateKey.mu = privateKey.mu.toString()
    privateKey._p = privateKey._p.toString()
    privateKey._q = privateKey._q.toString()
    const pvtJSON = JSON.stringify(privateKey)
    const pvtBase64 = btoa(pvtJSON)
    // console.log("pvt ", pvtBase64)
    // console.log("dec ", privateKey.decrypt(a))

    if(name == "" || email == "" || password == ""){
        res.json({
            status:"FAILURE",
            message:"Input fields are empty"
        })
    }

    else{
        User.find({email}).then((result)=>{
            if(result.length){
                res.json({
                    status:"FAILED",
                    message:"User with this mail already exists!!"
                })
            }
            else{
                const saltRounds = 10;
                bcrypt.hash(password,saltRounds).then(hashedpass=>{
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: hashedpass,
                        publicKey: pubBase64
                    })
                    newUser.save()
                        .then(result => {
                        console.log({
                          status: "Successfull",
                          message: "New User Created",
                          data: result,
                          privateKey: pvtBase64,
                        });
                        res.json({
                            status:"Successfull",
                            message:"New User Created",
                            data:result,
                            privateKey:pvtBase64
                        })
                    })
                }).catch(err=>{
                    console.log(err)
                    res.json({
                        status:"FAILED",
                        message:"error occured while hashing password!!"
                    })
                })
            }
        }).catch(err=>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"error occured while checking of existing user!!"
            })
        })
    }
})

module.exports = router








































 