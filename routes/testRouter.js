const express = require('express');
const { testUserController } = require('../controllers/testController');

//create router object
const router = express.Router();

//crete routes like POST || GET || DELETE || PUT
router.get('/test-user', testUserController);

//export
module.exports = router;
