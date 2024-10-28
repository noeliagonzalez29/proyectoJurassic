const fs = require('fs');
const enclosuresFile = './data/enclosures.json';

const getEnclosures = (req, res) => {
    const enclosures = JSON.parse(fs.readFileSync(enclosuresFile));
    res.status(200).json(enclosures);
};

module.exports = { getEnclosures };
