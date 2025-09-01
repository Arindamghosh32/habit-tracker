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

// Toggle habit (backend)
exports.toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ id: req.params.id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    if (!Array.isArray(habit.completedDates)) habit.completedDates = [];

    const today = new Date().toISOString().split("T")[0];

    if (habit.completedDates.includes(today)) {
      // Already done today, just return the habit
      return res.status(200).json(habit);
    }

    habit.completedDates.push(today);
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
