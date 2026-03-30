const userModel = require("../models/User");
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = await userModel.findById(req.params.id);
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userId);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const createUser = async (req, res) => {
    const newUser = new userModel(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = new userModel({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: hashedPassword,
            role: req.body.role
        });
        await data.save()
            .then((result) => {
                var token = jwt.sign({
                    userdata: {
                        _id: result._id,
                        name: result.name,
                        email: result.email,
                        role: result.role
                    }
                }, process.env.JWT_SECRET, { expiresIn: '1h' })

                res.send({
                    status: true,
                    message: 'successfully registered',
                    token: token
                });
            })
    } catch (error) {
        res.send({
            status: false,
            message: 'error in registering',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    await userModel.findOne({
        email: req.body.email
    })
        .then((result) => {
            if (result) {
                var compare = bcrypt.compareSync(req.body.password, result.password)
                if (compare) {
                    var token = jwt.sign({
                        userdata: {
                            _id: result._id,
                            name: result.name,
                            email: result.email,
                            role: result.role
                        }
                    },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    )

                    var resp = {
                        status: true,
                        message: 'successfully login',
                        token: token
                    }
                }
                else {
                    var resp = {
                        status: false,
                        message: 'incorrect password',
                    }
                }
            }
            else {
                var resp = {
                    status: false,
                    message: 'incorrect email and password'
                }
            }
            res.send(resp);
        })
        .catch((error) => {
            var error = {
                status: false,
                message: 'something went wrong',
                data: error.message
            }
            res.send(error);
        })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    register,
    login
};