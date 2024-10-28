const fs = require('fs');
const dinosaursFile = './data/dinosaurs.json';

const getDinosaurs = (req, res) => {
    const dinosaurs = JSON.parse(fs.readFileSync(dinosaursFile));
    res.status(200).json(dinosaurs);
};

module.exports = { getDinosaurs };
