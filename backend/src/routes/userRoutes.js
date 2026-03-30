const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/add', userController.createUser);
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;