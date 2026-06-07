// Funcionalidade de validação do login
async function login(event) {
    event.preventDefault();

    let cpf = document.getElementById('cpf').value.replace(/\D/g, "")
    let senha = document.getElementById('senha').value

    try {
        let usuarios = JSON.parse(localStorage.getItem("usuarios"))

        if (!usuarios) {
            const resposta = await fetch("scripts/usuarios.json")
            usuarios = await resposta.json()

            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        }

        const usuario = usuarios.find(u => 
            u.cpf === cpf && u.senha === senha
        )

        if (usuario) {
            if (usuario.tipo === "aluno") {
                window.location.href = "tela_aluno.html"
            } else if (usuario.tipo === "professor") {
                window.location.href = "tela_professora.html"
            } else if (usuario.tipo === "coordenador") {
                window.location.href = "tela_coordenador.html"
            };
        } else {
            alert('CPF ou senha incorretos! Tente novamente!')
        }
    } catch (erro) {
        console.error('Erro ao carregar usuários!', erro)
    }
}
