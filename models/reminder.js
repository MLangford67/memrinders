"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ReminderSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 250
    },
    date: String,
    time: String,
    user_tag: String
});
exports.default = mongoose.model('Reminder', ReminderSchema);
