document.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("temp_email");
  if (savedEmail) {
    document.getElementById("display-email").innerText = savedEmail;
  }
});

const inputs = document.querySelectorAll(".otp-field");

inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

function validateOTP() {
  let code = "";
  inputs.forEach((input) => (code += input.value));

  if (code === "777777") {
    alert("✅ Email Verified Successfully!");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Invalid OTP! Try 777777.");
  }
}

function resendOTP() {
  alert("A new 6-digit code has been sent to your email.");
}
