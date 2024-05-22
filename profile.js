const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token');
const laodUserData=()=>{
    const Tbody = document.getElementById("review_table")
    const span  = document.getElementById("count");
    let count = 0;
    fetch("http://127.0.0.1:8000/account/profile/",{
      headers:{
        'Authorization': `Token ${token}`,
      }
    })
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("u_first_name").value = data.first_name;
        document.getElementById("u_last_name").value = data.last_name;
        document.getElementById("u_email").value = data.email;
        span.innerText = data.reviews.length ? data.reviews.length : '0';
        data.reviews.forEach(item=>{
            console.log(item);
            count++;
            const tr = document.createElement("tr")
            tr.innerHTML = `
            <th scope="row">${count}</th>
            <td>${item.book}</td>
            <td>${item.created_on}</td>
            <td>${item.rating}</td>
            `
            Tbody.appendChild(tr);
        })
    })
  }

const updateProfile = (event)=>{
    event.preventDefault();
    const success = document.getElementById("u_success")
    const first_name = getValue("u_first_name");
    const last_name = getValue("u_last_name");
    const email = getValue("u_email");
    const info = {
        first_name,
        last_name,
        email
    }
    fetch("http://127.0.0.1:8000/account/profile/",{
        method:"PATCH",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        body: JSON.stringify(info),
    })
    .then(res=>res.json())
    .then(data=> success.innerText="Updated Successfully");
}


const getValue = (id)=>{
    const value = document.getElementById(id).value;
    return value;
  }

laodUserData();
