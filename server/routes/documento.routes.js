const express = require('express');
const router = express.Router();
const documento = require('../controllers/documentos.controller');
const { subir } = require('../index');

router.post('/upload', subir.single("file"), documento.uploadDocumento);
router.get('/documentos', documento.getDocumentos);
router.get('/documento/:id', documento.getDocumento);
router.post('/documento/delete/:id', documento.deleteDocumento);

module.exports = router;