let addSheet=document.querySelector(".add-sheet");
let sheetList=document.querySelector(".sheets-list");
let deleteSheet=document.querySelectorAll("#sheet-delete");
//let allleftColCell=document.querySelectorAll(".left-col-cell");



let sheetCount=0;
addSheet.addEventListener("click",handleAddSheet)
sheetList.addEventListener("click",handleSheetSwitch);

function handleAddSheet(e){

    sheetCount++;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    let sheet=document.createElement("div");
    sheet.classList.add("sheet");
    sheet.classList.add("active-sheet");
    sheet.setAttribute("sid",sheetCount);
    sheet.textContent=`Sheet${sheetCount+1}`;
    // let str=`Sheet${sheetCount+1} <select name="" id="sheet-delete">
    // <option value="">Delete Sheet</option>
    // </select>`;
    // sheet.innerHTML=" "+str;

    sheetList.append(sheet);
    removeLastSelectedCellBorder();

    removelastSelectedTopRowCellAndCol();

    initDB();
    initMenu();
    initUi();
}
 function handleSheetSwitch(e){
        let selectedSheet=e.target;
       // console.log(e.target);
        if(selectedSheet.classList.contains("active-sheet")){
            return;
        }
        document.querySelector(".active-sheet").classList.remove("active-sheet");
        selectedSheet.classList.add("active-sheet");

        //set db;
        let selectedSheetid=selectedSheet.getAttribute("sid");
         db=sheetsDB[selectedSheetid];
        // removeLastSelectedCellBorder();

        // set ui
          setUI();
       
}
function initUi(){

    for(let i=0;i<allcell.length;i++){
        allcell[i].textContent="";
        allcell[i].style="";
    }
     //set the height of lastSelected left col cell to normal 
     for(let i=0;i<allleftColCell.length;i++){
        let rid=allleftColCell[i].getAttribute("rid");
        let corespondingleftColcell=document.querySelector(`div[rid="${rid}"]`);
        corespondingleftColcell.style.height=23+"px";
     }
    
}
//we can optimse this by maintaning a visited cell
//then we just need to empty the content of cell which are visited
function setUI(){
   
    removelastSelectedTopRowCellAndCol();
    for(let i=0;i<allcell.length;i++){
        //remove the border of lastSelectedcell
         lastSelectedCell.classList.remove("active");


         //set the value of cell
        let rowid=allcell[i].getAttribute("rowID");
        let colid=allcell[i].getAttribute("colID");
        
        let cellObj=db[rowid][colid];
       
        allcell[i].textContent=cellObj.value;

        
        // set the fontStyle weight text Decoration
        allcell[i].style.fontWeight=cellObj.fontStyle.bold ? "bold":"normal";
        allcell[i].style.fontStyle=cellObj.fontStyle.italic ? "italic":"normal";
        allcell[i].style.textDecoration=cellObj.fontStyle.underline ? "underline":"none";
        allcell[i].style.textAlign=db[rowid][colid].textAlignment;
        allcell[i].style.fontSize=cellObj.fontSize+"px";
        allcell[i].style.fontFamily=cellObj.fontFamily;

      //  for(let i=0;i<allleftColCell.length;i++){
        //     let rid=allleftColCell[0].getAttribute("rid");
        //     let cid=0;
        //    let corespondingCell=document.querySelector(`div[rowId="${rid}"][colId="${cid}"]`);
        //    console.log(corespondingCell.style.scrollHeight);
        //      let {minHeight}=corespondingCell.getBoundingClientRect();
        //      allleftColCell[i].style.height=minHeight;

       // }
        
             
    }

}
function removeLastSelectedCellBorder(){

    lastSelectedCell.classList.remove("active");
}
function removelastSelectedTopRowCellAndCol(){

    
    // for(let l=0;l<alltopRowCell.length;l++){
    //     if(alltopRowCell[l].classList.contains("active-col-cell")){
    //       alltopRowCell[l].classList.remove("active-col-cell");
    //     }
    // }
    //   for(let k=0;k<allleftColCell.length;k++){
    //       if(allleftColCell[k].classList.contains("active-row-cell")){
    //         allleftColCell[k].classList.remove("active-row-cell");
    //       }
    //   }

    //Optimise version of above code
    let rowid=lastSelectedCell.getAttribute("rowId");
    let colid=lastSelectedCell.getAttribute("colId");

    let lastSelectedleftColcell=document.querySelector(`div[rid="${rowid}"]`);
    let lastSelectedTopRowcell=document.querySelector(`div[cid="${colid}"]`);
    lastSelectedTopRowcell.classList.remove("active-col-cell");
    lastSelectedleftColcell.classList.remove("active-row-cell");
}

