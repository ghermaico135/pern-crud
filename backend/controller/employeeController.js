export const getEmployee = async (req, res, next) => {  
    res.send("employee detail");
    next();
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