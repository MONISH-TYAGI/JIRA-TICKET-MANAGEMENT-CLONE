let main_cont=document.querySelector(".main-cont");
let records=[];

loadFromStorage();
let box=document.querySelector(".modal-cont");
let colorArr=["lightgreen","lightpink","black","lightblue"];
let back_button=document.querySelector("button");
let plus=document.querySelector(".add");
let remove=document.querySelector(".remove");
let color="black";
let textArea=document.querySelector('.content');
let id;




let template=document.querySelector("template");
let check=1;
plus.addEventListener("click",(e)=>{
   box=document.querySelector(".modal-cont");
   let value=remove.getAttribute("value");
    console.log("value"+value)
   if(value=='true')
   {
      remove.setAttribute("value",false);
   remove.classList.remove('border');
   removeHandleListener();
   }
   console.log(box.classList);
    if(box.classList.contains('hidden'))
    {
     box.classList.remove('hidden');
     
      textArea.value='';
      // console.log("hi");
      // box.style.opacity=1;
      // box.style.display="flex";
      // console.log("hello");
      // let ans =getEventListeners(document.querySelector(".modal-cont"));
      // console.log("ans "+ans);
      // let ans =listAllEventListeners(document.querySelector("modal-cont"));
      // console.log("ans "+ans);
      if(check==1){
         check=2;
      box.addEventListener("keydown", function nextStep(e){
         // console.log("event");
         id=handleId(); 
         // console.log("A"+event.keyCode);
         // console.log("B"+event.which);
         // console.log(event);
       
         // return;
            let key=e.key;
            if(key=="End")
            {
              let content=textArea.value ;
            //   console.log("error"+color+id+content);
              if (typeof(records) == 'undefined' || records == null){
               records = [];
             }
             check=1;
            //  console.log("A"+records.length);
             records.push({color,id,content});
               createTicket(color,id,content);
               // console.log("B"+records.length);
               // box.style.display="none";
               // box.style.opacity=0;
               box.classList.add('hidden');
               this.removeEventListener("keydown",arguments.callee,false); 
              
            }
      })
   }
      // box.removeEventListener("keydown",nextStep(e),false); 
         
   }
 else{
   // box.style.display="none";
   //  box.style.opacity=0;
    box.classList.add('hidden');   
    
 }
 
handleColor();

})

// function nextStep(event)
// {
  
// }

remove.addEventListener("click",(e)=>{
   let value=remove.getAttribute("value");
   // console.log(value);
  if(value=='false')
 { 
   
     remove.setAttribute("value",true);

   remove.classList.add('border');
   handleDelete();
   
}
else{
   //removeHandleListener();
   remove.setAttribute("value",false);
   remove.classList.remove('border');
   removeHandleListener();
   
}
})

function removeHandleListener(){
   let getTickets=main_cont.querySelectorAll(".ticket");
   // console.log("hi"+getTickets.length);
   for(let i=0;i<getTickets.length;i++)
   {
         getTickets[i].removeEventListener("click",deleting);
      
   }
}
function handleDelete(){
   let getTickets=main_cont.querySelectorAll(".ticket");
   // console.log(getTickets.length);
   for(let i=0;i<getTickets.length;i++)
   {
      getTickets[i].addEventListener("click",deleting);
   }
}
function deleting()
{
this.remove();
let idTD=this.querySelector('.id');
// console.log(idTD.innerText);
let idx=records.findIndex((obj)=>{
   // console.log(obj.id);
    return obj.id==idTD.innerText;
})
// console.log(idx);
records.splice(idx,1);
 console.log(records);
saveInStorage();
}

function handleColor(){
let list=box.querySelectorAll('.list');
for(let i=0;i<list.length;i++)
{
   // console.log(list[i]);
    list[i].addEventListener("click",(e)=>{
       list[i].classList.remove('list');
       for(let j=0;j<list.length;j++)
       {
          list[j].classList.remove('border');
       }
       

       color=list[i].className;
       console.log(color);
       list[i].classList.add('list');
       list[i].classList.add('border');
   
      //  console.log(list[i]);
    })
}
}
function handleId(){
   return '#' + Math.random().toString(36).substr(2, 9);

}

function saveInStorage()
{
localStorage.setItem("jira_tickets",JSON.stringify(records));
}


let lockvalue=true;
function createTicket(color,id,content){
   
   saveInStorage();
   let ticketCont=document.createElement("div");
   ticketCont.setAttribute('class','ticket');
   
ticketCont.innerHTML=`
    <div class="color" style="background-color:${color}" ></div>
    <div class="id">${id}</div>
    <textarea class="ticket-content" readonly>${content}</textarea>
    <div class=lock_handle>
    <i class="fa-solid fa-lock"></i>
    <i class="fa-solid fa-lock-open"></i>
    </div>
    `;
    
main_cont.append(ticketCont);
let changelockArr=document.querySelectorAll(".id");
console.log("lock length"+changelockArr.length);
// if(changelockArr.length==undefined)
// {
//    prechangecolor();
//    return ;
// }

changelockArr.forEach((obj)=>{
  if(obj.innerText==id)
  {
     let iTag=obj.parentElement.querySelector("i");
     
  iTag.addEventListener("click",changeLock);
  }
});

prechangecolor();

}
 
function changeLock(){
   console.log("lock value "+lockvalue);
if(lockvalue==true)
{
   let parentElem=this.parentElement;
   let elemlock=parentElem.querySelector(".fa-solid.fa-lock");
   elemlock.style.display="none";
   let elemOpen=parentElem.querySelector(".fa-solid.fa-lock-open");
   elemOpen.style.display="flex";

if(box.classList.contains('hidden'))
{
 box.classList.remove('hidden');
 let data=parentElem.parentElement.querySelector(".ticket-content");
//  console.log("A"+data.innerText);
 let checkingHtml=parentElem.parentELement;
console.log(checkingHtml);
 
 let text_content=box.querySelector("textarea");
 text_content.value=data.value;
 let idTU=parentElem.parentElement.querySelector(".id").innerText;
 
 box.addEventListener("keydown", function nextStep(e){

      let key=e.key;
      if(key=="End")
      {
       data.value=text_content.value;
   //records mai change

records.forEach((obj)=>{
if(obj.id==idTU)
{
   obj.content=data.value;
}
})
saveInStorage();
        box.classList.add('hidden');
         elemlock.style.display="flex";
         elemOpen.style.display="none";
         this.removeEventListener("keydown",arguments.callee,false); 
           }
})
}

}
else
{
   let elemlock=this.parentElement.querySelector(".fa-solid.fa-lock");
   elemlock.style.display="flex";
   let elemOpen=this.parentElement.querySelector(".fa-solid.fa-lock-open");
   elemOpen.style.display="none";
   box.classList.add('hidden');
   
}
lockvalue=!lockvalue;
console.log("end lock value "+lockvalue);
}


let head_filter_color=document.querySelectorAll("#head_color");
console.log("elem"+head_filter_color.length);
for(let i=0;i<head_filter_color.length;i++)
{
   console.log(head_filter_color[i]);
    head_filter_color[i].addEventListener("click",filter);
}
function filter()
{
   let className=this.getAttribute("class");
   console.log(className);
   switch(className)
   {
      case "light-pink" :filterList("lightpink");
      break;
      case "light-blue" :filterList("lightblue");
      break;
      case "light-green" :filterList("lightgreen");
      break;
      case "black_" :filterList("black");
      break;
default:console.log("nahi chala");
   }
}

function filterList(color)
{

   console.log("hello");
    main_cont.innerHTML=``;
    console.log(records);
     for(let i=0;i<records.length;i++)
     {
console.log(records[i].color);
console.log(color);
        if(records[i].color==color)
        {console.log("final"+records[i].color);
        
         createTicket(records[i].color,records[i].id,records[i].content);
     }
     }
}

function prechangecolor(){
let ticketArr=document.querySelectorAll(".ticket");
console.log("ticket lenght "+ticketArr.length);
ticketArr.forEach((obj)=>{
   // console.log(obj.innerHTML);
    let block=obj.querySelector(".color")
block.addEventListener("click",changecolor);
});
}


function loadFromStorage(){
   main_cont.innerHTML=``;
//    let html=`<div class="modal-cont hidden">
//    <textarea spellcheck="false" class="content"></textarea>
//    <div  class="side-bar">
//    <div id="panel" class="lightpink list"></div>
//    <div id="panel"  class="lightblue list"></div>
//    <div id="panel"  class="lightgreen list"></div>
//    <div id="panel"  class="black list border"></div>
// </div>
// </div>`;
// main_cont.innerHTML=html;
   records=[];
 records=JSON.parse(localStorage.getItem("jira_tickets"));
if(records==null) return ;
for(let i=0;i<records.length;i++)
{
   createTicket(records[i].color,records[i].id,records[i].content);
}

prechangecolor();

}
back_button.addEventListener("click",(e)=>{
  // aditional feature
   if(box.classList.contains("hidden")==false)
   {
      box.classList.add("hidden");
   }
   loadFromStorage();
})



let i=0;
function changecolor()
{
   console.log('hello');
console.log(i);
if(i==3)
i=-1;
//  let block=this.querySelector(".color")
   this.setAttribute("style",`background-color:${colorArr[++i]}`);
   let idTC=this.parentElement.querySelector(".id").innerText;
   console.log("idTc"+idTC);
  let index= records.findIndex((obj)=>{
    return  obj.id==idTC;
   })
   console.log("index"+index);
   records[index].color=colorArr[i];
   console.log("records color"+records[index].color);
   saveInStorage();

   
   

}