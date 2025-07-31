import { query } from "../utils/connectToDB.js";
import { createEmployeeTableQuery,createRoleQuery,getAllEmployeeQuery } from "../model/sqlQuery.js";
import { createErrors } from "../utils/error.js";

export const getAllEmployee = async (req, res, next) => {  
    try{
        const response = await query(` SELECT to_regclass('employee_details') `)
        if(!response.rows[0].to_regclass){
             await query(createRoleQuery)
            await query(createEmployeeTableQuery)
           
        }
       
        const {rows} = await query(getAllEmployeeQuery);
        res.status(200).json(rows);
     
    }catch(error){
         console.log(error.message)
        next(createErrors(400 ,"couldn't found employee_details table"));
    }
    
}

export const createEmployee = async (req, res, next) => {  
    res.send("create employee");
    next();
}
export const specificEmployee = async  (req, res, next) => { 
    res.send("get specific employee");
    next();
}
export const updateEmployee = async  (req, res, next) => { 
    res.send("update specific employee");
    next();
}
export const deleteEmployee = (req, res, next) => {  
    res.send("delete specific employee");
    next();
}