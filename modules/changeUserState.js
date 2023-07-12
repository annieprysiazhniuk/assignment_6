import { auth, onAuthStateChanged } from "./firebase.js";

export default function changeUserStateInitial() {
  const signOutBtn = document.querySelector(".log-out-btn");
  const signInBtn = document.querySelector(".sign-in-btn");
  onAuthStateChanged(auth, (user) => {
    signOutBtn.classList.toggle("hide", !user);
    signInBtn.classList.toggle("hide", user);
  });
}
