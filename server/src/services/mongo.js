const mongoose=require('mongoose');
const path=require('path')

require('dotenv').config({path:path.resolve(__dirname,'../.env')}) //to get to absolute path of .env file
const MONGO_URL=process.env.MONGO_URL
console.log(MONGO_URL)

mongoose.connection.once('open',()=>{
    console.log('connected to mongo db');
})

mongoose.connection.on('error',(err)=>[
    console.log(err)
])

async function mongoConnect(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,               //parses the mongo url
        useUnifiedTopology:true         //mongoose uses updated way of talking to clusters
    })
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDisconnect
}