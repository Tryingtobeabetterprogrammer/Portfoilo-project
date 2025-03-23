const mongoose = require('mongoose');
const employee = require('./employee.js'); // Import Employee model

// Fetch all employees with pagination
const index = (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 employees per page
    const skip = (page - 1) * limit;

    employee.find()
        .skip(skip)
        .limit(limit)
        .then(employees => {
            employee.countDocuments()
                .then(total => {
                    res.status(200).json({
                        success: true,
                        total,
                        page,
                        limit,
                        employees
                    });
                })
                .catch(error => {
                    console.error('Error counting employees:', error);
                    res.status(500).json({ message: 'An error occurred while counting employees' });
                });
        })
        .catch(error => {
            console.error('Error fetching employees:', error);
            res.status(500).json({ message: 'An error occurred while fetching employees' });
        });
};

// Fetch a single employee by ID
const show = (req, res, next) => {
    const employeeID = req.body.employeeID;

    console.log('Request body received:', req.body);

    if (!employeeID) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(employeeID)) {
        return res.status(400).json({ message: 'Invalid Employee ID format' });
    }

    employee.findById(employeeID)
        .then(response => {
            if (!response) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json({
                success: true,
                message: 'Employee fetched successfully',
                employee: response
            });
        })
        .catch(error => {
            console.error('Error fetching employee:', error);
            res.status(500).json({ message: 'An error occurred while fetching the employee' });
        });
};

// Add a new employee
const store = (req, res, next) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    if (!req.file) {
        return res.status(400).json({ message: 'Png file is required' });
    }

    const newEmployee = new employee({
        pdf: req.file.path // Save the uploaded file's path
    });

    newEmployee.save()
        .then(response => {
            res.status(201).json({
                success: true,
                message: 'Employee added successfully',
                employee: response
            });
        })
        .catch(error => {
            console.error('Error saving employee:', error);
            res.status(500).json({ message: 'An error occurred while saving the employee' });
        });
};

// Update an existing employee by ID
const update = (req, res, next) => {
    const employeeID = req.body.employeeID;

    if (!employeeID) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    const updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    };

    employee.findByIdAndUpdate(employeeID, { $set: updatedData }, { new: true })
        .then(response => {
            if (!response) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json({
                success: true,
                message: 'Employee updated successfully',
                employee: response
            });
        })
        .catch(error => {
            console.error('Error updating employee:', error);
            res.status(500).json({ message: 'An error occurred while updating the employee' });
        });
};

// Delete an employee by ID
const destroy = (req, res, next) => {
    const employeeID = req.body.employeeID;

    if (!employeeID) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    employee.findByIdAndDelete(employeeID)
        .then(response => {
            if (!response) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json({
                success: true,
                message: 'Employee deleted successfully'
            });
        })
        .catch(error => {
            console.error('Error deleting employee:', error);
            res.status(500).json({ message: 'An error occurred while deleting the employee' });
        });
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
