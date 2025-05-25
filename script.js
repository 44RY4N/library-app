const myLibrary = [];
let totalBooks = 0;
const tbl = document.querySelector("table");


let adder = document.querySelector(".adder");
adder.addEventListener("mouseenter",()=>{
  adder.classList.add("expand");
 // adder.textContent = "sdadasda";
})

adder.addEventListener("mouseleave",()=>{
  adder.classList.remove("expand");
 // adder.textContent = "Add New Book";
})



let bttn = document.querySelector(".btn");
let bin = document.querySelector("#book-name");
let ain = document.querySelector("#author-name");
let pin = document.querySelector("#Npages");
let cin = document.querySelector("#cbox");
bttn.addEventListener("click",(e)=>{

  e.preventDefault();

  let bname = bin.value;
  let aname = ain.value;
  let pnum = pin.value;
  let cstat = cin.checked;


  if(!isOnlyAlphabets(aname)){
  alert("Please Enter Valid Author Name, please try again!...");
  return;
  }

  if(!aname || !bname || !pnum ){
  alert("All Fields are Required, please try again!...");
  return;
  }

  addBookToLibrary(bname, aname, pnum, cstat);

  bname = null;
  aname = null;
  pnum = null;
  cstat = null;

})



function Book(name,author,pages) {
  this.no = ++totalBooks;  
  this.name = name;
  this.author = author;
  this.pages =pages;
  this.id = crypto.randomUUID();

}

function addBookToLibrary(name,author,pages,read) {
    let book = new Book(name,author,pages);
    myLibrary.push(book);

    // creating row element
    let row = document.createElement("tr");


    for (let prop in book){

        let elm = document.createElement("td");
        elm.textContent = book[prop];
        row.appendChild(elm);
    }

    book.readStatus = read;

    // creating chekbox and button
    let action =  document.createElement("td");
    action.classList.add("action");

    let readBox = document.createElement("button");
    
    
   
    
    //functionality to chekbox
      
    if(read){
      readBox.textContent="Read";
      readBox.classList.add("read");
    }
    else{
      readBox.textContent = "Read";
      readBox.classList.add("unread");
    }


    console.log(readBox);
readBox.addEventListener("click",()=>{
  console.log(book.readStatus);
  book.readStatus = !book.readStatus;
})
  readBox.addEventListener("click",(e)=>{
    console.log(e.target.textContent);
    if (e.target.classList.contains("unread"))
      {
    e.target.textContent = "Read";
    e.target.classList.add("read");
    e.target.classList.remove("unread");
  }
  else
  {
    e.target.textContent = "Read";
    e.target.classList.add("unread");
    e.target.classList.remove("read");
  }
    });

    action.appendChild(readBox);

const trashDiv = document.createElement("div");
trashDiv.classList.add("trash");
trashDiv.innerHTML = `<svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"></svg>`;


    //add functionality to trashing

    trashDiv.addEventListener("click",(e)=>{
      let ancest = e.target.closest("tr");
      tbl.removeChild(ancest);
      let childrens =  tbl.children;
      for(let child of childrens){
      child.style.filter = "none";
      }
       tbl.firstElementChild.style.filter = "none";
       e.target.style.filter = "none";
    })







action.appendChild(trashDiv);

    row.appendChild(action);





    row.addEventListener("mouseenter",(e)=>{
       let childrens =  tbl.children;
       for(let child of childrens){
        if(e.target == "thead") return;
        child.style.filter = "blur(2px)";
       }
       tbl.firstElementChild.style.filter = "none";
        e.target.style.filter = "none";
    })

    row.addEventListener("mouseleave",(e)=>{
      let childrens =  tbl.children;
      for(let child of childrens){
      child.style.filter = "none";
      }
       tbl.firstElementChild.style.filter = "none";
       e.target.style.filter = "none";

    })




    tbl.appendChild(row);

    //add functionality to trashing




}


function isOnlyAlphabets(str) {
  return /^[A-Za-z]+$/.test(str);
}



// Test Sample

addBookToLibrary("myBook","me","111",false);
addBookToLibrary("myBook","me","111",false);
addBookToLibrary("myBook","me","111",false);




