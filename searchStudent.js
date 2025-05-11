let temp;
let stuajaxcall=(str)=>{
    
    temp=str;
    let xhr=new XMLHttpRequest();

    xhr.open("get",'/getStudent?na='+str,true);
    xhr.onreadystatechange=()=>{

      //  console.log(xhr.status);
       
        if(xhr.readyState==4 && xhr.status==200)
        {
            let stujson=xhr.responseText;
            console.log(stujson);
            let studentData=JSON.parse(stujson);
            let tbody=document.getElementById("studentTable");
            
            tbody.innerHTML="";
            for(let i=0;i<studentData.length;i++)
            {
                let tr=document.createElement("tr");
                let td=document.createElement("td");
                td.innerHTML="<h5>"+(i+1)+"</h5>";
                tr.appendChild(td);
  
                td=document.createElement("td");
                td.innerHTML="<h5>"+studentData[i].Name+"</h5>";
                tr.appendChild(td);

                td=document.createElement("td");
                td.innerHTML="<h5>"+studentData[i].Contact+"</h5>";
                tr.appendChild(td);
                
                td=document.createElement("td");
                td.innerHTML="<h5>"+studentData[i].Email+"</h5>";
                tr.appendChild(td);

                td=document.createElement("td");
                td.innerHTML="<h5>"+studentData[i].Course_Name+"</h5>";
                tr.appendChild(td);

                 td=document.createElement("td");
                 let icon1=document.createElement("i");
                 icon1.classList.add("fa-solid","fa-trash");
                 let ancre=document.createElement("a");
                 ancre.setAttribute("href","/deleteStudent?id="+studentData[i].Student_Id);
                 ancre.appendChild(icon1);
                 let storeIcon=document.createElement("h4");
                 storeIcon.appendChild(ancre);
                 td.appendChild(storeIcon);
                 tr.appendChild(td);

                 td=document.createElement("td");
                 icon1=document.createElement("i");
                 icon1.classList.add("fa-solid","fa-file-pen");
                 let ancre1=document.createElement("a");
                 ancre1.setAttribute("href","/updateStudent?id="+studentData[i].Student_Id);
                 ancre1.appendChild(icon1);
                 storeIcon=document.createElement("h4");
                 storeIcon.appendChild(ancre1);
                 td.appendChild(storeIcon);
                 tr.appendChild(td);

                tbody.appendChild(tr);
            }
           
        }
    };

    xhr.send();
}

