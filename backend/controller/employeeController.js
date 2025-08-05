import { query } from "../utils/connectToDB.js";
import { createEmployeeTableQuery,createRoleQuery,
    getAllEmployeeQuery,
    createEmployeeQuery, 
    getEmployeeQuery,
    deleteEmployeeQuery,
   updateEmployeeQuery
 } from "../model/sqlQuery.js";
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
export const specificEmployee = async (req, res, next) => { 
   try{
        let id = req.params.id
        const data = await query(getEmployeeQuery, [id])
        console.log(data)
        if(!data.rows.length){
           return next(createErrors(400,"employee isn't found"))
        }
        return res.status(200).json(data.rows[0]);

   }catch(error){
         console.log(error.message)
        next(createErrors(400 ,"couldn't found employee_details table"));
   }

}

export const deleteEmployee =async (req, res, next) => {  
  
   try{
        const id = req.params.id;
         const data = await query(deleteEmployeeQuery, [id]);
    console.log(data)
            if(!data.rowCount){
                return next(createErrors(400, "No data found"))
            }
            return res.status(200).json({message:"successfully deleted"})

   }catch(error){
         console.log(error.message)
        next(createErrors(400 ,"couldn't found employee_details table"));
   }
  
}

export const updateEmployee = async  (req, res, next) => { 
    
    try{
        const id = req.params.id
        console.log(id)
        const {name,email,age,role,salary} = req.body
        console.log(name)
          if(!name || !email || !age || !role || !salary){
            return res.status(400).json({error:"Missing fields"})
        }

        const result = await query(updateEmployeeQuery,[name,email,age,role,salary,id])
            console.log(result)
        if(result.rowCount ===  0){
             return next(createErrors(400, "No data found"))
        }
        return res.status(200).json(result.rows[0])
    }catch(error){
         console.log(error.message)
        next(createErrors(400 ,"couldn't found employee_details table"));
    }
}
