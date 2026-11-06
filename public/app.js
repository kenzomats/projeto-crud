// responsavel por fazer as requisiçoes do front ao backend


//elementos html
const form = document.getElementById('user-form')
const userList = document.getElementById("user-list")
carregarUsuarios()
//funcoes

//tratar o formulário
form.addEventListener('submit', e=>{
    e.preventDefault(); //evitar o formulario recarregar
    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    cadastrarUsuario(nome, email)
})

function cadastrarUsuario(nome,email){
    //fetch() - requisicao ao backend
    fetch('/api/users/cadastrar', {
        method: 'POST', //metodo da requisicao
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nome, email}) // converter o objeto
    })
    .then(()=>{
        form.reset(); //limpar os dados do formulario
        carregarUsuarios()
    })
}

function carregarUsuarios(){
    fetch('api/users/listar', {
        method: 'GET'
    })
    .then(res => res.json()) //recebe os dados do banco em JSON
    .then(data =>{ //manipular os dados recebidos
        userList.innerHTML = ''; //limpar o conteúdo da lista
        data.forEach(user =>{
            const li = document.createElement('li')
            li.innerHTML = `${user.nome} - ${user.email}
            <button onclick="editarUsuario(${user.id})">Editar</button>
            <button onclick="excluirUsuario(${user.id})">Excluir</button>
            `
            userList.appendChild(li)
        })
    })
}

function editarUsuario(id){
    const nome = prompt("nome: ")
    const email = prompt("email: ")

    //requisicao ao backend
    fetch(`/api/users/editar/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nome, email}) // coverter o objeto
    })
    .then(()=>{
        carregarUsuarios()
    })
}

function excluirUsuario(id){
    const confirmacao = confirm("Tem certeza?")
    if(!confirmacao){
        return;
    }
    fetch(`/api/users/excluir/${id}`, {
        method: 'DELETE'
    })
    .then(()=> {
        carregarUsuarios()
    })
}