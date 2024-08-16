const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://heart:soul@jellypie.urwrx.mongodb.net/")
    .then(() => console.log('MonMONGO_URIgoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Use Routes
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes); 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
