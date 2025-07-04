const express = require('express');
const router = express.Router();

const tarefasController = require('../controllers/tarefasController');

router.post('/', tarefasController.criarTarefa);
router.get('/', tarefasController.listarTarefas);
router.put('/:id', tarefasController.atualizarTarefa);
router.delete('/:id', tarefasController.deletarTarefa);

module.exports = router;