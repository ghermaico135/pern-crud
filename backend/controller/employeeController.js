import { query } from "../utils/connectToDB.js";
import { createEmployeeTableQuery,createRoleQuery,getAllEmployeeQuery,createEmployeeQuery,getAllEmployee, getEmployeeQuery } from "../model/sqlQuery.js";
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
    try{

        const {name,email,age,role,salary} = req.body
       
        if(!name || !email || !age || !role || !salary){
            return res.status(400).json({error:"Missing fields"})
        }

        const data = await query(createEmployeeQuery,[name,email,age,role,salary]);
        return res.status(201).json(data.rows[0]);

    }catch(error){
           console.log(error.message)
        next(createErrors(400 ,"couldn't found employee_details table"));
    }

}
export const specificEmployee = async  (req, res, next) => { 
   try{
        let id = req.params.id
        const data = await query(getEmployeeQuery(id))
        if(!data.rows.length){
            next(createErrors(400,"employee isn't found"))
        }
        return res.status(200).json(data.rows[0]);

   }catch(error){
         console.log(error.message)
        next(createErrors(400 ,"couldn't found employee_details table"));
   }
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