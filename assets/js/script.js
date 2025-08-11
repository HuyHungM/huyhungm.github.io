const avatarFormPreview = document.querySelector("form .avatar-preview");
const avatarPreview = document.querySelector("#preview .avatar-preview");
const avatarInput = document.getElementById("avatar");

avatarFormPreview.addEventListener("click", () => avatarInput.click());

avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];
  if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarFormPreview.style.backgroundImage = `url('${e.target.result}')`;
      avatarPreview.style.backgroundImage = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(file);
  } else {
    alert("Chỉ chấp nhận file PNG hoặc JPEG!");
  }
});

const nameInput = document.getElementById("name");
const namePreview = document.querySelector(".info-preview .name");

nameInput.addEventListener("input", () => {
  namePreview.textContent = nameInput.value;
});

const roleInput = document.getElementById("role");
const rolePreview = document.querySelector(".info-preview .role");

roleInput.addEventListener("input", () => {
  rolePreview.textContent = `Chức vụ: ${roleInput.value}`;
});

const messageInput = document.getElementById("message");
const messagePreview = document.querySelector(".message-preview");
const messageNote = document.querySelector(".note");

messageInput.addEventListener("input", () => {
  messagePreview.innerHTML = messageInput.value.replace(/\n/g, "<br>");
  messageNote.textContent = `${messageInput.value.length}/450 kí tự`;
});

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const preview = document.querySelector(".preview-container");

  html2canvas(preview, { useCORS: true, scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "screenshot.png";
    link.click();
  });
});
