const express=require('express');

const planetsRouter=express.Router();

const {httpGetAllPlanets,}=require('./planets.controller')

//planets/
planetsRouter.get('/',httpGetAllPlanets);
module.exports=planetsRouter;
