const express = require("express");
const router  = express.Router();
const db = require("./db/mongoConfig");
const { trendingModel, trendingTodayModel, trendingWeekModel } = require("./db/schema");
const {trendingInHour}= require('./util/trendingLogic');
const { redisClient } = require("./db/redisconnect");
const { starterQueue } = require("./util/queue");
db();
router.get('/trendinginhour',async(req,res)=>{
        // call the logic trendinginhour
        const trendinginhour = await redisClient.get("trendinginhour");
        try{
            if(trendinginhour){
                return res.json({
                    error : false,
                    message : "request success",
                    data : JSON.parse(trendinginhour)
                })
            }else{
                return res.json({
                    error : false,
                    message : "request success with no data",
                    data : null
                })
            }
        }catch(e){
            return res.json({
                error : e.message
            })
        }
       
})

// trending in today
router.get('/trendingintoday',async (req,res)=>{
     // call the logic trendinginhour
     const trendingintoday = redisClient.get("trendingintoday");
     try{
        if(trendingintoday){
            return res.json({
                error : false,
                message : "request success",
                data : JSON.parse(trendingintoday)
            })
        }else{
            return res.json({
                error : false,
                message : "request success with no data",
                data : null
            })
        }
    }catch(e){
        return res.json({
            error : e.message
        })
    }
});

// trending in week
router.get('/trendinginweek',async(req,res)=>{
         // call the logic trendinginhour
         const trendinginweek = redisClient.get("trendinginweek");
         try{
            if(trendinginweek){
                return res.json({
                    error : false,
                    message : "request success",
                    data : JSON.parse(trendinginweek)
                })
            }else{
                return res.json({
                    error : false,
                    message : "request success with no data",
                    data : null
                })
            }
        }catch(e){
            return res.json({
                error : e.message
            })
        }
});
// start the trendinginhour process queue
router.post('/startprocessfromnow/trendinginhour',(req,res)=>{
    // schedule task to be executed by redis queue every hour
    const timeToexecute = (1000*60*60);
    setInterval(()=>{
      starterQueue(trendingInHour());
    },timeToexecute);
    res.send("Your process trendinginhour is being scheduled to be executed....");
});
// start the trendingintoday process queue 
router.post('/startprocessfromnow/trendingintoday',(req,res)=>{
    // schedule task to be executed by redis queue every hour
    const timeToexecute = (1000*60*60*12);
    setInterval(()=>{
      starterQueue(trendingInHour());
    },timeToexecute);
    res.send("Your process trendingtoday is being scheduled to be executed....");
});
// start the trendinginweek process queue
router.post('/startprocessfromnow/trendinginweek',(req,res)=>{
    // schedule task to be executed by redis queue every hour
    const timeToexecute = (1000*60*60*24*6);
    setInterval(()=>{
      starterQueue(trendingInHour());
    },timeToexecute);
    res.send("Your process of trendingweek is being scheduled to be executed....");
})
// add trending 
let trending ;
router.post('/addtrending',async (req,res)=>{   
    // insert to trending database 
    try{
        const isExistHour = await trendingModel.findOne({identify : req.identiry});
        const isExistToday = await trendingTodayModel.findOne({identify : req.identify});
        const isExistWeek  = await trendingWeekModel.findOne({identify:req.identify});
        // add trending in hour 
        if(isExistHour){
            trending =0;
            trending++;
            const inserter = new trendingModel({
                podcastId : req.body.podcastId,
                trending: trending
            });
           
            // save the data to database
            await inserter.save();
            return res.json({
                error : false,
                message : `${req.body.podcastId} was added.`
            });
        }else{
            return res.json({
                error : true,
                message : "Just trending"
            })
        };
        //=======================================
        // add trending in today
        if(isExistToday){
            trending =0;
            trending++;
            const inserter2 = new trendingTodayModel({
                podcastId : req.body.podcastId,
                trending: trending
            });
            // save the data to database
            await inserter2.save();
            return res.json({
                error : false,
                message : `${req.body.podcastId} was added.`
            });
        }else{
            return res.json({
                error : true,
                message : "Just trending"
            })
        }
        //============================================
         // add trending in week
         if(isExistWeek){
            trending =0;
            trending++;
            const inserter3 = new trendingWeekModel({
                podcastId : req.body.podcastId,
                trending: trending
            })
            // save the data to database
            await inserter3.save();
            return res.json({
                error : false,
                message : `${req.body.podcastId} was added.`
            });
         }else{
             return res.json({
                 error : true,
                 message : "Just trending"
             })
         }
      
    }catch(e){
        return res.json({
            error : true,
            message : e.message
        })
    }
})
module.exports= router;