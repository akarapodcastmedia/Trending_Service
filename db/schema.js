const schema = require("mongoose");
const uuid = require("uuid");
// create a model from this schema 
const podcast = new schema.Schema({
    _id : {
        type : String ,
        default : uuid.v1
    },
    podcastCategoryName:{
        type : String,
        required: true
    },
    podcastCategoryId:{
        type : String,
        default : null
    },
    owner : {
        type : String,
        default : "Anonymous"
    }
    ,
    podcastTitle : {
        type : String,
        required : true 
    },
    podcasterId : {
        type : String,
        required: true
    },
    audioName : {
        type : String,
        required : true
    },
    imageName : {
        type : String,
        required : true
    },
    podcastUrl : {
        type : String, 
        defautl : null
    },
    imageUrl: {
        type : String,
        default : null
    },
    podcastDescription : {
        type : String , 
        default : "Akara podcast."
    },
    ban: {
        type :String,
        default : "Disbanned" 
    }
    ,
    viewed: {
        type : Number,
        default : 0
    },
    favourite : {
        type : Boolean,
        default : false
    }
    
},{
    timestamps : true,
    versionKey : false
});

// favourite schema 
const FavoriteSchema = new schema.Schema({
    _id : {
         type : String,
         default : function getUUID(){return uuid.v1()}
     },
    podcastId : {
         type : String,
         required : true
    },categoryId:{
         type : String,
         required: true
    }, 
    userId : {
         type : String,
         required : true
    }
},{
    timestamps : true,
    versionKey: false
});

// Inhour trending schema 
const trending = new schema.Schema({
    _id : {
        type : String,
        default : function getUUID(){return uuid.v1()}
    },
    podcastId : {
        type : String,
        required : true,
    },
    trending :  {
        type : Number,
        required : true
    },
    identify : {
        type : String,
        required : true
    }
},{ 
    timestamps : true,
    versionKey: false
});

// today trending schema 
const trendingToday = new schema.Schema({
    _id : {
        type : String,
        default : function getUUID(){return uuid.v1()}
    },
    podcastId : {
        type : String,
        required : true,
    },
    trending :  {
        type : Number,
        required : true
    },
    identify : {
        type : String,
        required : true
    }
},{ 
    timestamps : true,
    versionKey : false
});

// week trending schema 
const trendingWeek = new schema.Schema({
    _id : {
        type : String,
        default : function getUUID(){return uuid.v1()}
    },
    podcastId : {
        type : String,
        required : true,
    },
    trending :  {
        type : Number,
        required : true
    },
    identify : {
        type : String,
        required : true
    }
},{ 
    timestamps : true,
    versionKey : false
});


// define the model for schemas
const trendingModel = schema.model("trendingModel",trending);
const trendingTodayModel = schema.model("trendingTodayModel",trendingToday);
const trendingWeekModel = schema.model("trendingWeekModel",trendingWeek);
const favoriteModel = schema.model("favoriteModel",FavoriteSchema);
const podcastModel = schema.model("Podcasts",podcast);
module.exports = {
   favoriteModel,
   podcastModel,
   trendingModel,
   trendingTodayModel,
   trendingWeekModel
}