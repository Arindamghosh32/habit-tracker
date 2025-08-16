const Habit = require('./../models/date');


exports.getHabits = async(req,res)=>{
    const habits = await Habit.find();
    res.json(habits);
}//we have created fetch function in order to fetch the recent result

exports.addHabit = async(req,res) =>{
    const post = await Habit.create({
        id: req.body.id,
        name: req.body.name,
        frequency: req.body.frequency,
        completedDates: req.body.completedDates,
        createdAt:req.body.createdAt
    });
    res.status(201).json(post);
}

exports.toggleHabit = async(req,res)=>{
    const habit = await Habit.findOne({id:req.params.id});
    if(!habit)
    {
        console.log("There is no Habit");
    }
    const date = req.body.date;
    if(habit.completedDates.includes(date))
    {
        habit.completedDates = habit.completedDates.filter(d => d !== date);
    }
    else{
        habit.completedDates.push(date);
    }

    await habit.save();
    res.status(200).json(habit);
}

exports.removeHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({id:req.params.id});

        if (!habit) {
            console.log("There is nothing to remove");
            return res.status(404).json({ message: "Habit not found" });
        }

        res.status(200).json({ message: "Habit removed successfully", habit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
