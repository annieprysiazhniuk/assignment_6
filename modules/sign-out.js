import { auth, signOut } from "./firebase.js";

const userSignOut = () => {
  signOut(auth)
    .then(() => {
      localStorage.clear();
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function signOutInitial() {
  const signOutBtn = document.querySelector(".log-out-btn");
  signOutBtn.addEventListener("click", userSignOut);
  signOutBtn.classList.add("hide");
}
