const { redisClient } = require("../db/redisconnect");
const { trendingModel, podcastModel, trendingWeekModel, trendingTodayModel } = require("../db/schema");
const convertTorange = require('./podcastasrangenum');
// trending in hour
const trendingInHour = async ()=>{
    // find the most podcast trending in hour
    const trending = await trendingModel.aggregate([
        {
            $group : {
                _id : "$podcastId",
                trending : {
                    $sum : "$trending"
                }
            }   
        }
    ]).sort({"trending" : -1}).limit(5);
    // find the podcast in podcast modle 
    const podcast_data = await podcastModel.find({_id : {$in:convertTorange(trending)}});
    // set all the podcast to the cache // 58mins will be remove from cache3
    await redisClient.setEx("trendinginhour",58,JSON.stringify(podcast_data));
    // delete all the podcast in the treding 
    await trendingModel.deleteMany({});
}

// trending in today
const  trendingInToday = async ()=>{
    // find the most podcast trending in hour
    const trending = await trendingTodayModel.aggregate([
        {
            $group : {
                _id : "$podcastId",
                trending : {
                    $sum : "$trending"
                }
            }   
        }
    ]).sort({"trending" : -1}).limit(5);
    // find the podcast in podcast modle 
    const podcast_data = await podcastModel.find({_id : {$in:convertTorange(trending)}});
    // set all the podcast to the cache // 12 hours will be remove from cache3
    redisClient.setEx("trendingintoday",(60*12),JSON.stringify(podcast_data));
    // delete all the podcast in the treding 
    await trendingTodayModel.deleteMany({});
}
// trending weekly
const trendingInWeek = async ()=>{
    // find the most podcast trending in hour
    const trending = await trendingWeekModel.aggregate([
        {
            $group : {
                _id : "$podcastId",
                trending : {
                    $sum : "$trending"
                }
            }   
        }
    ]).sort({"trending" : -1}).limit(5);
    // find the podcast in podcast modle 
    const podcast_data = await podcastModel.find({_id : {$in:convertTorange(trending)}});
    // set all the podcast to the cache // 6 days will be removed from cache3
    redisClient.setEx("trendinginweek",(60*24*6),JSON.stringify(podcast_data));
    // delete all the podcast in the treding 
    await trendingWeekModel.deleteMany({});
}

module.exports = {
    trendingInHour,
    trendingInToday,
    trendingInWeek
}