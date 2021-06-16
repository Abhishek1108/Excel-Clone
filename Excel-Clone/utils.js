function solveFormula(formula,selfcellobj){
  let formulaComp=formula.split(" ");

  for(let i=0;i<formulaComp.length;i++){
      let fcomp=formulaComp[i];

      if(fcomp[0]>="A"&&fcomp[0]<="Z"){
        
        
          
    let{rowid,colid}=getRowidAndColid(fcomp);
    
          let cellObject=db[rowid][colid];
          //ADD CHILDREN IN cellObj of A1 and A2; 
          if(selfcellobj){
            cellObject.childrens.push(selfcellobj.name);
            selfcellobj.parents.push(fcomp);
          }
      
         // console.log(cellObject);
          let value=cellObject.value;
           formula=formula.replace(fcomp,value);
      }
  }
  
  let value=eval(formula);
  // console.log(value);
  return value;
}

function getRowidAndColid(address){

    let colid=address.charCodeAt(0)-65;
    let rowid=Number(address.substring(1))-1;

    return {rowid,colid};


}
function updateChildrens(cellObject){

  for(let i=0;i<cellObject.childrens.length;i++){
    let childName=cellObject.childrens[i];
    let{rowid,colid}=getRowidAndColid(childName);
    //CELLOBJ OF B1 
    let childrenCellObj=db[rowid][colid];
    let newValue=solveFormula(childrenCellObj.formula);
    //B1-> dp update
     childrenCellObj.value=newValue;
    //B1-> UI update
    document.querySelector(`div[rowId="${rowid}"][colId="${colid}"]`).textContent=newValue;
     updateChildrens(childrenCellObj);
  }
}

function deleteFormula(cellObj){

  cellObj.formula="";
  
for(let i=0;i<cellObj.parents.length;i++){
  // A1, A2

  let parentName=cellObj.parents[i];
  let{rowid,colid}=getRowidAndColid(parentName);
  let parentCellObj=db[rowid][colid];

  let filteredChildren=parentCellObj.childrens.filter(children =>{
    return children!=cellObj.name;
  });

  parentCellObj.childrens=filteredChildren;

}
 cellObj.parents=[];
 //console.log(cellObj);
 
}