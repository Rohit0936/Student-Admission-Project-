let express=require("express");
let app=express();

let path=require("path");
let pathpub=path.join(__dirname,"public");
app.use(express.static(pathpub));
app.use(express.urlencoded({extended:true}));

let mysql=require("mysql2");
const { doesNotMatch } = require("assert");
const { render } = require("ejs");
const { Console } = require("console");
//const { compile } = require("ejs");
//const { console } = require("inspector");

let coursen;

let conn=mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"studentaddmission"
});

conn.connect((err,result)=>{
   if(err)
   {
    console.log("Database Connection fail");
   }
   else
   {
    console.log("Database Connected");
   }
});
app.set("view engine",'ejs');


app.get("",(req,res)=>{
    conn.query("SELECT *FROM Course",(err,result)=>{
        coursen=result;
        res.render("mainmenu.ejs",{co:result});
    })

});

app.get("/course",(req,res)=>{
    conn.query("SELECT *FROM Course",(err,result)=>{
        res.render("courseForm.ejs",{co:result,mes:"",mes1:""});
    })

   
})

//Add course in database;
app.post("/addcourse",(req,res)=>{

    let course=req.body.name.trim();
    let fee=req.body.fee.trim();
    
        
        conn.query("INSERT INTO Course VALUES('0',?,?)",[course,fee],(err,result)=>{

        
            if(err)
            {
              // console.log("Data Add fail "+err);
                res.render('courseForm.ejs',{co:coursen,mes:"Course All ready present in table",mes1:""});
            }
            else
            {
                //console.log("Data Add Successfully");
                res.render('courseForm.ejs',{co:coursen,mes:"",mes1:"Course Add Successfully"});
            }
    
        });    


});

app.get("/coursetable",(req,res)=>{

   // console.log(str);
    conn.query("SELECT *FROM Course",(err,result)=>{

        res.render("CourseTable.ejs",{co:result});
    });
  
    
});

app.get("/searchCourse",(req,res)=>{

    let str=req.query.na.trim();

    conn.query("SELECT *FROM Course WHERE Course_Name LIKE '%"+str+"%'",(err,result)=>{

        res.json(result);
    });
});

app.get("/deleteCourse",(req,res)=>{

    let id=req.query.id.trim();

    conn.query("DELETE FROM Course WHERE Course_Id=?",[id],(req,res)=>{

    });

    conn.query("SELECT *FROM Course",(err,result)=>{
        res.render("CourseTable.ejs",{co:result});
    });
});

let uid;
app.get("/updatecourse",(req,res)=>{
  
    let id=parseInt(req.query.id.trim());
    uid=id;
    conn.query("SELECT *FROM Course WHERE Course_Id=?",[id],(err,result)=>{
      //  console.log(result);
        res.render("updatecourse.ejs",{update:result[0],re:""});
    })
  
});

app.post("/updatecourse",(req,res)=>{
     
    let name=req.body.cname;
    let num=req.body.cfee;
     
    conn.query("UPDATE Course SET Course_Name=?, Fee=? WHERE Course_Id=?",[name,num,uid],(err,result)=>{
        

            res.redirect("/CourseTable");
    });

});

app.get("/AddStudent",(req,res)=>{

    conn.query("SELECT *FROM Course",(err,result)=>{
           // console.log("Code run");
            res.render("StudentForm.ejs",{co:coursen,coursedata:result});
        
    });
   
});

app.post("/studentadd",(req,res)=>{

    let name=req.body.stuname;
    let no=req.body.stunumber;
    let email=req.body.stuemail;
    let coursename=req.body.stucourse;
console.log(coursename);
    conn.query("INSERT INTO Student VALUE('0',?,?,?,?)",[name,no,email,coursename],(err,result)=>{

        if(err)
        {
            conn.query("SELECT *FROM Course",(err,result)=>{
                // console.log("Code run");
                 res.render("StudentForm.ejs",{co:coursen,coursedata:result});
             
         });
        }
        else{
            conn.query("SELECT *FROM Course",(err,result)=>{
                // console.log("Code run");
                 res.render("StudentForm.ejs",{co:coursen,coursedata:result});
             
         });
        }
    });
});

app.get("/showStudent",(req,res)=>{

    conn.query("SELECT s.Student_id,s.Name,s.Contact,s.Email,c.Course_Name FROM Student s INNER JOIN Course c on s.Course_Id=c.Course_Id",(err,result)=>{
      //  console.log(result);
        res.render("StudentTable.ejs",{co:coursen,studentdata:result});
    });
    
});

app.get("/deleteStudent",(req,res)=>{

    let id=parseInt(req.query.id.trim());

    conn.query("DELETE FROM Student WHERE Student_Id=?",[id],(err,result)=>{

        if(err)
        {
            console.log("err "+err);
        }
        else{
            res.redirect("/showStudent");
        }
    });

});

let sid;

app.get("/updateStudent",(req,res)=>{
    sid=parseInt(req.query.id.trim());

    let resultstu;
    conn.query("SELECT *FROM Student where Student_Id=?",[sid],(err,result)=>{
        resultstu=result[0];
        //res.render("updateStudent.ejs",{coursedata:"",studentdata:result[0]});
        
    })

    conn.query("SELECT *FROM Course",(err,result)=>{
        res.render("updateStudent.ejs",{co:result,studentdata:resultstu});
    })
   
});

app.post("/studentUpdate",(req,res)=>{

      let name=req.body.stupuname;
      let no=req.body.stupunumber;
      let email=req.body.stuupemail;
      let course=parseInt(req.body.stuupcourse);
    

      conn.query("UPDATE Student SET name=?, Contact=? ,Email=?,Course_Id=? WHERE Student_Id=?",[name,no,email,course,sid],(err,result)=>{
           
        if(err)
            {
                console.log("err "+err);
            }
            else{
                res.redirect("/showStudent");
            }
       
      });
});

app.get("/getStudent",(req,res)=>{

    let str=req.query.na.trim();
    conn.query("SELECT s.Student_id,s.Name,s.Contact,s.Email,c.Course_Name FROM Student s INNER JOIN Course c on s.Course_Id=c.Course_Id WHERE s.name LIKE '%"+str+"%'",(err,result)=>{

        res.json(result);
    });
    
});

app.get("/coursewise",(req,res)=>{
    
    conn.query("SELECT *FROM Course",(err,result)=>{
        res.render("CourseWiseStudent.ejs",{courseWiseData:result,stuCoursewisedata:"rohit"});
    });
   
});

app.get("/showcourseStudent",(req,res)=>{

    let cid=parseInt(req.query.cid);
    let course;
    
    conn.query("SELECT *FROM Course",(err,result)=>{
        course=result;
       /// res.render("CourseWiseStudent.ejs",{courseWiseData:result});
    });

    conn.query("SELECT s.Student_id,s.Name,s.Contact,s.Email,c.Course_Name FROM Student s INNER JOIN Course c on s.Course_Id=c.Course_Id WHERE c.Course_Id=?",[cid],(err,result)=>{

        if(err)
        {
          console.log("err: "+err);
        }
        else{
            res.render("StudentTable.ejs",{co:course,studentdata:result});
        }
        
    })
    
  //  res.end();
});



app.listen(4000,()=>{
    console.log("Server Run");
});

