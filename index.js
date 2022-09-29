var pos=0;
var taskInput=document.getElementsByClassName("input");
var addTaskBtn=document.getElementsByClassName("addButton")[0];
var taskscontainer=document.getElementsByClassName("container")[0];

addTaskBtn.addEventListener("click",addTask)

window.addEventListener("load",()=>
{
    let storgedata=[];
    storgedata=JSON.parse(localStorage.getItem("bookmarkstabsNew"));
    console.log("storgedata"+storgedata)
    if(storgedata!=null)
    storgedata.forEach(element => {
        let listItemtemp=createNewTaskElement(element.bname,element.burl);
        taskscontainer.appendChild(listItemtemp);
        bindTaskEvents(listItemtemp);
    });
});

function createNewTaskElement(bname,burl){


	var listItem=document.createElement("li");
    listItem.className="item"
    

    var divcontainer=document.createElement("div");
    divcontainer.className="itemDetails";


    var labelname=document.createElement("label");//label
    var labelurl=document.createElement("label");//label

	var deleteButton=document.createElement("button");//delete button

    var visitButton=document.createElement("button");//visit button

	deleteButton.innerText="Delete";
	deleteButton.className="delete";

    visitButton.innerText="Visit";
	visitButton.className="visit";
    
    labelname.innerText=bname;
    labelurl.innerText=burl;

    labelname.className="bname";
    labelurl.className="burl";

    divcontainer.appendChild(labelname);
    divcontainer.appendChild(labelurl);
    divcontainer.appendChild(visitButton);
    divcontainer.appendChild(deleteButton);
	listItem.appendChild(divcontainer);

	
	return listItem;
}

function addTask(){
	console.log("Add bookmark...");
    var bookmarkslist=[];
    let bname=taskInput[0].value;
    let burl=taskInput[1].value;
    let bookmarkrecord={"bname":bname,"burl":burl}
    let strobj=JSON.parse(localStorage.getItem("bookmarkstabsNew"))
    if(strobj!=null)
    {
        strobj.forEach(element => {
            bookmarkslist.push(element);
        });
        bookmarkslist.push(bookmarkrecord);
    }
    else
    {   
        bookmarkslist.push(bookmarkrecord);
    }
    console.log("bookmarkslist"+bookmarkslist)

    localStorage.setItem("bookmarkstabsNew", JSON.stringify(bookmarkslist));
    
    var listItem=createNewTaskElement(bname,burl);
	taskscontainer.appendChild(listItem);
	bindTaskEvents(listItem);
    taskInput[0].value="";
    taskInput[1].value="";
 }

function bindTaskEvents(taskListItem){
	console.log("bind list item events");
	var deleteButton=taskListItem.querySelector("button.delete");
    var visitButton=taskListItem.querySelector("button.visit");
    deleteButton.onclick=deleteTask;
    visitButton.onclick=viewTask;
}

   
function deleteTask(){
    console.log("Delete task...");
    var listItem=this.parentNode;
    
    var bnameval=listItem.querySelector("label.bname");
    console.log("bnameval"+bnameval.innerText)
    let storgedata1=[];
    let tempstorage=[];
    storgedata1=JSON.parse(localStorage.getItem("bookmarkstabsNew"));
    console.log("storgedata1"+storgedata1.length);
    storgedata1.forEach((element,index) => {
        if(bnameval.innerText!=element.bname)
         tempstorage.push(element)
    });
    localStorage.setItem("bookmarkstabsNew", JSON.stringify(tempstorage));
    taskscontainer.removeChild(listItem.parentNode);
    
}

function viewTask() {
    console.log("view task...");
    var listItem=this.parentNode;
    
    var burlval=listItem.querySelector("label.burl");
    console.log("burl"+burlval.innerText)
    window.open(burlval.innerText)
    
}