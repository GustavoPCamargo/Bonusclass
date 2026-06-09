async function cadastrar(event) {
    event.preventDefault();
    let cpfInput = document.getElementById("cpf").value;
    let cpf = cpfInput.replace(/\D/g, "");
    let senha = document.getElementById("senha").value;
    let tipo = document.getElementById("tipoUser").value;

    try {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const existe = usuarios.some(u => u.cpf === cpf); 
        if (existe) {
            alert("ERRO: Este CPF já está cadastrado!");
            return;
        }

        const novoUsuario = { cpf, senha, tipo };
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Usuário adicionado com sucesso!");
        limparFormulario();
        atualizarListaTela();

    } catch (erro) {
        console.error("Erro ao salvar usuário:", erro);
    }
}

function deletarUsuario(cpfParaDeletar) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    if(confirm(`Deseja mesmo excluir o CPF: ${cpfParaDeletar} do sistema?`)) {
        let listaAtualizada = usuarios.filter(u => u.cpf !== cpfParaDeletar);
        localStorage.setItem("usuarios", JSON.stringify(listaAtualizada));
        alert("Usuário removido com sucesso!");
        atualizarListaTela();
    }
}

function formatar(cpf) {
    if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return cpf
}


function limparFormulario() {
    document.getElementById("cpf").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("tipoUser").selectedIndex = 0;
}

function atualizarListaTela() {
    const container = document.getElementById("listaUsuariosContainer");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    container.innerHTML = "";

    usuarios.forEach(u => {
        const cpfFormatado = formatar(u.cpf)
        
        container.innerHTML += `
            <div class="user-card">
                <div class="user-info">
                    <h4>CPF: ${cpfFormatado}</h4>
                    <div class="badges">
                        <span class="badge">${u.tipo}</span>
                        <span class="badge">Nível 1</span>
                        <span class="badge ativo">Ativo</span>
                    </div>
                </div>
                <button class="btn-deletar" onclick="deletarUsuario('${u.cpf}')">🗑️</button>
            </div>
        `;
    });
}

window.onload = atualizarListaTela;