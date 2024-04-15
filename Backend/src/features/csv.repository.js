import { ApplicationError } from "../Error-handler/applicationerror.js";
import { DataModel } from "./csv.schema.js";
import fs from 'fs';
import csvParser from 'csv-parser';
import mongoose from "mongoose";
export default class CsvRepository{

    async parseCsvFile(filePath){
        try{
            const results = [];
            const headers = [];
    
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csvParser({ separator: ',' }))
                    .on('headers', (headerList) => {
                        headers.push(...headerList);
                    })
                    .on('data', (data) => {
                        results.push(data);
                    })
                    .on('end', () => {
                        resolve({ headers, results });
                    })
                    .on('error', (err) => {
                        reject(err);
                    });
            });
    
            return { headers, results };

        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database",500)

        }
    }

    async saveData(originalFilename, headers, results, filePath) {
        try {
            await DataModel.create({originalFilename, headers, data: results });
            // Delete the temporary file
            fs.unlinkSync(filePath);
        } catch (err) {
            console.error(err);
            throw new ApplicationError("Error saving data to database", 500);
        }
    }

    async getAllFiles(){
        try{
            const Files=await DataModel.find();
            if(Files.length>0){
                return {success:true,res:Files}
            }else{
                return{success:false,res:"No files uploaded"}
            }

        }catch (err) {
            console.error(err);
            throw new ApplicationError("Error saving data to database", 500);
        }
    }

    async getdataById(id){
        try{
            const file= await DataModel.findById(id);
            if(file){
                return{success:true,res:file}
            }else{
                return{success:false,res:"File not found"}
            }

        }catch (err) {
            console.error(err);
            throw new ApplicationError("Error saving data to database", 500);
        }
    }


}