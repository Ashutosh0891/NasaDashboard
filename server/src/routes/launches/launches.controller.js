const {getAllLaunches,scheduleNewLaunches,existsLaunchWithId, abortLaunchById}=require('../../models/launches.model');
const {getPagination}=require('../../services/query');

async function httpGetAllLaunches(req,res){
    const query=req.query;   
    const {skip,limit}=getPagination(query);
    const launches=await getAllLaunches(skip,limit)
    return res.status(200).json(launches)     //launches in model is not in form of json 
}

async function httpAddNewLaunches(req,res){
    const launch=req.body
    if(!launch.mission || !launch.rocket ||!launch.launchDate || !launch.target){
        return res.status(400).json({
            error:'Missing required launch property'
        })
    }
    launch.launchDate=new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"Invalid launch date"
        })
    }
    await scheduleNewLaunches(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);
    console.log(launchId)

    const existsLaunch=await existsLaunchWithId(launchId)
    if(!existsLaunch){
        return res.status(400).json({
            error:'launch not found'
        })
    }
    const aborted=await abortLaunchById(launchId);
    if(!aborted){
        return res.status(400).json({
            error:'Launch not aborted'
        })
    }
    res.status(200).json({
        ok:true
    });

    
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
}       