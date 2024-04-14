import express from 'express';
import CsvController from './csv.controller.js';
import { upload } from '../middlewares/filupload.middleware.js';

const csvController= new CsvController();
const csvRouter= express.Router();

csvRouter.route('/upload').post(upload.single('file'),(req,res,next)=>{
    csvController.uploadfile(req,res,next);
});
csvRouter.route('/getall').get((req,res,next)=>{
    csvController.sendAllFile(req,res,next);
});
csvRouter.route('/').get((req,res,next)=>{
    csvController.getFileById(req,res,next);
});

export default csvRouter;