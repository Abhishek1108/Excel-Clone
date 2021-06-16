let bold=document.querySelector(".font-bold");
let italic=document.querySelector(".font-italic");
let underline=document.querySelector(".font-underline");
let alignLeft=document.querySelector(".text-align-left");
let alignCenter=document.querySelector(".text-align-center");
let alignRight=document.querySelector(".text-align-right");
let fontType=document.querySelector("#type");
let fontSize=document.querySelector("#size");

let fontObj={Comfortaa:"'Comfortaa', cursive",Comic:"'Comic Neue', cursive",
Garamond:"'EB Garamond', serif",Goblin:"'Goblin One', cursiv"
,Caveat:"'Caveat', cursive",Lobster:"'Lobster', cursive",Lora:"'Lora', serif",
Nunito:"'Nunito', sans-serif"}

bold.addEventListener("click",function(e){
    let cellobj=db[rowid][colid];
    if(cellobj.fontStyle.bold){
     lastSelectedCell.style.fontWeight="normal";
     bold.classList.remove("active-style-option");
    }else{
     lastSelectedCell.style.fontWeight="bold";
     bold.classList.add("active-style-option");
    }
    cellobj.fontStyle.bold=!cellobj.fontStyle.bold;

})
italic.addEventListener("click",function(e){
    
    let cellobj=db[rowid][colid];
    if(cellobj.fontStyle.italic){
     lastSelectedCell.style.fontStyle="normal";
     italic.classList.remove("active-style-option");
    }else{
     lastSelectedCell.style.fontStyle="italic";
     italic.classList.add("active-style-option");
    }
    cellobj.fontStyle.italic=!cellobj.fontStyle.italic;
})
underline.addEventListener("click",function(e){
    
    let cellobj=db[rowid][colid];
    if(cellobj.fontStyle.underline){
     lastSelectedCell.style.textDecoration="none";
     underline.classList.remove("active-style-option");
    }else{
     lastSelectedCell.style.textDecoration="underline";
     underline.classList.add("active-style-option");
    }
    cellobj.fontStyle.underline=!cellobj.fontStyle.underline;
})
alignLeft.addEventListener("click",function(e){

    let cellObj=db[rowid][colid];
    if(cellObj.textAlignment=="left"){
        return ;
    }
    lastSelectedCell.style.textAlign="left";
    cellObj.textAlignment="left";
    setMenuOptions(cellObj);

})
alignCenter.addEventListener("click",function(e){
    let cellObj=db[rowid][colid];
    if(cellObj.textAlignment=="center"){
        return ;
    }
    lastSelectedCell.style.textAlign="center";
    cellObj.textAlignment="center";
    setMenuOptions(cellObj);
    
})
alignRight.addEventListener("click",function(e){
    let cellObj=db[rowid][colid];
    if(cellObj.textAlignment=="right"){
        return ;
    }
    lastSelectedCell.style.textAlign="right";
    cellObj.textAlignment="right";
    setMenuOptions(cellObj);
    
})
fontType.addEventListener("change",changeFontType);
fontSize.addEventListener("change",changeFontSize);
function initMenu(){
    bold.classList.remove("active-style-option");
    italic.classList.remove("active-style-option");
    underline.classList.remove("active-style-option");
    alignLeft.classList.remove("active-style-option");
    alignCenter.classList.remove("active-style-option");
    alignRight.classList.remove("active-style-option");
}
function setMenuOptions(cellObject){
    // for bold italic underline
    cellObject.fontStyle.bold ? bold.classList.add("active-style-option"):bold.classList.remove("active-style-option");
    cellObject.fontStyle.italic ? italic.classList.add("active-style-option"):italic.classList.remove("active-style-option");
    cellObject.fontStyle.underline ? underline.classList.add("active-style-option"):underline.classList.remove("active-style-option");
    //for right left center alignment

    // cellObject.textAlignment.left ?alignLeft.classList.add("active-style-option"):alignLeft.classList.remove("active-style-opiton");
    // cellObject.textAlignment.center ?alignCenter.classList.add("active-style-option"):alignCenter.classList.remove("active-style-opiton");
    // cellObject.textAlignment.right ?alignRight.classList.add("active-style-option"):alignRight.classList.remove("active-style-opiton");
    let alignment=cellObject.textAlignment;
    if(document.querySelector(".text-alignment-action .active-style-option")){
        document.querySelector(".text-alignment-action .active-style-option").classList.remove("active-style-option");
    }
    
    if(alignment=="left"){

         alignLeft.classList.add("active-style-option");

    }else if(alignment=="center"){

         alignCenter.classList.add("active-style-option");

    }else {

          alignRight.classList.add("active-style-option");
    }

}
function changeFontType(e){
    //Change in UI
    let changedType=fontType.value;
    if(changedType){
        lastSelectedCell.style.fontFamily=fontObj[changedType];
    }
   // Change in Db
    let rowid=lastSelectedCell.getAttribute("rowId");
    let colid=lastSelectedCell.getAttribute("colId");
    
    let cellObj=db[rowid][colid];
    cellObj.fontFamily=changedType;
    //console.log(cellObj.fontFamily);
}
function changeFontSize(e){
let chnagedSize=fontSize.value;
//change in ui
if(chnagedSize){
    lastSelectedCell.style.fontSize=chnagedSize+"px";
}
//change in db
let rowid=lastSelectedCell.getAttribute("rowId");
let colid=lastSelectedCell.getAttribute("colId");
// console.log(rowid+" "+colid);

let cellObj=db[rowid][colid];
cellObj.fontSize=chnagedSize;

}

