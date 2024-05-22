const loadBookCategory=()=>{
    const parent = document.getElementById("category")
    fetch("http://127.0.0.1:8000/book/categories/")
    .then(res=>res.json())
    .then(data=>{
        data.forEach(category=>{
            const option = document.createElement("option")
            option.innerText = category.name
            option.value = category.id
            parent.appendChild(option);
        })
    })
}


const handleUploadBook = (event)=>{
    event.preventDefault();
    const user_id = localStorage.getItem('user_id')
    if (user_id === 'undefined' || user_id === null){
         window.location.href = "login.html";
      }
      else{
        const token = localStorage.getItem('token');
        const title = getValue("title");
        const description = getValue("description");
        const image = getImageFile("image")
        const author = getValue("author");
        const isbn = getValue("isbn");
        const publication_date = getValue("publication_date");
        const category = getValue("category");
        const info = {
            title,
            description,
            image,  
            author,
            isbn,
            publication_date,
            category
        }
        console.log(info);

        fetch("http://127.0.0.1:8000/book/list/",{
            method: "POST",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info),
        })
        .then(res=>res.json())
        .then(data=>console.log("Sucessfull", data))
        .catch(err=>console.log(err))
      }
    

}

const getImageFile = (id) => {
    const fileInput = document.getElementById(id);
    if (fileInput.files.length > 0) {
        return fileInput.files[0];
    }
    return null;
}


const getValue = (id)=>{
    const value = document.getElementById(id).value;
    return value;
  }

loadBookCategory();