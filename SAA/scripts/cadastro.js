// Funcionalidade do Cadastro de usuários
async function cadastrar(event) {
    event.preventDefault()

    let cpfInput = document.getElementById("cpf").value
    let cpf = cpfInput.replace(/\D/g, "")
    let senha = document.getElementById("senha").value
    let tipo = document.getElementById("tipoUser")

    try {
        let usuarios = JSON.parse(localStorage.getItem("usuarios"))

        if (!usuarios) {
            const resposta = await fetch("scripts/usuarios.json")
            usuarios = await resposta.json()
        }

        const existe = usuarios.some(u => u.cpf === cpf) 
        if (existe) {
            alert("ERRO: Este cpf já esta cadastrado!")
            return;
        }

        let tipoUser = tipo.value

        const novoUsuario = {
            cpf: cpf,
            senha: senha,
            tipo: tipoUser
        }

        usuarios.push(novoUsuario)

        localStorage.setItem("usuarios", JSON.stringify(usuarios))

        alert("Usuário adicionado com sucesso!")

        document.getElementById("cpf").value = ""
        document.getElementById("senha").value = ""
        document.getElementById("tipoUser").selectedIndex = 0

    } catch (erro) {
        console.error("Erro ao salvar usuário:", erro)
        alert("Houve um erro inesperado.")
    }
}