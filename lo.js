function togglePassword() {
    const passwordField = document.getElementById("password");
    const type = passwordField.getAttribute("type");
    passwordField.setAttribute("type", type === "password" ? "text" : "password");
  }
  
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    const message = document.getElementById("message");
  
    if (email === "" || password === "") {
      message.textContent = "Please fill in all fields.";
    } else if (!email.includes("@")) {
      message.textContent = "Please enter a valid email.";
    } else if (password.length < 6) {
      message.textContent = "Password must be at least 6 characters.";
    } else {
      message.style.color = "green";
      message.textContent = "Login successful! (Demo only)";
      // Here you can redirect or trigger backend logic
    }
  });
  