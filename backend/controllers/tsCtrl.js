import timeSlotModel from "../model/timeslotModel.js";

// Create a new time slot
const createTimeSlot = async (req, res) => {
  const { name, role, date, time } = req.body;

  try {
    if (!name || !role || !date || !time) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check for overlapping time slots on the same date and time
    const overlappingSlot = await timeSlotModel.findOne({ date, time });
    if (overlappingSlot) {
      return res.status(400).json({
        success: false,
        message: "Time slot already exists for the selected date and time",
      });
    }

    const newTimeSlot = new timeSlotModel({
      name,
      role,
      date,
      time,
    });

    const savedTimeSlot = await newTimeSlot.save();
    res.status(201).json({ success: true, data: savedTimeSlot });
  } catch (error) {
    console.error("Error creating time slot:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update an existing time slot
const updateTimeSlot = async (req, res) => {
  const { id } = req.params;
  const { name, role, date, time } = req.body;

  try {
    if (!name || !role || !date || !time) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the time slot exists
    const existingTimeSlot = await timeSlotModel.findById(id);
    if (!existingTimeSlot) {
      return res
        .status(404)
        .json({ success: false, message: "Time slot not found" });
    }

    const overlappingSlot = await timeSlotModel.findOne({
      date,
      time,
      _id: { $ne: id },
    });
    if (overlappingSlot) {
      return res.status(400).json({
        success: false,
        message: "Time slot already exists for the selected date and time",
      });
    }

    existingTimeSlot.name = name;
    existingTimeSlot.role = role;
    existingTimeSlot.date = date;
    existingTimeSlot.time = time;

    const updatedTimeSlot = await existingTimeSlot.save();
    res.status(200).json({ success: true, data: updatedTimeSlot });
  } catch (error) {
    console.error("Error updating time slot:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a time slot
const deleteTimeSlot = async (req, res) => {
  const { id } = req.params;

  try {
    const existingTimeSlot = await timeSlotModel.findById(id);
    if (!existingTimeSlot) {
      return res
        .status(404)
        .json({ success: false, message: "Time slot not found" });
    }

    await timeSlotModel.deleteOne({ _id: id });

    res
      .status(200)
      .json({ success: true, message: "Time slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting time slot:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all time slots
const getAllTimeSlots = async (req, res) => {
  try {
    const timeSlots = await timeSlotModel.find(); // Fetch all time slots from the database
    res.status(200).json({ success: true, data: timeSlots });
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { createTimeSlot, updateTimeSlot, deleteTimeSlot, getAllTimeSlots };
