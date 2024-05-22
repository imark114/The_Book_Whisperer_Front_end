const loadBooks=(search)=>{
    document.getElementById("books-container").innerHTML="";
    console.log(search);
    fetch(`http://127.0.0.1:8000/book/list/?search=${search? search: ""}`)
    .then(res=>res.json())
    .then(data=>{
        if (data.length > 0){
            document.getElementById("no_data").style.display="none"
            handleBooks(data)
        }
        else{
            console.log("object");
            document.getElementById("books-container").innerHTML = "";
            document.getElementById("no_data").style.display="flex"
        }
    })
}


const handleBooks = (books)=>{
    console.log(books);
    const parent = document.getElementById("books-container")
    books?.forEach(book=>{
        const div = document.createElement('div')
        div.classList.add("slide-visible")
        div.innerHTML = `
        <div class="card text-center p-3" style="width: 18rem;">
        <img src=${book.image} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text"><strong>Author: </strong><span class="author">${book.author}</span></p>
          <a href="./book_review.html?bookId=${book.id}" class="btn book_btn">See Reviews</a>
        </div>
      </div>
        `
        parent?.appendChild(div)
    })
    
}


const loadCategory=()=>{
    const parent = document.getElementById("drop_category")
    fetch("http://127.0.0.1:8000/book/categories/")
    .then(res=>res.json())
    .then(data=>{
        data.forEach(category=>{
            const li = document.createElement('li')
            li.classList.add('category_li')
            li.innerHTML=`
            <li onclick="loadBooks('${category.name}')"> ${category.name} </li>
            `
            parent.appendChild(li);
        })
    })
}

const handleSearch=(event)=>{
    event.preventDefault();
    const search_book = document.getElementById("search_book").value
    loadBooks(search_book);
}


const handleUserBtn=()=>{
    const signup = document.getElementById("signup_btn")
    const login = document.getElementById("login_btn")
    const logout = document.getElementById("logout_btn")
    const profile = document.querySelector("#profile_btn")
    const user_id = localStorage.getItem('user_id')
      if (user_id === 'undefined' || user_id === null){
        profile?.classList.add("hide_btn");
        logout?.classList.add("hide_btn");
        signup?.classList.remove("hide_btn");
        login?.classList.remove("hide_btn");
        
      }
      else{
        signup?.classList.add("hide_btn");
        login?.classList.add("hide_btn");
        profile?.classList.remove("hide_btn");
        logout?.classList.remove("hide_btn");
      }
}

const handleLogout=()=>{
    const token = localStorage.getItem('token');
    console.log(token);
    fetch("http://127.0.0.1:8000/account/logout/",{
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.status === 200){
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            window.location.reload(true)
        }
    })
    .catch(err => console.log(err))
}

handleUserBtn();
loadBooks();
loadCategory();