const express = require('express')
const { update } = require('../models/task')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks/create', auth, async (req,res)=>{
    const task = new Task({
        ...req.body,
        'owner' : req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
}) 


router.get('/tasks', auth, async (req, res)=>{
    try{
        const task = await Task.find({'owner':req.user._id})
        // await req.user.populate('tasks').execPopulate()
        // console.log('sks')
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id, 'owner': req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }
})



router.patch('/tasks/:id', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const _id = req.params.id
    try{
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id,'owner' : req.user._id})
        if (!task){
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async(req,res)=>{
    const _id = req.params.id
    try{
    const user = await Task.findOneAndDelete({_id, 'owner':req.user.id})
    if(!user){
        return res.status(404).send()
    }
    res.send(user)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router