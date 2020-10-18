const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const DashboardController = require('../controllers/dashboard.controller');

router.route('/').get(ensureAuth, DashboardController.dashboard);

router.route('/edit/:id').get(ensureAuth, DashboardController.edit).put(ensureAuth, DashboardController.editPut);
module.exports = router;
