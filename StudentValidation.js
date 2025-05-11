
let temp="";
function nameValidation(str){
    
    let span=document.getElementById("namevali");
    span.innerHTML="";
 temp="";
      for(let i=0;i<str.length;i++)
      {
          
          let code=str.charCodeAt(i);
          
          if(!(((code>=65 && code<=90) || (code>=95 && code<=122)) || code==32))
          {
           span.innerHTML="Invalid Name"; 
           temp="";
          }
          else{
            temp=temp+(String.fromCharCode(code));
          }
         
      }
};

function setname(){
  //  let name=document.getElementById("namevali").value;
    
//alert(temp);
let name=temp;
let store="";
let flag=false;

    for(let i=0;i<name.length;i++)//rohit borade
    {
        let code=name.charCodeAt(i);
       // console.log(code);
        if(i==0 && (code>=95 && code<=122 && code!=32))
        {
            store=store+(String.fromCharCode(code-32));
            console.log(temp);
        }
       else if(flag)
        {
            if(code>=95 && code<=122)
            {
                store=store+(String.fromCharCode(code-32));
            console.log(temp);
            flag=false;
            }
            else{
                store=store+(String.fromCharCode(code));
                console.log(temp);
                flag=false;
            }
           
           
       }
        else if(i!=0 && (code>=65 && code<=90 && !flag) )
        {
            store=store+(String.fromCharCode(code+32));
            console.log(temp);
        }
        else if(code==32)
        {
            store=store+" ";
            flag=true;
        }
        else{
            store=store+(String.fromCharCode(code));
           // console.log(temp);
        }
    }

    store=store.trim();
    
  
   let nn=document.getElementById("nv").value=store;
   
    temp="";
}


function numValidation(str){
   
   // alert(hello);

    let span=document.getElementById("numvali");
    span.innerHTML="";

    if(str.length!=10)
    {
        span.innerHTML="Invalid Number";
    }
}

function emailValidation(str)
{
    let span=document.getElementById("emailvali");
    span.innerHTML="";
    
    let attherate=0;
    let flag=false;
    for(let i=0;i<str.length;i++)//@@gmail
    {
        let code=str.charCodeAt(i);
        if((code>=65 && code<=90) || code==32 || attherate>1)
        {
            span.innerHTML="Invalid Email";
        }
         if(code==64)
        {

            attherate++;  
        }
    }

    if(!(str.endsWith("gmail.com") && attherate!=0))
    {
        span.innerHTML="Invalid Email";
    }
}

