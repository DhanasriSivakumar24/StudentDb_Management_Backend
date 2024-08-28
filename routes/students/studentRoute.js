const express = require("express");
const router = express.Router();

const Student = require("../../db/schema/studentDb.js");

router.get("/",async(req,res)=>{
    const queryParams = req.query;
    const filters={};
    if(queryParams.studentName){
     filters.studentName={
         $regex:`^${queryParams.studentName}`,$options:"i",
     };
    }
    if(queryParams.department){
        filters.department={
            $regex:`^${queryParams.department}`,$options:"i",
        };
       }

     const student = await Student.find(filters);
     res.json(student);
 });

router.get("/",async (req,res)=>{
    const student = await Student.find();
        res.json(student);
})

router.post("/", async(req,res)=>{
    try{
        const studentData = req.body;
        const newStudent = new Student(studentData);
        await newStudent.save();
        res.json({
            message:"Student Details Added Succesfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            message:"Bad Request",
        });
    }
});

router.put("/:id",async (req,res)=>{
    try{
        const studentId = req.params.id;
        const studentData = req.body;
        await Student.findByIdAndUpdate(studentId,studentData);
        res.json({
            message:"Student Details Updated Succesfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(406).json({
            message:"Not Acceptable",
        })
    }
})

router.delete("/:id",async(req,res) =>{
    try{
        const studentId = req.params.id;
        const deleteStudentId = req.body;
        await Student.findByIdAndDelete(deleteStudentId);
        res.json({
            message:"Student Details Deleted Succesfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            message:"Not Found",
        });
    }
});


router.get("/:id",async(req,res)=>{
    try{
        const studentId= req.query.id;
        const student =await Student.findById(studentId);
    res.json({
        message:"Movie found successfully",
    });
}
  catch(error){
    if(error.kind ==="ObjectId"){
        res.status(404).json({message:"Movie not found"});  
    }
        else{
        res.status(500).json({message:"Internal source error"}); 
     }

}
});


// router.get("/",(req,res)=>{
//     console.log("This is get Request");
// }) Initial Testing Code

module.exports = router;