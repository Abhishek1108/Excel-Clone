let topRow=document.querySelector(".top-row");
let leftCol=document.querySelector(".left-col");
let topLeftCell=document.querySelector(".top-left-cell");
let cells=document.querySelector(".cells");
let addressCell=document.querySelector(".address");
let allcell=document.querySelectorAll(".cell");
let formulaInput=document.querySelector("#formula");
let allleftColCell=document.querySelectorAll(".left-col-cell");
let alltopRowCell=document.querySelectorAll(".top-row-cell");
// console.log(formulaInput);


cellContent.addEventListener("scroll",function(e){
let top=e.target.scrollTop;
let left=e.target.scrollLeft;
    topRow.style.top=top+"px";
    leftCol.style.left=left+"px";
    topLeftCell.style.top=top+"px";
    topLeftCell.style.left=left+"px";
})

let rowid;
let colid;
let lastSelectedCell;

//set the content of top-left-cell
cells.addEventListener("click",function(e){
    let currentCell=e.target;
     rowid=Number(currentCell.getAttribute("rowId"));
     colid=Number(currentCell.getAttribute("colId"));

    let address=String.fromCharCode(colid+65)+(rowid+1)+"";
   // console.log(address);
   addressCell.textContent=address;
 let cellObj=db[rowid][colid];
   setMenuOptions(cellObj);
    
})
//add border on the selected cell
for(let i=0;i<allcell.length;i++){
    allcell[i].addEventListener("click",function(e){
        //get the row id and colid of the selected cell and 
        let rowid=e.target.getAttribute("rowId");
        let colid=Number(e.target.getAttribute("colId"));
        allleftColCell[rowid].style.height=e.target.offsetHeight;
        
          let currentCellObj=db[rowid][colid];
          formulaInput.value="";
          
          if(currentCellObj.formula){
              formulaInput.value=currentCellObj.formula;
          }
          //change  color of SELECTED left-col cell and top-row cell
          for(let l=0;l<alltopRowCell.length;l++){
            if(alltopRowCell[l].classList.contains("active-col-cell")){
              alltopRowCell[l].classList.remove("active-col-cell");
            }
        }
        alltopRowCell[colid].classList.add("active-col-cell");
          for(let k=0;k<allleftColCell.length;k++){
              if(allleftColCell[k].classList.contains("active-row-cell")){
                allleftColCell[k].classList.remove("active-row-cell");
              }
          }
         allleftColCell[rowid].classList.add("active-row-cell"); 
         
          //apply border around selected cell
        let currentCell=e.target;
        for(let j=0;j<allcell.length;j++){
            if(allcell[j].classList.contains("active")){
                allcell[j].classList.remove("active");
            }
        }
       
        
        e.target.classList.add("active");
        
    })
}
//add blur event on all cell and get the value of cell from DOM and set it on Db
for(let i=0;i<allcell.length;i++){
    allcell[i].addEventListener("blur",function(e){
        let currElement=e.target;
        lastSelectedCell=currElement;
        let cellValue=currElement.textContent;
       let currentCellObj=db[rowid][colid];
       
       if(cellValue!=currentCellObj.value){
           if(currentCellObj.formula){
            
            deleteFormula(currentCellObj);

           }
        currentCellObj.value=cellValue;
        //console.log(currentCellObj);
         updateChildrens(currentCellObj);
       }
       //console.log(currentCellObj);
      
    })
    allcell[i].addEventListener("keyup",function(e){
      let{height}=e.target.getBoundingClientRect();
      let rowid=e.target.getAttribute("rowId");
      allleftColCell[rowid].style.height=height+"px";
    })
}
//get the formula from input field and solve it get the solved value set it in UI and set in DB
formulaInput.addEventListener("blur",function(e){

    let formula=formulaInput.value;
    if(formula&&lastSelectedCell){
        let cellObject=db[rowid][colid];

        if(cellObject.formula!=formula){
          if(cellObject.formula){
             deleteFormula(cellObject);
          }
          let  solvedValue= solveFormula(formula,cellObject);
          //save this value in ui
         lastSelectedCell.textContent=solvedValue;
         formulaInput.value=" ";
          //save this value in db
          //B1 cellobj
          cellObject.value=solvedValue;
          cellObject.formula=formula;
          updateChildrens(cellObject);
        }
      
 
    } 
    
})