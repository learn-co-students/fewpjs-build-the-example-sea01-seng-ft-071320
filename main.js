// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
function likeGlyphClick(e) {
  const heartNode = e.target;
  let heartCallBack = activateHeart;

  if (heartNode.classList.contains("activated-heart")) {
    heartCallBack = deActivateHeart;
  }

  mimicServerCall()
    .then((resp) => {
      heartCallBack(heartNode);
    })
    .catch(displayError);
}

function activateHeart(heartNode) {
  heartNode.classList.add("activated-heart");
  heartNode.textContent = FULL_HEART;
}

function deActivateHeart(heartNode) {
  heartNode.classList.remove("activated-heart");
  heartNode.textContent = EMPTY_HEART;
}

function displayError(error) {
  const errorModal = document.getElementById("modal");
  const errorModalMessage = document.getElementById("modal-message");

  errorModalMessage.textContent = error;

  revealNode(errorModal);
  setTimeout(hideNode, 3000, errorModal);
}

function hideNode(node) {
  node.classList.add("hidden");
}

function revealNode(node) {
  node.classList.remove("hidden");
}

function initLikeGlyphClick() {
  const likeGlyphNodes = document.getElementsByClassName("like-glyph");

  for (let i = 0; i < likeGlyphNodes.length; i++) {
    likeGlyphNodes[i].addEventListener("click", likeGlyphClick);
  }
}

initLikeGlyphClick();

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
