import express from 'express';
import { getEmployee,createEmployee,specificEmployee,updateEmployee,deleteEmployee } from '../controller/employeeController.js';

const route = express.Router();

route.get("/", getEmployee);

route.post("/", createEmployee);

route.get("/:id", specificEmployee);

route.put("/:id", updateEmployee);

route.delete("/:id",deleteEmployee);

export default route;