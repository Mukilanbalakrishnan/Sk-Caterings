const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/serviceController');
const upload = require('../middleware/uploadMiddleware');

// Define Routes
router.get('/', ServiceController.getAll);

// 'imageFile' is the name of the input field in your frontend form
router.post('/', upload.single('imageFile'), ServiceController.create);

router.put('/:id', upload.single('imageFile'), ServiceController.update);

router.delete('/:id', ServiceController.delete);

module.exports = router;