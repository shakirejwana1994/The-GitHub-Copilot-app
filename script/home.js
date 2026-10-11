console.log("comming")
let currentTab ='all';
let allIssues = [];
let filteredIssues =[];

const tabActive =['bg-blue-400'];
const tabInactive =['bg-transparent','border-gray-300','text-black'];


const issueContainer=document.getElementById("issue-container");
const loadingSpinner=document.getElementById("loading-spinner");
const issueCount=document.getElementById("issue-count");
const searchInput = document.getElementById("search-btn");


function switchTab(tab){
  const tabs = ['all','open','closed'];
  currentTab = tab;
  for (const t of tabs){
    const tabName = document.getElementById ('tab-' +t);
    if(t === tab){
      tabName.classList.remove(...tabInactive);
      tabName.classList.add(...tabActive);
      
    }else{
       tabName.classList.add(...tabInactive);
      tabName.classList.remove(...tabActive);
    }
  }

  if (tab ==="all") {
    displayIssues(allIssues);
    
  }else{
    const filteredIssues =allIssues.filter(
      (issue)=>issue.status === tab
    );
    displayIssues(filteredIssues);
  }
 
}
function showLoading(){
    loadingSpinner.classList.remove("hidden");
    issueContainer.innerHTML="";
    

}
function hideLoading(){
     loadingSpinner.classList.add("hidden");
}
async function loadCategories(){
   showLoading();
 const res= await  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json();
allIssues = data.data;
filteredIssues= allIssues;
hideLoading();
displayIssues(allIssues);
  console.log(data);
}
async function searchIssue() {
  showLoading();
  const searchText = searchInput.value .trim();
  if (searchText===""){
    displayIssues(allIssues);
    return;
  }
  showLoading();
  const res = await fetch(
    ` https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchText)}`
  );
  const data = await res.json();
  hideLoading();
  filteredIssues = data.data;
  switchTab(currentTab);
  hideLoading();
  displayIssues(data.data);

  
}
async function loadSingleIssue(id) {
  const res = await fetch(
   `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  );
   
  const data = await res.json();
  console .log(data);

 showIssueModal(data.data);
}
function  showIssueModal(issue){
  const modal = document .getElementById("issue-modal");
  const modalContent  = document .getElementById("modal-content");

   const labelsHTML =issue.labels.map((label)=>{
      if(label === "bug"){
         return`
       <div  class=" badge badge-soft badge-secondary">
        ${label}
       </div>  
       
       `;

      }
      if(label === "help wanted" ){
         return`
       <div  class=" badge badge-soft badge-warning">
        ${label}
       </div>  
       `;
      }
      if(label === "good first issue"){
         return`
       <div  class=" badge badge-soft badge-info">
        ${label}
       </div>  
       `;
      }
      if(label === "documentation"){
         return`
       <div  class="badge badge-soft badge-primary">
        ${label}
       </div>  
       `;
      }
      
         return`
       <div  class="badge badge-soft badge-accent">
        ${label}
       </div>  
       `;
      
       }).join("");
  modalContent.innerHTML=`
  
    <div class="flex  gap-2 mt-2 text-sm  text-gray-400 ">
     <p class=" bg-green-600 text-white rounded-full  px-2">${issue.status} </p>
     <p> . opend by ${issue.author} . ${issue.createdAt} 
    </p>
     
     </div>
      <div class=" px-1 py-1 mt-2 rounded-md" >${labelsHTML}</div>  
     <div class="text-gray-400 text-sm mt-4"> ${issue.description}</div>  

    
     <div class="bg-slate-100 text-sm mt-4 px-4 py-2 rounded-md">
      <div> 
    <p class="text-gray-400 text-sm flex justify-between "> 
     <strong>Assignee:</strong>
     <strong>priority:</strong> 
     </p>  </div>
    
     <div  class=" flex justify-between mt-2"> 
     <p class="font-bold ">${issue.assignee} 
      </p>
     <p class="badge badge-soft badge-error rounded-sm py-1 px-1  ">
     ${issue.priority} </p>
      </div>           
                   
    </div>           
      
      `;
      modal.classList.remove("hidden")

                 
   document.getElementById("modal-title").textContent = issue.title;
    
    modal.showModal();
};
function displayIssues (issues){
  issueContainer.innerHTML ="";
  issueCount.textContent=issues.length;

  
issues.forEach((issue) => {
  

  
   
    let statusIcon="";
    let statusBorder= "";
    let priorityClass="";  
     

     if (issue.status==="open") {
     statusIcon ="./assets/Open-status.png";
      statusBorder = "border-t-3   border-green-500"
     }else if (issue.status === "closed") {
      statusIcon ="./assets/Closed- Status .png";
      statusBorder = "border-t-3  border-purple-500" 
       
     }

     
     if (issue.priority ==="high") {
     priorityClass ="badge badge-soft badge-secondary";
      
     }else if (issue.priority === "medium") {
     priorityClass =" badge badge-soft badge-warning";
       
     } else if (issue.priority === "low") {
     priorityClass ="badge badge-soft badge-primary";
       
     }
     

const div= document.createElement("div");
    
    div.className=`
    bg-white p-4 md:p-6 rounded-lg shadow ${statusBorder}
    `;


     const labelsHTML =issue.labels.map((label)=>{
      if(label === "bug"){
         return`
       <div  class=" badge badge-soft badge-secondary">
        ${label}
       </div>  
       
       `;

      }
      if(label === "help wanted"){
         return`
       <div  class=" badge badge-soft badge-warning">
        ${label}
       </div>  
       `;
      }
      if(label === "good first issue"){
         return`
       <div  class=" badge badge-soft badge-info">
        ${label}
       </div>  
       `;
      }
      if(label === "documentation"){
         return`
       <div  class="badge badge-soft badge-primary">
        ${label}
       </div>  
       `;
      }
      
         return`
       <div  class=" badge badge-soft badge-accent">
        ${label}
       </div>  
       `;
      
       }).join("");
  
   

    div.innerHTML=`
    
           
            <div class=" flex justify-between items-center mb-2 ">
             <img  src="${statusIcon}" alt="${issue.status}">
             
           <p class="${priorityClass} rounded-md text-sm  ">${issue.priority  } </p>
            </div>   

    <h2 class=" text-sm  md:text-base font-medium  ">
    ${issue.title} </h2>
    <p class="line-clamp-2 text-gray-400 text-sm mt-2">${issue.description} </p>
    <p class="hidden mt-3">${issue.status} </p>
     <div class="flex gap-1 mt-2  ">
     ${labelsHTML}
     </div>  
       
            <div class="mt-4 text-sm">
       <p class=" line-clamp-2 text-gray-400 mt-2">${issue.author}  </p>
       <p class=" text-gray-400 mt-2">${issue.updatedAt} </p>
        </div>  

    `;
    issueContainer.appendChild(div);
    
    div .addEventListener("click",() =>{

      if (currentTab === "open" || currentTab === "closed") {
       loadSingleIssue(issue.id);        
      }
    })
    console.log(issue);


    
});
}
searchInput.addEventListener("keydown",(event)=>{
  if(event.key ==="Enter"){
    searchIssue();

  }
});
loadCategories();
