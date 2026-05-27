document.addEventListener('DOMContentLoaded', () => {
    const selectHorario = document.getElementById('horario');
    if (!selectHorario) return;

    function gerarHorarios(inicio, fim, intervaloMinutos, pausas) {
        const horarios = [];
        const [inicioHora, inicioMinuto] = inicio.split(':').map(Number);
        const [fimHora, fimMinuto] = fim.split(':').map(Number);

        let atual = new Date();
        atual.setHours(inicioHora, inicioMinuto, 0, 0);

        const limite = new Date();
        limite.setHours(fimHora, fimMinuto, 0, 0);

        while (atual <= limite) {
            const horaAtual = atual.getHours();
            const minutoAtual = atual.getMinutes();
            const minutosTotais = horaAtual * 60 + minutoAtual;

            const bloqueado = pausas.some(([pausaInicio, pausaFim]) => {
                const [hIni, mIni] = 
                pausaInicio.split(':').map(Number);
                const [hFim, mFim] = 
                pausaFim.split(':').map(Number);

                const inicioPausa = hIni * 60 + mIni;
                const fimPausa = hFim * 60 + mFim;

                return minutosTotais >= inicioPausa && minutosTotais < fimPausa;
            });
        }


        // TODOS:

        // Bloqueio (pausas): implementar uma verificação para pular o intervalo
        // de almoço (ex: última acaba 12h e a próxima começa 14h)

        // Formatação de horário

        // Popular o select do html

        // chamar gerarHorarios();

        // Validações

    }

})