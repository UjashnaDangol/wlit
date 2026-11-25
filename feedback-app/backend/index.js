const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let feedbacks = [
  {
    id: 1,
    name: "Workshop Team",
    message: "Backend is connected! Now wire up the POST route."
  }
];

let nextId = 2;

app.get("/api/feedback", (req, res) => {
  res.status(200).json(feedbacks);
});

app.post("/api/feedback", (req, res) => {
  const { name, message } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "Name is required"
    });
  }

  if (!message || message.trim().length < 5) {
    return res.status(400).json({
      error: "Message must be at least 5 characters"
    });
  }

  const newFeedback = {
    id: nextId++,
    name,
    message
  };

  feedbacks.unshift(newFeedback);

  res.status(201).json(newFeedback);
});

app.delete("/api/feedback/:id", (req, res) => {
  const id = Number(req.params.id);

  const feedbackIndex = feedbacks.findIndex(
    (feedback) => feedback.id === id
  );

  if (feedbackIndex === -1) {
    return res.status(404).json({
      error: "Feedback not found"
    });
  }

  const deletedFeedback = feedbacks.splice(feedbackIndex, 1);

  res.status(200).json({
    message: "Feedback deleted successfully",
    feedback: deletedFeedback[0]
  });
});

app.listen(PORT, () => {
  console.log(`Feedback API running at http://localhost:${PORT}`);
});