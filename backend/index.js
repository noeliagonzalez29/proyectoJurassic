const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const parkRoutes = require('./routes/park');
const dinosaurRoutes = require('./routes/dinosaurs');
const emergencyRoutes = require('./routes/emergencies');
const enclosureRoutes = require('./routes/enclosures');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.use('/auth', authRoutes);
app.use('/park', parkRoutes);
app.use('/dinosaurs', dinosaurRoutes);
app.use('/emergencies', emergencyRoutes);
app.use('/enclosures', enclosureRoutes);

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
