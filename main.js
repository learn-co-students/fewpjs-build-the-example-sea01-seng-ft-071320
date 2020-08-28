// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";
const errorModal = document.getElementById("modal");

errorModelClase();
ListenToLikeClick();

// Your JavaScript code goes here!
function errorModelClase() {
  errorModal.className = "hidden";
}

// recognize the click on  <3
function ListenToLikeClick() {
  const body = document.querySelector("body");
  body.addEventListener("click", function (event) {
    if (
      event.target.className == "like-glyph" ||
      event.target.className == "activated-heart"
    ) {
      mimicServerCall()
        .then((response) => {
          console.log(response);
        })
        .then((response) => {
          changeHeartColor(response, event);
        })
        .catch((response) => {
          showErrorMessage(response);
        });
    }
  });
}

function changeHeartColor(response, event) {
  let heart = event.target;
  if (heart.textContent === FULL_HEART) {
    heart.textContent = EMPTY_HEART;
    heart.className = "like-glyph";
  } else if (heart.textContent === EMPTY_HEART) {
    heart.textContent = FULL_HEART;
    heart.className = "activated-heart";
  }
}

function showErrorMessage(response) {
  errorModal.className = "";
  setTimeout(function () {
    errorModal.className = "hidden";
  }, 5000);
}

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
