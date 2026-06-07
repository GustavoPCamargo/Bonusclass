// Funcionalidade para excluir usuários.
async function deletar(event) {
    event.preventDefault()

    let cpfInput = document.getElementById("cpf").value
    let cpf = cpfInput.replace(/\D/g, "")

    try {
        let usuarios = JSON.parse(localStorage.getItem("usuarios"))

        if (!usuarios || usuarios.length ===0) {
            alert("Nenhum usuário foi cadastrado no sistema.")
            return
        }

        const usuario = usuarios.some(u => u.cpf === cpf)

        if (!usuario) {
            alert("Este CPF não está cadastrado no sistema.")
            return
        }

        if(confirm(`Deseja mesmo excluir o CPF: ${cpfInput} do sistema?`)) {
            let listaAtualizada = usuarios.filter(u => u.cpf !== cpf)

            localStorage.setItem("usuarios", JSON.stringify(listaAtualizada))

            alert("Usuário removido do sistema com sucesso!")

            document.getElementById("cpf").value = ""
        }
    } catch (erro) {
        console.error("Erro ao deletar usuário", erro)
        alert("Houve um erro inesperado.")
    }
}