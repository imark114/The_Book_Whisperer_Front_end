const param = new URLSearchParams(window.location.search).get('bookId')
const getBookDetail = ()=>{
    fetch(`http://127.0.0.1:8000/book/list/${param}`)
    .then(res=>res.json())
    .then(data=> ShowBookDetails(data))
}
const ShowBookDetails = (book)=>{
    // console.log(book);
    const div = document.getElementById("book_detail")
    div.innerHTML = `
    <div class="book_img">
    <img src="${book.image}" alt="">
</div>
<div class="book_details">
    <h2>${book.title}</h2>
    <p class="author">${book.author}</p>
    <p>${book.description}</p>
    <div class="book_details_more">
        <div class="core_details">
            <h4>First Publish:</h4>
            <p>${book.publication_date}</p>
        </div>
        <div class="core_details">
            <h4>ISBN:</h4>
            <p>${book.isbn}</p>
        </div>
    </div>
</div>
    `
}

const handleGiveRiview=(event)=>{
    event.preventDefault();
    const user_id = localStorage.getItem('user_id')
    if (user_id === 'undefined' || user_id === null){
         window.location.href = "login.html";
      }
    else{
        const token = localStorage.getItem('token');
        const body = document.getElementById('body').value;
        const rating = document.getElementById('rating').value;
        const info = {
            "body": body,
            "rating": rating,
            "reviwer": user_id,
            "book": param
        }
        fetch("http://127.0.0.1:8000/book/reviews/",{
            method:"POST",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res=>res.json())
        .then(data=>window.location.reload(true))
    }
}


const loadBookReviews = ()=>{
    const param = new URLSearchParams(window.location.search).get('bookId')
    fetch(`http://127.0.0.1:8000/book/reviews/?book_id=${param}`)
    .then(res=>res.json())
    .then(data=>showReviews(data))
}



const showReviews = (reviews)=>{
    const parent = document.getElementById("review")
    reviews.forEach(review=>{
        // console.log(review);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="review_section">
        <h5>User Id: ${review.reviwer}</h5>
        <p>${review.body}</p>
        <p>${review.rating}</p>
    </div>
        `
        parent.appendChild(div);
    })
}


getBookDetail();
loadBookReviews();