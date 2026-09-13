var usuario = document.querySelector("#nome");
var senha = document.querySelector("#senha");
const button = document.querySelector("#confirmar");

const senhareal = "joownlook4002frango";
const usuarioreal = "Joao";

button.addEventListener("click", function() {
  if (usuario.value === usuarioreal && senha.value === senhareal) {
    window.location.href = "./html/home.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
});