const schedule = require('../models/scheduleModel');

const mongoose = require('mongoose');


// Create and Save a new Schedule

exports.create = (req, res) => {
    // Validate request
    if (!req.body.day) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Schedule
    const schedule = new schedule({
        day: req.body.day,
        time: req.body.time,
        user_id: req.body.user_id,
    });

    // Save Schedule in the database
    schedule
        .save(schedule)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Schedule."
            });
        });
}

// Retrieve all Schedules from the database.
exports.findAll = (req, res) => {
    const day = req.query.day;
    var condition = day ? { day: { $regex: new RegExp(day), $options: "i" } } : {};

    schedule.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving schedules."
            });
        });
}

// Find a single Schedule with an id

exports.findOne = (req, res) => {
    const id = req.params.id;

    schedule.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Schedule with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Schedule with id=" + id });
        });
}

// Update a Schedule by the id in the request

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    schedule.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Schedule with id=${id}. Maybe Schedule was not found!`
                });
            } else res.send({ message: "Schedule was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Schedule with id=" + id
            });
        });
}

// Delete a Schedule with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    schedule.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Schedule with id=${id}. Maybe Schedule was not found!`
                });
            } else {
                res.send({
                    message: "Schedule was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Schedule with id=" + id
            });
        });
}

// Delete all Schedules from the database.

exports.deleteAll = (req, res) => {
    schedule.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Schedules were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all schedules."
            });
        });
}

// Find all published Schedules

exports.findAllPublished = (req, res) => {
    schedule.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving schedules."
            });
        });
}

// Path: models/scheduleModel.js

const mongoose = require('mongoose');