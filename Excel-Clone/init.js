let cellContent=document.querySelector(".cells-content");
 
 
(function(){
 
    //top-left-cell
   // let cellContentHtml='<div class="top-left-cell"></div>';
    let cellContentHtml = '<div class="top-left-cell"></div>';

    //top-row
   cellContentHtml +='<div class="top-row">';
    for(let i=0;i<26;i++){
        // 0=>A
        //i+65
        cellContentHtml+=`<div class="top-row-cell" cid="${i}">${String.fromCharCode(i+65)}</div>`;
      //  `<div class="top-row-cell">${String.fromCharCode(65+i)}</div>`

    }
    cellContentHtml+='</div>';

    //left coloumn
     cellContentHtml+='<div class="left-col">'
     for(let i=0;i<100;i++){
         cellContentHtml+=`<div class="left-col-cell" rid="${i}">${i+1}</div>`;
     }
     cellContentHtml+='</div>';

   // cells
    cellContentHtml+='<div class="cells">'
    for(let i=0;i<100;i++){
       cellContentHtml +='<div class="row">';
        for(let j=0;j<26;j++){
           cellContentHtml +=`<div class="cell" rowId="${i}" colId="${j}" contentEditable="true" > </div>`
        }
        cellContentHtml +='</div>';
    }
    cellContentHtml +='</div>';

    cellContent.innerHTML=cellContentHtml;
})();
// initcells();
let sheetsDB=[];
let db;
function initDB(){

  newDb=[];

for(let i=0;i<100;i++){
  let row=[];

 for(let j=0;j<26;j++){
  let address=String.fromCharCode(j+65)+(i)+"";
  let cellObject={
    name:address,
    value:"",
    formula:"",
    childrens:[],
    parents:[],
    fontStyle:{bold:false,italic:false,underline:false},
    textAlignment:"left",
    fontFamily:"Arial",
    fontSize:"16",
  }
  row.push(cellObject);
 }
newDb.push(row);
}
db=newDb;
sheetsDB.push(newDb);
//console.log(sheetsDB);

}
initDB();