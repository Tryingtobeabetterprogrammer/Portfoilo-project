const express = require('express');
const router = express.Router();

const employeeController = require('../module'); // Employee controller
const upload = require('../upload'); // Multer configuration
const employee = require('../employee');

router.get('/', employeeController.index);
router.post('/show', employeeController.show);
router.post('/store', employeeController.store);
router.post('/update', employeeController.update);
router.post('/delete', employeeController.destroy);

// Dedicated upload route
router.post('/upload', upload.single('png'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: req.file.path
    });
});
router.get('/test',(req,res)=>{
    res.json({message:'clint page is connected succesfully to server page'})
})
router.get('/data',async(req,res)=>{
    try{
        const employee=await employee.find()
        res.status(200).json(employee)
    }
    catch(error){
        res.status(500).json({message:'failure to fetch data',error})
    }
})

module.exports = router;
