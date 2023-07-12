const submitForm = document.getElementById("submit");

const showErrorMessage = (
  message,
  element = document.querySelector(".form-container .section-title")
) => {
  const warningElem = document.createElement("p");
  warningElem.setAttribute("class", "error");
  warningElem.innerText = `${message}`;
  element.classList.add("error");
  element.appendChild(warningElem);
};

const disableFormElem = () => {
  const allFormElem = document.querySelectorAll(".form-control");
  allFormElem.forEach((elem) => elem.setAttribute("disabled", ""));
  submitForm.setAttribute("disabled", "");
};

export { showErrorMessage, disableFormElem };
