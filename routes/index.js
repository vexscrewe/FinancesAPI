const express = require('express');
const router = express.Router();

const tarefasRoutes = require('./tarefas');

router.use('/tarefas', tarefasRoutes);

module.exports = router;