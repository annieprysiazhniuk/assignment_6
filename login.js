import {
  auth,
  signInWithEmailAndPassword,
  db,
  ref,
  set,
  get,
  child,
} from "./modules/firebase.js";
import changeUserStateInitial from "./modules/changeUserState.js";
import signOutInitial from "./modules/sign-out.js";
import {
  showErrorMessage,
  disableFormElem,
} from "./modules/userSignInValidation.js";

signOutInitial(); //Function Sign out
changeUserStateInitial(); //function to define a user state

const submitForm = document.getElementById("submit");
const userStatus = localStorage.getItem("signedIn");

const formControls = document.querySelectorAll(".form-control");
const emailField = formControls[0];
const passwordField = formControls[1];

if (userStatus === "signedIn") {
  disableFormElem();
  showErrorMessage(
    "To log in to a new account, please make sure to Sign out first"
  );
}

const handleFormSubmit = (e) => {
  e.preventDefault();

  const emailValue = emailField.value;
  const passwordValue = passwordField.value;

  if (!emailValue) {
    let elem = document.querySelector(".email-container");
    showErrorMessage("Please check your email and try again", elem);
  } else {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const userKey = userCredential.user.uid;
        const dbRef = ref(db);

        get(child(dbRef, `users/${userKey}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let birthday = snapshot.val().birthday;
            let userName = snapshot.val().firstName;

            localStorage.setItem("birthday", birthday);
            localStorage.setItem("userName", userName);
            localStorage.setItem("signedIn", "signedIn");

            window.location.href = "quote.html";
          } else {
            console.log("No data available");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/user-not-found") {
          showErrorMessage("User not found, Please sign up first");
        } else if (errorCode === "auth/wrong-password") {
          let elem = document.querySelector(".password-container");
          showErrorMessage("Wrong Password, Please try again", elem);
        }
      });
  }
};
submitForm.addEventListener("click", handleFormSubmit);
