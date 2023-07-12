import {
  auth,
  createUserWithEmailAndPassword,
  db,
  ref,
  set,
  get,
  child,
} from "./modules/firebase.js";
import { initializeDatepicker } from "./modules/datepicker.js";
import changeUserStateInitial from "./modules/changeUserState.js";
import signOutInitial from "./modules/sign-out.js";
import {
  showErrorMessage,
  disableFormElem,
} from "./modules/userSignInValidation.js";

signOutInitial(); //Functional for Sign out
changeUserStateInitial(); // Define User State Functional
initializeDatepicker(); // Functional for Datepicker

const submitForm = document.getElementById("submit");

const formControls = document.querySelectorAll(".form-control");
const emailField = formControls[0];
const passwordField = formControls[1];
const firstNameField = formControls[2];
const lastNameField = formControls[3];
const birthdayField = formControls[4];

if (localStorage.getItem("signedIn") === "signedIn") {
  disableFormElem();
  const elem = document.querySelector(".form-container .section-title");
  showErrorMessage("To create a new account, please Sign out first", elem);
}

const handleFormSubmit = (e) => {
  e.preventDefault();

  const emailValue = emailField.value;
  const passwordValue = passwordField.value;
  const firstName = firstNameField.value;
  const lastName = lastNameField.value;
  const birthday = birthdayField.value;

  if (!emailValue) {
    const elem = document.querySelector(".email-container");
    showErrorMessage("Please check your email and try again", elem);
  } else {
    const userData = {
      firstName,
      lastName,
      birthday,
    };

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        localStorage.setItem("birthday", birthday);
        localStorage.setItem("userName", firstName);
        localStorage.setItem("signedIn", "signedIn");

        set(ref(db, "users/" + userCredential.user.uid), userData).then(() => {
          window.location.href = "quote.html";
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          let elem = document.querySelector(".email-container");
          showErrorMessage(
            "Email already in use, Please use another emain or Sign in",
            elem
          );
        }
      });
  }
};

submitForm.addEventListener("click", handleFormSubmit);
