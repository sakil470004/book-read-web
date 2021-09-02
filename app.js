//fetch data from api
const searchData = (searchText) => {
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => showData(data));
  };
  
  //show founded data to UI
  const showData = (data) => {
    if (data.numFound) {
        //showing how many search result get by api calling . always < 0
      const resultNumber = document.getElementById("result-number");
      resultNumber.innerText = data.numFound;
  
      //data load successfuly so stop spinner 
      spinnerToggle("block");
  
      //get container to show data
      const container = document.getElementById("container");
  
      //show all data using forEach
      data.docs.forEach((value) => {
       
        const div = document.createElement("div");
        div.classList.add("box");
        div.classList.add("zone");
  
        //image dynamic url if not set defult one
        let url;
        if (value.cover_i) {
          url = `https://covers.openlibrary.org/b/id/${value.cover_i}-M.jpg`;
        } else {
          url = `https://openlibrary.org/images/icons/avatar_book-sm.png`;
        }
  
        //set all value from api and append to main section
        div.innerHTML = `
          
              <img src= ${url} class=""  />
              <div class="card-body">
                  <h5 class="card-title ">${value.title}</h5>
                  <p class="card-text">
                     <span class="">Author : ${value.author_name ? value.author_name : ""}</span>
                   </p>
                  <p class="fs-5">Publisher : ${value.publisher}</p>
             
                  <p>First published in ${
                    value.first_publish_year ? value.first_publish_year : ""
                  }</p>
             </div>
          `;
        container.appendChild(div);
      });
    } else {
        //display no data found messege if there is no data and also stop spinning 
      // errorMessege("block");
      spinnerToggle("none");
    }
  };
  
  //get search value and pass to api calling function
  const getSearchText = () => {
  
    //start spinner and stop error messege if any
    spinnerToggle("block");
    // errorMessege("none");
    const inputField = document.getElementById("inputbox");
    const inputText = inputField.value;
    
    //pass data to api
    searchData(inputText);
    // console.log(searchData(inputText))
    inputField.value = "";
  
    //clear previous data
    const container = document.getElementById("container");
    container.textContent = "";
    const resultNumber = document.getElementById("result-number");
    resultNumber.innerText = "";
  };
  
  //result toggle
  const spinnerToggle = (displayStyle) => {
    document.getElementById("result-num-id").style.display = displayStyle;
  };
  
