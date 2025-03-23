const express =require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bp=require('body-parser')

mongoose.connect('mongodb://localhost:3000/testdb')
.then(()=>console.log('connected to the MongoDb Atlas successful'))//this will print if we connected 
.catch(err=>console.error('error',err));//if error then pritn error
const db=mongoose.connection;
mongoose.set('debug', true);


const app=express();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port=process.env.port || 3000

app.listen(port,()=>{
    console.log(`the server is of the port ${port}`);
})
