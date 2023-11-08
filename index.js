const BG_INITIAL = "hsl(211, 68%, 94%)";
const BG_AFTER_READING = "#F0F8FF";

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

function checkLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  if (savedData.length > 0) {
    savedData.forEach((data) => {
      displayNotifications(true, {
        userName: data.username,
        userComment: data.comment,
        userPhoto: data.profilePicSrc,
        userId: data.id,
        time: data.time,
        read: data.read,
      });
    });
  }
}

checkLocalStorage();
setCounterToDom();

/*
 * counting the submits
 * [END]
 */

/*
 * Displaying the Name and Comment that has been submited
 * [BEGIN]
 */

function displayNotifications(fromLocalStorage = false, options = undefined) {
  let nameInputValue, commentInputValue, profilePictureInput, markAsRead;

  if (fromLocalStorage === true) {
    nameInputValue = options.userName;
    commentInputValue = options.userComment;
    profilePictureInput = options.userPhoto;
    markAsRead = options.read;
  } else {
    nameInputValue = document.getElementsByClassName("username")[0].value;
    commentInputValue = document.getElementsByClassName("comment")[0].value;
    profilePictureInput = document.getElementById("profile");
    markAsRead = false;
  }

  //set the inputs by class

  if (!fromLocalStorage) {
    if (
      nameInputValue === "" ||
      commentInputValue === "" ||
      !profilePictureInput.files[0]
    ) {
      alert("All fields must be completed!");
      return;
    }
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
  userNotif.style.backgroundColor = markAsRead ? BG_AFTER_READING : BG_INITIAL;

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

  let timeToRender = "0m ago";
  if (options?.time) {
    const newTime = new Date().getTime();
    let currentTime = Math.trunc((newTime - options.time) / 1000 / 60);
    timeToRender = `${currentTime}m ago`;
  }
  time.textContent = timeToRender;

  nameNotificationsDate.append(text);
  nameNotificationsDate.append(time);
  const idForElement = options?.userId || generateGUID();
  uploadProfilePic(
    profilePictureInput,
    profilePicImg,
    fromLocalStorage,
    nameInputValue,
    commentInputValue,
    idForElement
  );

  userNotif.append(profilePicImg);
  userNotif.append(nameNotificationsDate);
  userNotif.append(createSVG(userNotif, idForElement));

  notificationsWrapper.append(userNotif);

  count++;
  setCounterToDom();
  clearInputFields();

  /*
   * Displaying the Name and Comment that has been submited
   * [END]
   */
}

function uploadProfilePic(
  profilePictureInput,
  profilePicImg,
  fromLocalStorage,
  nameInputValue,
  commentInputValue,
  id
) {
  if (fromLocalStorage) {
    profilePicImg.src = profilePictureInput;
    return;
  }
  const selectedFile = profilePictureInput.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicImg.src = e.target.result;

      saveToLocalStorage(
        nameInputValue,
        commentInputValue,
        profilePicImg.src,
        id
      );
    };
    reader.readAsDataURL(selectedFile);
  }
}

function clearInputFields() {
  const nameInput = document.getElementsByClassName("username")[0];
  const commentInput = document.getElementsByClassName("comment")[0];
  const pictureInput = document.getElementById("profile");

  if (nameInput && commentInput && pictureInput) {
    nameInput.value = "";
    commentInput.value = "";
    pictureInput.value = "";
  }
}

function createSVG(userNotif, id) {
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

      deleteItemFromLocalStorageById(id);
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

function deleteItemFromLocalStorageById(id) {
  let savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  for (let i = 0; i < savedData.length; i++) {
    if (savedData[i].id === id) {
      savedData.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("savedData", JSON.stringify(savedData));
}

function saveToLocalStorage(username, comment, profilePicSrc, id, read) {
  let savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  let time = new Date().getTime();

  const data = {
    id,
    username,
    comment,
    profilePicSrc,
    time,
    read,
  };
  savedData.push(data);

  localStorage.setItem("savedData", JSON.stringify(savedData));
}

function generateGUID() {
  // Use the crypto object if available
  const data = new Uint8Array(16);
  crypto.getRandomValues(data);

  // Set the version (4) and reserved bits (2)
  data[6] = (data[6] & 0x0f) | 0x40;
  data[8] = (data[8] & 0x3f) | 0x80;

  // Convert the data to a hexadecimal string
  let guid = "";
  for (let i = 0; i < data.length; i++) {
    const hex = data[i].toString(16).padStart(2, "0");
    guid += hex;
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      guid += "-";
    }
  }

  return guid;
}

function markAllAsRead() {
  const getAllNotifications = document.getElementsByClassName("user-notif");
  if (getAllNotifications && getAllNotifications.length) {
    Array.from(getAllNotifications).forEach((notifElement) => {
      notifElement.style.backgroundColor = BG_AFTER_READING;
    });
  }

  markAsRead = false;
  updateLocalStorageToMarkAllAsRead();
}
function updateLocalStorageToMarkAllAsRead() {
  let savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  for (let i = 0; i < savedData.length; i++) {
    savedData[i].read = true;
  }
  localStorage.setItem("savedData", JSON.stringify(savedData));
}
