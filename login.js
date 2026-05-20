document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const emailInput = document.getElementById("email").value;

  const emailPattern = /^[^\s@]+@chitkara\.edu\.in$/;

  if (!emailPattern.test(emailInput)) {
    alert("❌ Invalid Email! Please enter a valid university email address.");
  } else {
    localStorage.setItem("temp_email", emailInput);
    window.location.href = "otp_verify.html";
  }
});
