const express = require('express');
const {
addHabit,
toggleHabit,
removeHabit,
getHabits,
resetHabit
} = require('./../controller/habitController');

const router = express.Router();

router.post("/",addHabit);
router.patch("/:id",toggleHabit);
router.delete("/:id",removeHabit);
router.get('/get',getHabits);
router.post('/:id/reset',resetHabit);
module.exports = router;