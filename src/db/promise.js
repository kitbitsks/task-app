require('../db/mongoose')

const Task = require('../models/task')

// Task.findByIdAndDelete('5fdda05570de690240288270').then((resultAfterDel)=>{
//     console.log(resultAfterDel)
//     return Task.countDocuments({task_status : false})
// }).then((countOfDocsAfterDele)=>{
//     console.log(countOfDocsAfterDele)
// }).catch((err)=>{
//     console.log(err)
// })

const deleteTaskAndCount = async(task) =>{
   const del = await task.findByIdAndDelete('5fdda05570de690240288270')
   const count = await task.countDocuments({task_status : false})
   return count
}

deleteTaskAndCount(Task).then((res)=>{
    console.log("count = "+res)
}).catch((e)=>{
    console.log(e)
})