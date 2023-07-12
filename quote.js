import changeUserStateInitial from "./modules/changeUserState.js";
import signOutInitial from "./modules/sign-out.js";
signOutInitial(); //Function Sign out
changeUserStateInitial(); // Define User State

const birthday = localStorage.getItem("birthday");
const userName = localStorage.getItem("userName");

const getDaysUntilBirthday = (birthDate) => {
  const today = new Date();
  const birthday = new Date(birthDate);
  birthday.setFullYear(today.getFullYear()); //make sure that birthday is calculated for the current year

  if (birthday < today) {
    //check if the calculated birthday date is in the past
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const daysUntilBirthday = Math.floor((birthday - today) / oneDay); //calculating the time difference in days

  return daysUntilBirthday;
};

const daysUntilBirthday = getDaysUntilBirthday(birthday);

const getRandomQuote = (quotes) =>
  quotes[Math.floor(Math.random() * quotes.length)];
const createQuoteMessage = (quote) => {
  return `
    <h1 class="congrats-title">Happy Birthday, ${userName}!</h1>
    <p class="quote-item">${quote.text}</p>
    <p class="quote-author">${quote.author || "Unknown"}</p>
    `;
};

const createDaysToBirthdayMessage = () => {
  return `
  <h1 class="days-title">${daysUntilBirthday} DAYS LEFT</h1>
  <p>Until your Birthday!</p>`;
};

const createBirthdayTomorrowMessage = () => {
  return `
  <h1 class="days-title">${daysUntilBirthday} DAYS LEFT</h1>
  <h2>${userName}, your Birthday is tomorrow!</h2>`;
};

const showMessageOnPage = (content) => {
  const container = document.querySelector(".quote-container");
  container.innerHTML = content;
};

const quoteUrl = "https://type.fit/api/quotes";
const getAllQuotes = async () => {
  try {
    const result = await fetch(quoteUrl);
    if (result.ok) {
      const quotes = await result.json();
      const randomQuote = getRandomQuote(quotes);
      showMessageOnPage(createQuoteMessage(randomQuote));
    }
  } catch (error) {
    console.log(error);
  }
};

const handleLoginedUserBirthday = () => {
  if (daysUntilBirthday === 365) {
    getAllQuotes();
    return;
  }
  if (daysUntilBirthday === 0) {
    showMessageOnPage(createBirthdayTomorrowMessage());
    return;
  }
  showMessageOnPage(createDaysToBirthdayMessage());
};

const handleNotLoginedUserBirthday = () => {
  showMessageOnPage(`<p>To get started please <a href="sign-up.html" class="accent">Create an account</a></p>
  <p>If you have one, please <a href="login.html" class="accent">Sign in</a></p>`);
};

if (birthday) {
  handleLoginedUserBirthday();
} else {
  handleNotLoginedUserBirthday();
}
