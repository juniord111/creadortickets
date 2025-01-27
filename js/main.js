// Elementos principales
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");
const form = document.querySelector(".form");
const oculto = document.querySelector(".oculto");
const mostrar = document.querySelector(".mostrar");
const nameSubmit = document.querySelectorAll(".nameSubmit");
const emailSubmit = document.getElementById("emailSubmit");
const githubName = document.querySelector(".githubName");
const ocultoAvatar = document.querySelector(".avatar"); // Imagen en la sección "avatar"
const rotateElement = document.querySelector(".rotate"); // Párrafo para ID aleatorio
const dateElement = document.querySelector(".date"); // Párrafo para fecha actual

let uploadedImageURL = ""; 

// Evento para validar y subir imagen
inputFile.addEventListener("change", validateAndUpload);

function validateAndUpload() {
  const file = inputFile.files[0]; 
  if (!file) {
    alert("No file selected.");
    return;
  }

  // Validar tipo de archivo
  const validTypes = ["image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    alert("Only JPG or PNG files are allowed.");
    inputFile.value = ""; 
    return;
  }

  // Validar tamaño de archivo (máximo 500KB)
  const maxSize = 500 * 1024; // 500KB en bytes
  if (file.size > maxSize) {
    alert("File size exceeds 500KB.");
    inputFile.value = ""; 
    return;
  }

  // Si pasa las validaciones, mostrar la imagen como fondo
  uploadedImageURL = URL.createObjectURL(file);
  imageView.style.backgroundImage = `url(${uploadedImageURL})`;
  imageView.textContent = ""; 
  imageView.style.border = "none";
}

// Evento para manejar el envío del formulario
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar envío real del formulario

  // Obtener valores de los campos
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const githubUsername = document.getElementById("githubUsername");

  // Limpiar los errores anteriores
  const inputs = [fullName, email, githubUsername];
  inputs.forEach(input => {
    input.classList.remove("error");
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.remove();
    }
  });

  let valid = true;

  // Validar que los campos no estén vacíos
  if (!fullName.value) {
    valid = false;
    fullName.classList.add("error");
    let errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "Full Name is required.";
    fullName.parentElement.appendChild(errorMessage);
  }

  if (!email.value) {
    valid = false;
    email.classList.add("error");
    let errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "Email is required.";
    email.parentElement.appendChild(errorMessage);
  }

  if (!githubUsername.value) {
    valid = false;
    githubUsername.classList.add("error");
    let errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "GitHub Username is required.";
    githubUsername.parentElement.appendChild(errorMessage);
  }

  // Validar que el archivo esté seleccionado
  if (!uploadedImageURL) {
    valid = false;
    const errorMessage = document.querySelector(".error.image");
    errorMessage.style.display = "block";
    errorMessage.style.color='red'
  }

  // Si todo es válido, continuar con el proceso
  if (valid) {
    // Asignar valores a la sección oculta
    nameSubmit.forEach((el) => (el.textContent = fullName.value));
    emailSubmit.textContent = email.value;
    githubName.textContent = githubUsername.value;

    // Mostrar imagen subida en la sección "avatar"
    if (uploadedImageURL) {
      ocultoAvatar.src = uploadedImageURL;
      ocultoAvatar.style.display = "block";
    } else {
      ocultoAvatar.style.display = "none";
    }

    // Generar identificador aleatorio para la clase "rotate"
    rotateElement.textContent = generateRandomID();

    // Mostrar la fecha actual en tiempo real
    dateElement.textContent = getCurrentDate();

    // Mostrar sección oculta y ocultar formulario
    mostrar.style.display = "none";
    oculto.style.display = "flex"; // Cambiar a "flex" para mejor disposición
  }
});

// Función para generar un identificador aleatorio
function generateRandomID() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!*@#$%";
  let randomID = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters[randomIndex];
  }
  return randomID;
}

// Función para obtener la fecha actual en formato legible
function getCurrentDate() {
  const today = new Date();
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return today.toLocaleDateString("en-US", options);
}
