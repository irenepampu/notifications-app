/*
 * counting the submits
 * [BEGIN]
 */
let count = 0;

function setCounterToDom() {
  const domCounter = document.getElementsByClassName("submit-count");
  if (domCounter.length) {
    domCounter[0].textContent = count;
  }
}
setCounterToDom();
/*
 * counting the submits
 * [END]
 */

/*
 * Displaying the Name and Comment that has been submited
 * [BEGIN]
 */

function displayNotifications() {
  //set the inputs by class
  const nameInputValue = document.getElementsByClassName("username")[0].value;
  const commentInputValue = document.getElementsByClassName("comment")[0].value;

  if (nameInputValue === "" || commentInputValue === "") {
    return;
  }

  /*
   * Creating a user-profile
   * [BEGIN]
   */
  const notificationsWrapper = document.getElementById("notifications");
  const userNotif = document.createElement("div");
  const profilePicImg = document.createElement("img");
  const nameNotificationsDate = document.createElement("div");
  const text = document.createElement("p");
  const userName = document.createElement("span");
  const dot = document.createElement("span");
  const time = document.createElement("p");
  /*
   * Creating a user-profile
   * [END]
   */

  /*
   *   Adding css classes
   *   [BEGIN]
   */
  userName.classList.add("user-name");
  dot.classList.add("dot");
  time.classList.add("time");
  text.classList.add("text");
  nameNotificationsDate.classList.add("name-notification-date");
  profilePicImg.classList.add("profile-pic");
  userNotif.classList.add("user-notif");

  /*
   *   Added css classes
   *   [END]
   */

  /*
   * Displaying values
   * [BEGIN]
   */

  userName.textContent = nameInputValue;
  text.append(userName);
  text.append(document.createTextNode(` ${commentInputValue}`));
  text.append(dot);
  time.textContent = "1m ago";

  nameNotificationsDate.append(text);
  nameNotificationsDate.append(time);

  profilePicImg.alt = nameInputValue.split(" ")[0];
  profilePicImg.src = "assets/images/avatar-mark-webber.webp";

  userNotif.append(profilePicImg);
  userNotif.append(nameNotificationsDate);

  userNotif.append(createSVG(userNotif));

  notificationsWrapper.append(userNotif);

  count++;
  setCounterToDom();
  clearInputFields();
}
/*
 * Displaying the Name and Comment that has been submited
 * [END]
 */

function clearInputFields() {
  const nameInput = document.getElementsByClassName("username")[0];
  const commentInput = document.getElementsByClassName("comment")[0];

  if (nameInput && commentInput) {
    nameInput.value = "";
    commentInput.value = "";
  }
}

function createSVG(userNotif) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "35px");
  svg.setAttribute("width", "35px");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("viewBox", "0 0 512 512");

  svg.addEventListener("click", function () {
    if (userNotif) {
      userNotif.remove();
      count--;
      setCounterToDom();
    }
  });

  // Create the path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
  );

  svg.appendChild(path);

  return svg;
}
