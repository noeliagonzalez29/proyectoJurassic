const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const usersFile = './data/users.json';
const parksFile = './data/parks.json';

const SECRET_KEY = 'mysecretkey';

const register = (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFile));

    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: uuidv4(), email, password: hashedPassword };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users));

    //Create a park for him
    const parks = JSON.parse(fs.readFileSync(parksFile));
    const park = { userId: newUser.id, dinosaurIds: [], recintosIds: [], coins: 0 };
    parks.push(park);
    fs.writeFileSync(parksFile, JSON.stringify(parks));

    res.status(201).json({ message: 'Usuario registrado' });
};

const login = (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find(u => u.email === email);
    console.log(user, bcrypt.compareSync(password, user.password));
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
};

module.exports = { register, login };
