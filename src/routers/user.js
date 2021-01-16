const express = require('express')
const { ObjectId } = require('mongodb')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


router.post('/user/signup',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
        res.status(201).send({user, token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me',auth ,async (req, res)=>{
    res.send(req.user)
})

router.patch('/users/me', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth,  async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }
   catch(e){
        res.status(500).send()
    }
})

router.post('/users/login', async(req,res)=>{
    try{
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateToken()
    if(!user){
        return res.status(404).send()
    }
    res.send({user, token})
    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({ 'message' : 'Logged out successfully !'})
    }
    catch(e){
        res.status(500).send()
    }
})

router.post('/users/logout-all', auth, async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send({'message': 'Logged out of All devices !'})
    }
    catch(e){
        res.status(500).send()
    }
})


module.exports = router