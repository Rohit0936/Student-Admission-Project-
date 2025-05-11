function ajaxcall(str)
{
    let http=new XMLHttpRequest();
     http.open("get",'/searchCourse?na='+str,true);
     http.onreadystatechange=()=>{

        if(http.readyState==4 && http.status==200)
        {
          
            let jsontext=http.responseText;
            let CourseData=JSON.parse(jsontext);
            let show=document.getElementById("tableCourse");
            show.innerHTML="";
            for(let i=0;i<CourseData.length;i++)
            {
                let tr=document.createElement("tr");
                
                let td=document.createElement("td");
                td.innerHTML="<h4>"+(i+1)+"</h4>";
                tr.appendChild(td);

                td=document.createElement("td");
                td.innerHTML="<h4>"+CourseData[i].Course_Name+"</h4>";
                tr.appendChild(td);

                td=document.createElement("td");
                td.innerHTML="<h4>"+CourseData[i].Fee+"</h4>";
                tr.appendChild(td);

                td=document.createElement("td");
                let icon1=document.createElement("i");
                icon1.classList.add("fa-solid","fa-trash");
                let ancre=document.createElement("a");
                ancre.setAttribute("href","/deleteCourse?id="+CourseData[i].Course_Id);
                ancre.appendChild(icon1);
                let storeIcon=document.createElement("h4");
                storeIcon.appendChild(ancre);
                td.appendChild(storeIcon);
                tr.appendChild(td);

                td=document.createElement("td");
                icon1=document.createElement("i");
                icon1.classList.add("fa-solid","fa-file-pen");
                let ancre1=document.createElement("a");
                ancre1.setAttribute("href","/updateCourse?id="+CourseData[i].Course_Id);
                ancre1.appendChild(icon1);
                storeIcon=document.createElement("h4");
                storeIcon.appendChild(ancre1);
                td.appendChild(storeIcon);
                tr.appendChild(td);


                show.appendChild(tr);
            }

            
            
            
        }
     }

     http.send();
}