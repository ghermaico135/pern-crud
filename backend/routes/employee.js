import express from 'express';
import { getAllEmployee,createEmployee,specificEmployee,updateEmployee,deleteEmployee } from '../controller/employeeController.js';

const route = express.Router();

route.get("/", getAllEmployee);

route.post("/", createEmployee);

route.get("/:id", specificEmployee);

route.put("/:id", updateEmployee);

route.delete("/:id",deleteEmployee);

export default route;