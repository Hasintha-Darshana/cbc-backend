import Student from "../models/student.js";

export function getStudents(req,res){
    Student.find().then(
        (data)=>{
            res.json(data)
        }
    )
}

export function saveStudents(req, res) {
       
    console.log(req.body );
    

    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        subject: req.body.subject,
        email: req.body.email
    })

    student.save().then(()=>{
       res.json(
        {
            message: "student saved"
        }
       )
    }).catch(()=>{
        res.json(
            {
                message: "student not saved"
            }
           )
    })

}