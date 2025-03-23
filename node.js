const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors=require('cors')
const router=express.Router()

const employeeRouter = require('./Portfolio/employ.js');

mongoose.connect('mongodb+srv://vijaysharu15:vij_15@cluster0.v8s5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB Atlas successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

mongoose.set('debug', true); // Debug mode

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({ origin: 'http://localhost:3001',
//     methods:['GET','POST'],
//     allowedHeaders:['Content-Type']
//  }));
app.use(cors({ origin: 'http://localhost:<your-client-port>' }));


app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

app.use('/api/employee', employeeRouter); // Use the employee router

app.get('/node', (req, res) => {
    res.send('Node.js is working!');
});

// router.get('/',(req,res)=>{
//     res.json({message:'employee API is working'})
// })

// module.exports=router;
app.use('/api/employee',(req,res,next)=>{
    console.log(`request received from clint:${new Date().toISOString()}`);
    next();
})
// app.get('/',(req,res)=>{
//     res.json({message:'clint page is connected succesfully to server page'})
// })

