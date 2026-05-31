// ============================================================
// agendamento.js — gerencia o agendamento do aluno no localStorage
// ============================================================

const CHAVE = "bonusclass_agendamento";

// Salva ou atualiza o agendamento
function salvarAgendamento(dados) {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
}

// Retorna o agendamento atual ou null
function getAgendamento() {
    const item = localStorage.getItem(CHAVE);
    return item ? JSON.parse(item) : null;
}

// Remove o agendamento (cancelar)
function cancelarAgendamento() {
    localStorage.removeItem(CHAVE);
}

// Verifica se há agendamento ativo
function temAgendamento() {
    return localStorage.getItem(CHAVE) !== null;
}