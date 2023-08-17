let range=[];
module.exports = convertTorange =(podcastList)=>{
    range=[];
    const podcasts = podcastList;
    // loop through the podcast object
    for(let podcast of podcasts){
        range.push(podcast._id);
    }
    // return the list of podcast id 
    return range ;
}