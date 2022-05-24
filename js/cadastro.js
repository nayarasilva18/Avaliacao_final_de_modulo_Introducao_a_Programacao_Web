let inputEmail = document.querySelector("#emailcadastro");
let labelEmail = document.querySelector("#label-input-email-cadastro");
let validaEmail = false;

let inputSenha = document.querySelector("#senhacadastro");
let labelSenha = document.querySelector("#label-input-senha-cadastro");
let validaSenha = false;

let inputRepeteSenha = document.querySelector("#repetesenha");
let labelRepeteSenha = document.querySelector(
  "#label-input-repete-senha-cadastro"
);
let validaRepeteSenha = false;

let formCadastro = document.querySelector("#formcadastro");

let regraSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


inputEmail.addEventListener("keyup", verificarEmail);
inputSenha.addEventListener("keyup", verificarSenha);
inputRepeteSenha.addEventListener("keyup", confirmarSenha);
formCadastro.addEventListener("submit", verificarInputs);


function verificarEmail() {
  if (inputEmail.value.length < 10) {
    labelEmail.style.color = "red";
    labelEmail.innerHTML = "E-mail: * Insira no mínimo 10 caracteres";
    inputEmail.style.border = "0.2px solid red";
    validaEmail = false;
  } else {
    labelEmail.style.color = "#8c6658";
    labelEmail.innerHTML = "E-mail";
    inputEmail.style.border = "0.2px solid #c9c8c0";
    validaEmail = true;
  }
}

function verificarSenha() {
  let senhaValida = inputSenha.value.match(regraSenha);

  if (inputSenha.value.length < 8) {
    labelSenha.style.color = "red";
    labelSenha.innerHTML = "Senha: * Insira no mínimo 8 caracteres";
    inputSenha.style.border = "0.2px solid red";
    validaSenha = false;
  } else if (senhaValida === null) {
    labelSenha.innerHTML =
      "Senha: * Deve conter uma letra maiuscula e um caracter";
    validSenha = false;
  } else {
    labelSenha.style.color = "#8c6658";
    labelSenha.innerHTML = "Senha";
    inputSenha.style.border = "0.2px solid #c9c8c0";
    validaSenha = true;
  }
}

function confirmarSenha() {
  if (inputSenha.value !== inputRepeteSenha.value) {
    labelRepeteSenha.style.color = "red";
    labelRepeteSenha.innerHTML =
      "Confirme a senha: * As senhas não correspondem";
    inputRepeteSenha.style.border = "0.2px solid red";
    validaRepeteSenha = false;
  } else {
    labelRepeteSenha.style.color = "#8c6658";
    labelRepeteSenha.innerHTML = "Confirme a senha";
    inputRepeteSenha.style.border = "0.2px solid #c9c8c0";
    validaRepeteSenha = true;
  }
}

function verificarInputs(e) {
  e.preventDefault();
  if (
    inputEmail.value === "" ||
    inputSenha.value === "" ||
    inputRepeteSenha.value === ""
  ) {
    alert(
      "Algo deu errado! Por favor verifique se você preencheu todos os campos."
    );
    return;
  } else if (!validaEmail || !validaSenha || !validaRepeteSenha) {
    alert(
      "Campos incorretos! Por favor verifique se você preencheu todos os campos."
    );
    return;
  } else {
    alert("Conta criada com sucesso!");
  }
  salvarLocalStorage();
}

function salvarLocalStorage() {
  let emailUser = document.querySelector("#emailcadastro").value;
  let senhaUser = inputSenha.value;
  let recadosUser = [];
  let listaUsers = buscaListaUser()
  let dadosUser = {
    emailUser,
    senhaUser,
    recadosUser,
  };

  console.log(dadosUser);
  listaUsers.push(dadosUser);

  atualizaUser()

  let irLogin = confirm("Deseja ir para a página de login?");

  if (irLogin) {
    window.location = "./index.html";
  }

  function buscaListaUser() {
    return JSON.parse(localStorage.getItem("usuario")) || [];
  }

  function atualizaUser(){
    return window.localStorage.setItem("usuario", JSON.stringify(listaUsers));
  }

  
}