const express =  require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();


const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../../client/public/uploads');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
  
const upload = multer({storage:storage})

  router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
  })

module.exports = router