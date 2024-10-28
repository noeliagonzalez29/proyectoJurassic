const fs = require('fs');
const emergenciesFile = './data/emergencies.json';

const getEmergency = (req, res) => {
    const emergencies = JSON.parse(fs.readFileSync(emergenciesFile));
    const randomEmergency = emergencies[Math.floor(Math.random() * emergencies.length)];
    res.status(200).json(randomEmergency);
};

module.exports = { getEmergency };
