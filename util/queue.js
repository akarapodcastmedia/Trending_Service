
const Queue = require('bull');
const tasker = async (task) => {
    const mailQueue = new Queue('mailQueue','redis://cache.akarahub.tech:6379');
    await mailQueue.add(task);
    // process the queue
    await mailQueue.process(async(job,done)=>{
        console.log(job.data);
        console.log("task of trending is done");
        done();
   });
  
}
// create the interface function for calling this queue process
const  starterQueue =  async (task) => {
    tasker(task).then(res => console.log(res)).catch(e=> console.log(e));
}
// module.export 
module.exports={
    starterQueue
}