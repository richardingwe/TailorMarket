const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const JobController = require('../controllers/jobs.controller');

router.route('/').get(ensureAuth, JobController.jobs).post(JobController.addPost);

router.route('/add').get(JobController.add);

module.exports = router;
