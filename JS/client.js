const socket = io("http://localhost:3000");
console.log("hello manu");
const form = document.getElementById("send-container");
const messageInput = documet.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if ((position = "left")) {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
const myname = prompt("Enter your name to join");
socket.emit("new-user-joined", myname);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});
socket.on("left", (name) => {
  append(`${name}: left the chat`, "left");
});
