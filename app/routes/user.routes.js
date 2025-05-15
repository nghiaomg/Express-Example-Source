const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.post('/google-login', userController.googleLogin);

router.get('/profile', authMiddleware.authenticate, userController.getProfile);
router.post('/change-password', authMiddleware.authenticate, userController.changePassword);

router.get('/', authMiddleware.authenticate, authMiddleware.isAdmin, userController.getAllUsers);
router.get('/:id', authMiddleware.authenticate, userController.getUserById);
router.put('/:id', authMiddleware.authenticate, userController.updateUser);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;