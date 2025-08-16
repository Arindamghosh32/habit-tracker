const express = require('express');
const app = express();
const {
addHabit,
toggleHabit,
removeHabit,
getHabits
} = require('./../controller/habitController');

const router = express.Router();

router.post("/",addHabit);
router.patch("/:id",toggleHabit);
router.delete("/:id",removeHabit);
router.get('/get',getHabits);
module.exports = router;