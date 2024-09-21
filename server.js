const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Model for form data
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  customFields: [{ label: String, value: String }],
});

const Form = mongoose.model('Form', formSchema);

// Routes
app.post('/api/forms', async (req, res) => {
  try {
    const { name, email, customFields } = req.body;

    const newForm = new Form({ name, email, customFields });
    await newForm.save();

    res.json(newForm);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));