const handleRegistration = (event) => {
    event.preventDefault();
    const error = document.getElementById("error");
    const success = document.getElementById("success");
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };
    if (password === confirm_password) {
      error.innerText = "";
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          password
        )
      ) {
        fetch("http://127.0.0.1:8000/account/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => (success.innerText = data))
          .catch((err) => console.log(err));
      } else {
        success.innerText = "";
        error.innerText =
          "Password Must Contain:\n 8 character, at least one letter both uppercase and lowercase one number, one special symbol.";
      }
    } else {
      success.innerText = "";
      // alert("Password Didn't match");
      error.innerText = "Password Didn't match with Confirm Password";
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login_username");
    const password = getValue("login_password");
    const error = document.getElementById("login_error");
    fetch("http://127.0.0.1:8000/account/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json()) 
      .then((data) => {
        if (data.error){
          error.innerText = data.error
        }
        else{
          error.innerText = ""
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "index.html";
          
        }
      })
      .catch((err) => console.log(err));
  };

  const getValue = (id)=>{
    const value = document.getElementById(id).value;
    return value;
  }

  