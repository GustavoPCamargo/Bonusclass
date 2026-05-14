// Máscara do cpf
const inputCPF = document.getElementById("cpf")

inputCPF.addEventListener("input", (e) =>{
    let valor = e.target.value

    valor = valor.replace(/\D/g, "");

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1-$2");

    e.target.value = valor;
});

// Funcionalidade de validação do login
async function login(event) {
    event.preventDefault();

    let cpf = document.getElementById('cpf').value.replace(/\D/g, "")
    let senha = document.getElementById('senha').value

    try {
        const resposta = await fetch("scripts/usuarios.json")
        const usuarios = await resposta.json();

        const usuario = usuarios.find(u =>
            u.cpf === cpf && u.senha === senha
        );
        
        if (usuario) {
            if (usuario.tipo === "aluno") {
                window.location.href = "tela_aluno.html"
            };
        };
    } catch {
        alert('Erro!')
    }
}