// auth.js
const signupForm = document.getElementById("signup-form");
const otpForm = document.getElementById("otp-form");
const loginForm = document.getElementById("login-form");

const otpHeader = document.getElementById("otp-header");
const loginHeader = document.getElementById("login-header");

const otpToSignup = document.getElementById("otp-to-signup");
const loginToSignup = document.getElementById("login-to-signup");

const home = document.getElementById("home");
const userInfo = document.getElementById("user-info");

let activationToken = "";

function showSignupForm() {
  signupForm.classList.remove("hidden");
  otpHeader.classList.add("hidden");
  otpForm.classList.add("hidden");
  loginHeader.classList.add("hidden");
  loginForm.classList.add("hidden");
  otpToSignup.classList.add("hidden");
  loginToSignup.classList.add("hidden");
}

function showOtpForm() {
  signupForm.classList.add("hidden");
  otpHeader.classList.remove("hidden");
  otpForm.classList.remove("hidden");
  otpToSignup.classList.remove("hidden");
}

function showLoginForm() {
  signupForm.classList.add("hidden");
  otpHeader.classList.add("hidden");
  otpForm.classList.add("hidden");
  loginHeader.classList.remove("hidden");
  loginForm.classList.remove("hidden");
  loginToSignup.classList.remove("hidden");
}

function showHome(name, email) {
  home.classList.remove("hidden");
  userInfo.innerText = `Welcome, ${name} ${email}`;
  document.getElementById("forms").classList.add("hidden");
}

function logout() {
  home.classList.add("hidden");
  document.getElementById("forms").classList.remove("hidden");
  showLoginForm();
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch(
      "https://project-2-signup-login-with-auth-backend.onrender.com/api/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const data = await response.json();

    if (data.activationToken) {
      activationToken = data.activationToken;
      showOtpForm();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const otp = document.getElementById("otp-code").value;

  try {
    const response = await fetch(
      "https://project-2-signup-login-with-auth-backend.onrender.com/api/user/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, activationToken }),
      }
    );
    const data = await response.json();

    if (data.message === "User Register Success!!") {
      showLoginForm();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(
      "https://project-2-signup-login-with-auth-backend.onrender.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (data.token) {
      showHome(data.userDetails.name, data.userDetails.email);
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});
