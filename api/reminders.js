"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var reminder_1 = require("../models/reminder");
var router = express.Router();
router.post('/', function (req, res, next) {
    if (req.body._id === undefined) {
        var reminder = new reminder_1.default();
        reminder.name = req.body.name;
        reminder.date = req.body.date;
        reminder.time = req.body.time;
        reminder.user_tag = req.body.user_tag;
        reminder.save(function (err, newReminder) {
            console.log(err);
            if (err) {
                return next(err);
            }
            res.json();
        }).catch(function (err) {
            res.status(500);
        });
    }
    else {
        reminder_1.default.findByIdAndUpdate(req.body._id, { $set: { name: req.body.name, date: req.body.date, time: req.body.time } }, function (err, updatedReminder) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("RESULT: " + updatedReminder);
            }
        });
    }
    res.sendStatus(200);
});
router.get('/:id', function (req, res, next) {
    var userId = req.params['id'];
    mongoose.connection.db.collection('reminders').find({ user_tag: userId }).toArray().then(function (reminders) {
        res.json(reminders);
    });
});
router.get('/', function (req, res, next) {
    mongoose.connection.db.collection('reminders').find().toArray().then(function (reminders) {
        res.json(reminders);
    });
});
router.delete('/:id', function (req, res, next) {
    reminder_1.default.findById(req.params['id']).remove(function (err, reminder) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            console.log(reminder);
            res.end();
        }
    });
});
exports.default = router;
