// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const registerRoute=require('./routes/registerRoute');
const loginRoute=require('./routes/loginRoute');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/posts', postRoutes);

app.post('/register',registerRoute);
app.post('/login',loginRoute);
// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
