const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


aws.config.update({
  secretAccessKey: 'V+hw3yjSEabyiBiQ/xWM4FV7TUu0Vh/kNhdej3w9',
  accessKeyId: 'AKIATH7M5QDJ46KGJ4LW',
  region: 'us-west-1'
});

const s3 = new aws.S3();

/*const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}*/ 

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'softwareappfinal2',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});



/*const upload = multer({
  //fileFilter,
  storage: multerS3({
    s3,
    bucket: 'softwareappfinal2',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});//'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})*/

module.exports = upload;