const selectHorario = document.getElementById('horario');

function obterDataProximaSexta() {
  const hoje = new Date();
  const diaSemana = hoje.getDay();
  let diasAteSexta = (5 - diaSemana + 7) % 7;

  if (diasAteSexta === 0) {
    diasAteSexta = 7;
  }

  const proximaSexta = new Date(hoje);
  proximaSexta.setDate(hoje.getDate() + diasAteSexta);

  return proximaSexta.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}

const dataAula = obterDataProximaSexta();

function gerarHorarios(inicio, fim, intervaloMinutos, pausas) {
  const horarios = [];
  const [inicioHora, inicioMinuto] = inicio.split(':').map(Number);
  const [fimHora, fimMinuto] = fim.split(':').map(Number);

  let atual = new Date();
  atual.setHours(inicioHora, inicioMinuto, 0, 0);

  const limite = new Date();
  limite.setHours(fimHora, fimMinuto, 0, 0);

  while (atual <= limite) {
    const hora = atual.getHours();
    const minuto = atual.getMinutes();
    const minutosTotais = hora * 60 + minuto;

    const bloqueado = pausas.some(([pausaInicio, pausaFim]) => {
      const [hIni, mIni] = pausaInicio.split(':').map(Number);
      const [hFim, mFim] = pausaFim.split(':').map(Number);
      const inicioPausa = hIni * 60 + mIni;
      const fimPausa = hFim * 60 + mFim;

      return minutosTotais >= inicioPausa && minutosTotais < fimPausa;
    });

    if (!bloqueado) {
      const textoHorario = atual.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      horarios.push(textoHorario);
    }

    atual = new Date(atual.getTime() + intervaloMinutos * 60000);
  }

  return horarios;
}

const horariosDisponiveis = gerarHorarios('09:30', '16:00', 30, [['12:00', '14:00']]);

horariosDisponiveis.forEach((horario) => {
  const option = document.createElement('option');
  option.value = `${dataAula} - ${horario}`;
  option.textContent = `⏰ ${dataAula} - ${horario}`;
  selectHorario.appendChild(option);
});
