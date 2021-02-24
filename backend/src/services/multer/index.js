import multer from 'multer'
import path from 'path'

const postStorage = multer.diskStorage({
    destination: path.join(__dirname, '../../assets/posts'),
    filename : function (req,file, callback) {
        callback(null, Date.now() + '_' + file.originalname)
    }
})

const fileFilter = (req,file,callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null,true)
    }else {
        callback(null,false)
    }
}

export const uploadPicture = multer({
    storage : postStorage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})