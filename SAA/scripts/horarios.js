const selectHorario = document.getElementById('horario');
const selectHorarioLotado = document.getElementById('horario_lotado');
const idiomaPrincipal = document.getElementById('idioma');
const idiomaAlerta = document.getElementById('idioma_alerta');
const btnAtivarAlerta = document.getElementById('ativar_alerta');
const containerNotificacoes = document.getElementById('notificacoes');

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

const todosHorarios = gerarHorarios('09:30', '16:00', 30, [['12:00', '14:00']]);

const indisponiveis = [];
const disponiveis = [];

const qtdIndisponiveis = Math.max(1, Math.floor(todosHorarios.length * 0.2));

const copia = todosHorarios.slice();
for (let i = copia.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [copia[i], copia[j]] = [copia[j], copia[i]];
}

const escolhidos = copia.slice(0, qtdIndisponiveis);

todosHorarios.forEach(h => {
  if (escolhidos.includes(h)) {
    indisponiveis.push(h);
  } else {
    disponiveis.push(h);
  }
});

function criarOptionParaHorario(horario, isDisponivel = true) {
  const option = document.createElement('option');
  option.value = `${dataAula} - ${horario}`;
  option.textContent = `${isDisponivel ? '⏰' : '⛔'} ${dataAula} - ${horario}`;
  return option;
}

disponiveis.forEach(horario => {
  selectHorario.appendChild(criarOptionParaHorario(horario, true));
});

if (selectHorarioLotado) {
  indisponiveis.forEach(horario => {
    selectHorarioLotado.appendChild(criarOptionParaHorario(horario, false));
  });
}

if (idiomaPrincipal && idiomaAlerta) {
  idiomaAlerta.innerHTML = idiomaPrincipal.innerHTML;
}

const notificacoes = [];

function atualizarNotificacoes() {
  if (!containerNotificacoes) return;
  containerNotificacoes.innerHTML = '';
  if (notificacoes.length === 0) {
    containerNotificacoes.innerHTML = '';
    return;
  }

  notificacoes.forEach((n, idx) => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    div.style.padding = '6px 0';

    const span = document.createElement('span');
    span.textContent = n.text;

    const btn = document.createElement('button');
    btn.textContent = 'Marcar como lido';
    btn.className = 'btn-secondary';
    btn.style.marginLeft = '12px';
    btn.onclick = () => {
      notificacoes.splice(idx, 1);
      atualizarNotificacoes();
    };

    div.appendChild(span);
    div.appendChild(btn);
    containerNotificacoes.appendChild(div);
  });
}

if (btnAtivarAlerta) {
  btnAtivarAlerta.addEventListener('click', () => {
    const idioma = (idiomaAlerta && idiomaAlerta.value) || (idiomaPrincipal && idiomaPrincipal.value) || '—';
    const horario = selectHorarioLotado ? selectHorarioLotado.value : null;
    if (!horario) {
      alert('Selecione um horário lotado para ativar o alerta.');
      return;
    }

    const texto = `Horário ${horario.replace(dataAula + ' - ', '')} em ${dataAula} ficou disponível para ${idioma}`;
    notificacoes.push({ text: texto });
    atualizarNotificacoes();
  });
}

