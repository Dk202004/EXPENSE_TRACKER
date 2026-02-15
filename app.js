const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const protect = require("./middleware/authmiddleware"); // 👈 add
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);


// 👇 Protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    userId: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("Expense Tracker API running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
