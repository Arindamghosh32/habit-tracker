const Habit = require('./../models/date');

// GET habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    console.error("Get habits error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// ADD habit
exports.addHabit = async (req, res) => {
  try {
    const post = await Habit.create({
      id: req.body.id,
      name: req.body.name,
      frequency: req.body.frequency,
      completedDates: req.body.completedDates || [],
      createdAt: req.body.createdAt
    });
    res.status(201).json(post);
  } catch (err) {
    console.error("Add habit error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// Toggle habit (daily or weekly, rolling logic)
exports.toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ id: req.params.id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    if (!Array.isArray(habit.completedDates)) habit.completedDates = [];

    const now = new Date();
    const lastCompletion = habit.completedDates.length > 0 
      ? new Date(habit.completedDates[habit.completedDates.length - 1])
      : null;

    let nextAvailable = now;
    if (lastCompletion) {
      if (habit.frequency === "daily") {
        nextAvailable = new Date(lastCompletion.getTime() + 24*60*60*1000);
      } else if (habit.frequency === "weekly") {
        nextAvailable = new Date(lastCompletion.getTime() + 7*24*60*60*1000);
      }
    }

    if (now < nextAvailable) {
      return res.status(400).json({ message: "Too early to mark complete" });
    }

    // Toggle today's completion
    const today = now.toISOString().split("T")[0];
    if (habit.completedDates.includes(today)) {
      habit.completedDates = habit.completedDates.filter(d => d !== today);
    } else {
      habit.completedDates.push(today);
    }

    await habit.save();
    return res.status(200).json(habit);

  } catch (error) {
    console.error("Toggle habit error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Reset habit
exports.resetHabit = async (req,res) => {
  try {
    const habit = await Habit.findOne({ id: req.params.id });
    if (!habit) return res.status(404).json({ message:'Habit not found' });

    habit.completedDates = [];
    await habit.save();
    res.status(200).json(habit);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message:'Server Error', error: err.message });
  }
}

// Remove habit
exports.removeHabit = async (req,res) => {
  try {
    const habit = await Habit.findOneAndDelete({ id: req.params.id });
    if (!habit) return res.status(404).json({ message:'Habit not found' });

    res.status(200).json({ message:'Habit removed successfully', habit });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message:'Server Error', error: err.message });
  }
}
