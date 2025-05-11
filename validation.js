let courseform=true;

function refrese(){
     let span=document.getElementById("mess");
     span.innerHTML="";
     let err=document.getElementById("err");
     err.innerHTML="";
    
}
let callCourse=(str)=>{

     let input=document.getElementById("mycourseform").value;

     let span=document.getElementById("mess");
     span.innerHTML="";
     let err=document.getElementById("err");
     err.innerHTML="";

     let span1=document.getElementById("mes");
     span1.innerHTML="";
     courseform=true;
     for(let i=0;i<str.length;i++)
     {
          
          let code=str.charCodeAt(i);
         // alert(code);
          if(!((code>=65 && code<=90) || (code>=97 && code<=122)|| (code==32)))
          {
               span.innerHTML="Invalid Course";
               
              courseform=false;
             
              break;
          }
     }
   
};

function numfee(){
   
     
     let err=document.getElementById("err");
     err.innerHTML="";
     span1.innerHTML="";
     let span1=document.getElementById("mes");
     span1.innerHTML="";
}

let submitform=()=>{
    
     let cname=document.getElementById("cname").value;
     let num=document.getElementById("num").value;
     
     let span=document.getElementById("mess");
     //span.innerHTML="";
     let span1=document.getElementById("mes");
     let err=document.getElementById("err");
     //span1.innerHTML="";
    // alert(cname.length);
  //alert(courseform);
   if(cname.length===0)
   {
     span.innerHTML="Enter Course";
     courseform=false;
   }
   if(num.length===0)
   {
     span1.innerHTML="Enter Fee";
     courseform=false;
   }
     if(courseform)
     {
         
          return true;
       
     }
     else
     {
         // span.innerHTML="Invalid Course";
        //  courseform=true;
        err.innerHTML="From not submit"
        return false;
     }
};

