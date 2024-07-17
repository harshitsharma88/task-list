
const table = document.querySelector('table');
const token = localStorage.getItem('token');
let currentpage =1;
let itemsperpage = document.querySelector('#perpage').value;
let firstpage = document.querySelector('#firstpage');
let lastpage = document.querySelector('#lastpage');
let navbtns = document.querySelector('#nav-btns');
let totalpages = 0;
const dialog = document.querySelector("#dialog");

window.onload=getAll;

document.querySelector('#username').textContent = "Welcome "+localStorage.getItem('username');

document.querySelector("#logoutbtn").addEventListener('click',(event)=>{
    localStorage.clear();
    location.replace("http://52.91.16.45")
})

document.querySelector("#deleteuserbtn").addEventListener('click',async(event)=>{
  

    if(confirm("Do you want to continue..!")){

    await axios({
        method:'delete',
        url:'http://52.91.16.45/task/delete-user',
        headers:{Authorazation:token}
    });

    localStorage.clear();
    location.replace("http://52.91.16.45");
}
else{
    dialog.open =false;
}
})

document.querySelector("#opensidebar").addEventListener('click',(event)=>{
    
    dialog.open =true;
})

document.querySelector("#closesidebar").addEventListener('click',(event)=>{
    
    dialog.open =false;

})

document.querySelector('#firstpage').addEventListener('click',()=>{
    if(currentpage===1){
        return;
    }
    table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'
    currentpage=1;
    getAll();
})

document.querySelector('#lastpage').addEventListener('click',()=>{
    if(currentpage===totalpages){
        return;
    }
    table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'
    currentpage=totalpages;
    getAll();
})

document.querySelector('#previous').addEventListener('click',()=>{
    
    if(currentpage>1){
        table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'
        currentpage=currentpage-1;
        getAll();
    }
})

document.querySelector('#next').addEventListener('click',()=>{
    
    if(currentpage<totalpages){
        table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'
        currentpage=currentpage+1;
        getAll();
    }
})

function changeItems(){
    itemsperpage= document.querySelector('#perpage').value;
    table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'

    getAll();

}


async function getAll() {

    try {

        const result = await axios.get(`http://52.91.16.45/task/get-task/${itemsperpage}/${currentpage}`,{headers:{Authorazation:token}})

        result.data.response.forEach(element => {
            display(element);
        });
        totalpages=result.data.totalpages
        
        if(totalpages===0){
            firstpage.textContent=0;
            navbtns.innerHTML='';
            lastpage.textContent=0;
            
        }
        else{
            navButtons(result.data.totalpages);
        }      
        
    } catch (error) {

        alert(error)
        
    } 
    
}

function navButtons(totalpages){
    firstpage.textContent=1;
    lastpage.textContent=totalpages;
    navbtns.innerHTML='';
    if(totalpages>0){
        if(totalpages===1){
            navbtns.innerHTML=`<button class='skip'>1</button>`
        }
        else if(totalpages===2){
            navbtns.innerHTML='';

            const btn1= document.createElement('button');
            btn1.textContent=1;
            btn1.className='skip';
            btn1.addEventListener('click',navbtnListenner);
            const btn2= document.createElement('button');
            btn2.textContent=2;
            btn2.className='skip';
            btn2.addEventListener('click',navbtnListenner);
            navbtns.appendChild(btn1);
            navbtns.appendChild(btn2);
        }
        else{
            if(currentpage>totalpages-2){
            navbtns.innerHTML='';
            const btn1= document.createElement('button');
            btn1.textContent=totalpages-2;
            btn1.className='skip';
            btn1.addEventListener('click',navbtnListenner);
            const btn2= document.createElement('button');
            btn2.textContent=totalpages-1;
            btn2.className='skip';
            btn2.addEventListener('click',navbtnListenner);
            const btn3= document.createElement('button');
            btn3.textContent=totalpages;
            btn3.className='skip';
            btn3.addEventListener('click',navbtnListenner);
            navbtns.appendChild(btn1);
            navbtns.appendChild(btn2);
            navbtns.appendChild(btn3);


            }
        
            else{
            navbtns.innerHTML='';
            const btn1= document.createElement('button');
            btn1.textContent=currentpage;
            btn1.className='skip';
            btn1.addEventListener('click',navbtnListenner);
            const btn2= document.createElement('button');
            btn2.className='skip';
            btn2.textContent=currentpage+1;
            btn2.addEventListener('click',navbtnListenner);
            const btn3= document.createElement('button');
            btn3.className='skip';
            btn3.textContent=currentpage+2;
            btn3.addEventListener('click',navbtnListenner);
            navbtns.appendChild(btn1);
            navbtns.appendChild(btn2);
            navbtns.appendChild(btn3);

        }

        }

    }
}

function navbtnListenner(event){
    let shiftpage = parseInt(event.target.textContent);
    if(shiftpage==currentpage){
        return;
    }
    currentpage=shiftpage;
    table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'
    getAll();
    
}


async function handleAddTask(event){
    event.preventDefault();
        
    try {

        const deadline=event.target.deadline.value;
        const date = new Date(deadline);
        date.setHours(0,0,0,0);
        
        const todayDate= new Date();
        todayDate.setHours(0,0,0,0);
             
        if(date<todayDate){
            alert('Can not add Task on date before tODAY');
            return;

        }
        const taskObj={
            deadline:deadline,
            description:event.target.description.value,
            title:event.target.title.value
        }

        const result= await axios.post('http://52.91.16.45/task/add-task',taskObj,{headers:{Authorazation:token}});
        event.target.deadline.value=""
        event.target.description.value=""
        event.target.title.value=""
       
        table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'
        getAll();
        
    } catch (error) {
        console.log(error);
        alert(error);
        
    }       
   
}

 
function display(object){
    const tr= document.createElement('tr');
    tr.className='tasktr'
    tr.innerHTML=`<td>${object.title}</td><td>${object.description}</td><td>${object.deadline}</td><td>${object.status}</td>`
    const deletebtn= document.createElement('button');
    deletebtn.textContent= "Delete";
    deletebtn.className='deltask';

    const select = document.createElement('select');
    select.innerHTML='<option>Done</option><option>In Progress</option>'

    select.addEventListener('change',async(event)=>{
        try{
            const obj = {
                id:object._id,
                status:event.target.value
            }

        await axios.patch('http://52.91.16.45/task/update-task',obj,{headers:{Authorazation:token}});
           tr.cells[3].textContent=event.target.value;

        }catch(error){
            alert(error);
        }
    });

    deletebtn.addEventListener('click',async()=>{
        try{

    const result=await axios({
    method:'delete',
    url:'http://52.91.16.45/task/delete-task',
    data:object,
    headers:{Authorazation:token}})

    console.log(result.data);
    table.innerHTML='<tr class="recordsHeading"><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th><th>Update Status</th></tr>'
    getAll();
    deletebtn.parentElement.remove();

    }

    catch(error){
        console.log(error);
    }

})
const td = document.createElement('td');
td.appendChild(select);
tr.appendChild(td);
tr.appendChild(deletebtn);
table.appendChild(tr);

}