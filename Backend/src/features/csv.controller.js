import CsvRepository from "./csv.repository.js";
import path from 'path';
export default class CsvController {

    constructor() {
        this.csvRepository = new CsvRepository();
    }

    async uploadfile(req, res, next) {
        try {
            const { file } = req;
            if (!file) {
                return res.status(400).send('No file uploaded');
            }
            const { originalname, path: filePath } = file;
            const filenameWithoutExtension = path.parse(originalname).name;

            const { headers, results } = await this.csvRepository.parseCsvFile(filePath);
            await this.csvRepository.saveData(filenameWithoutExtension, headers, results, filePath);

            res.status(201).json({success:true,res:'Data saved successfully'});


        }
        catch (err) {
            next(err);
        }
    }

    async sendAllFile(req,res,next){
        try{
            const result=await this.csvRepository.getAllFiles();
            if(result.success){
                res.status(200).json({success:true,res:result.res})
            }else{
                res.status(200).json({success:false,res:[]})
            }

        } catch (err) {
            next(err);
        }
    }
    async getFileById(req,res,next){
        try{
            const id= req.query.id;
            const result= await this.csvRepository.getdataById(id);
            if(result.success){
                res.status(200).json({success:true,res:result.res})
            }else{
                res.status(404).json({success:false,res:result.res})
            }

        }
        catch(err){
            next(err)
        }
    }
}