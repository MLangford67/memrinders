import * as express from 'express';
import * as mongoose from 'mongoose';
import Reminder from '../models/reminder';

let router = express.Router();

router.post('/', (req, res, next)=>{

if(req.body._id === undefined){

  let reminder:any = new Reminder();
  reminder.name = req.body.name;
  reminder.date = req.body.date;
  reminder.time = req.body.time;
  reminder.user_tag = req.body.user_tag;
  reminder.save(function(err, newReminder){
    console.log(err)
    if(err){
      return next(err)
    }
    res.json()
  }).catch((err)=>{
    res.status(500);
  })
}else{
  Reminder.findByIdAndUpdate(req.body._id, { $set: { name: req.body.name, date: req.body.date, time: req.body.time}}, function (err, updatedReminder) {
    if (err) {
      console.log(err);
    } else {
      console.log(`RESULT: ${updatedReminder}`);
    }
  });
}
res.sendStatus(200);
})

router.get('/:id', (req, res, next)=>{
  let userId = req.params['id'];
  mongoose.connection.db.collection('reminders').find({user_tag: userId}).toArray().then((reminders)=>{
    res.json(reminders);
  })

})
router.get('/', (req, res, next)=>{

  mongoose.connection.db.collection('reminders').find().toArray().then((reminders)=>{
    res.json(reminders);
  })

})

router.delete('/:id', (req, res, next) => {

  Reminder.findById(req.params['id']).remove(function (err, reminder) {

    if (err) {

      console.log(err)

      res.end();

    } else {

      console.log(reminder)

      res.end();

    }

  });

})


export default router;
