import multer from 'multer';
import os from 'os'; 
import { ApplicationError } from '../Error-handler/applicationerror.js';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,os.tmpdir());
    },
    filename:(req,file,cb)=>{
        const datePrefix = new Date().toISOString().replace(/:/g, '-');
        const originalName = file.originalname;
        const filename = `${datePrefix}_${originalName}`;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true); // Accept CSV files
    } else {
        cb(new ApplicationError('Only CSV files are allowed',400 )); // Reject other file types
    }
};

export const upload=multer({
    storage:storage,
    fileFilter: fileFilter
})