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

// exports.toggleHabit = async(req,res)=>{
//     const habit = await Habit.findOne({id:req.params.id});
//     if(!habit)
//     {
//         console.log("There is no Habit");
//     }
//     const date = req.body.date;
//     if(habit.completedDates.includes(date))
//     {
//         habit.completedDates = habit.completedDates.filter(d => d !== date);
//     }
//     else{
//         habit.completedDates.push(date);
//     }

//     await habit.save();
//     res.status(200).json(habit);
// }

const daysDiff = (a,b)=>{
    const da = new Date(a + 'T00:00:00Z');
    const db = new Date(b + 'T00:00:00Z');
    return Math.floor((db - da)/86400000);
}

exports.toggleHabit = async(req,res)=>{
    try{
       const habit = await Habit.findOne({id:req.params.id});
    if(!habit)
    {
        console.log("habit is not found");
    }

    const today = new Date().toISOString.split('T')[0];
    const date = new Date(req.body.date).toISOString.split('T')[0];

    if(date!=today)
    {
        return res.status(400).json("Only today is allowed");
    }

    if(habit.completedDates.length > 0)
    {
        const last = [...habit.completedDates].sort()[habit.completedDates.length - 1];
        if(daysDiff(last,today)>1)
        {
            return res.status(409).json({message:"Streak is already broken"});
        }
    }

    if(habit.completedDates.includes(today))
    {
        habit.completedDates = habit.completedDates.filter(d => d !== today);
    }else{
        habit.completedDates.push(today);
    }

    await habit.save();
    return res.status(200).json(habit);
    }
    catch(err){
  console.error(err); 
  return res.status(500).json({message:'Server Error'})  
}
}

exports.resetHabit = async(req,res)=>{
    try{
       const habit = await Habit.findOne({id:req.params.id});
    if(!habit)
    {
        console.log("habit is not found");
    }
    habit.completedDates = [];
    await habit.save();
    return res.status(200).json(habit);
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({message:'Server Error'});
    }
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
