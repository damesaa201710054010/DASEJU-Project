const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const documentoController = {};

documentoController.getDocumentos = (req, res) => {
    gfs.find().toArray((err, files) => {
        // check if files
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
    
        return res.json(files);
      });
}

documentoController.getDocumento = (req, res) => {
    gfs.find(
        {
          filename: req.params.filename
        },
        (err, file) => {
          if (!file) {
            return res.status(404).json({
              err: "no files exist"
            });
          }
    
          return res.json(file);
        }
      );
}

documentoController.uploadDocumento = (req, res) => {
    res.json({file : req.file});
}

documentoController.deleteDocumento = (req, res) => {
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) return res.status(404).json({ err: err.message });
        //res.redirect("/");
      });
}

module.exports = documentoController;