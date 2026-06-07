const express = require('express');
const router = express.Router();

const streamCtrl = require('../controllers/streamCtrl');
const studentCtrl = require('../controllers/studentCtrl');
const subjectCtrl = require('../controllers/subjectCtrl');
const scoreCtrl = require('../controllers/scoreCtrl');
const reportCtrl = require('../controllers/reportCtrl');

router.post('/streams', streamCtrl.createStream);
router.get('/streams', streamCtrl.getAllStreams);
router.get('/streams/:id', streamCtrl.getStreamDetails);

router.post('/students', studentCtrl.registerStudent);
router.get('/students', studentCtrl.getAllStudents);
router.get('/streams/:streamId/students', studentCtrl.getStudentsByStream);
router.get('/students/:id', studentCtrl.getStudentDetails);
router.put('/students/:id', studentCtrl.updateStudent);
router.delete('/students/:id', studentCtrl.deleteStudent);

router.post('/subjects', subjectCtrl.createSubject);
router.get('/subjects', subjectCtrl.getAllSubjects);

router.post('/scores', scoreCtrl.submitScore);

router.get('/reports/rankings/:streamId', reportCtrl.getStreamRankings);
router.get('/reports/student/:studentId/pdf', reportCtrl.getStudentReportCard);

module.exports = router;