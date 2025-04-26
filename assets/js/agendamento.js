document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('agendamentoForm');
  const dataInput = document.getElementById('data');
  const horaSelect = document.getElementById('hora');
  const telefoneInput = document.getElementById('telefone');

  // Impede datas passadas
  const hoje = new Date();
  dataInput.min = hoje.toISOString().split('T')[0];

  // Formatação dinâmica do telefone
  telefoneInput.addEventListener('input', () => {
    telefoneInput.value = formatarTelefone(telefoneInput.value);
  });

  function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length === 0) return '';
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  }

  // Atualiza horários ao mudar a data
  dataInput.addEventListener('change', () => {
    const data = new Date(dataInput.value + 'T12:00:00');
    const diaSemana = data.getDay();
    const hojeStr = new Date().toDateString();

    if (diaSemana === 0 || diaSemana === 1) {
      horaSelect.innerHTML = `<option>❌ Fechado aos domingos e segundas</option>`;
      alert('Atendemos de terça a sábado.');
      return;
    }

    horaSelect.innerHTML = `<option disabled selected>⏳ Carregando horários...</option>`;
    const horarios = [];
    const inicio = 9;
    const fim = 19;
    const agora = new Date();

    for (let h = inicio; h < fim; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hora = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        const horaCompleta = new Date(`${dataInput.value}T${hora}`);
        if (data.toDateString() === hojeStr && horaCompleta <= agora) continue;
        horarios.push(`<option value="${hora}">${hora}</option>`);
      }
    }

    horaSelect.innerHTML = horarios.length
      ? `<option disabled selected>Escolha um horário</option>` + horarios.join('')
      : `<option>😢 Nenhum horário disponível</option>`;
  });

  // Submissão do formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const data = dataInput.value;
    const hora = horaSelect.value;

    const checkboxes = document.querySelectorAll('input[name="servicos[]"]:checked');
    const servicos = Array.from(checkboxes).map(checkbox => checkbox.value);

    if (servicos.length === 0) {
      alert('Selecione pelo menos um serviço!');
      return;
    }

    if (!data || !hora) {
      alert('Preencha todos os campos!');
      return;
    }

    const [ano, mes, dia] = data.split('-');
    const [h, min] = hora.split(':');
    const dataISO = new Date(ano, mes - 1, dia, h, min);
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const servicosTexto = servicos.join(', ');
    const detalhes = `Olá ${nome}, seu agendamento para ${servicosTexto} no dia ${dataFormatada} às ${hora} foi confirmado!`;
    document.getElementById('confirmacaoTexto').textContent = detalhes;

    try {
      // Alterando a URL para a produção
      const response = await fetch('https://podiatryproject.onrender.com/criar-evento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          telefone,
          servicos: servicosTexto,
          dataInicio: dataISO.toISOString(),
          dataFim: new Date(dataISO.getTime() + 60 * 60000).toISOString()
        })
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Evento criado com sucesso:', result);
        new bootstrap.Modal(document.getElementById('confirmacaoModal')).show();
      } else {
        throw new Error('Erro ao criar evento no Google Calendar.');
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao confirmar o agendamento.');
    }

    const whatsappLink = gerarLinkWhatsApp(nome, telefone, servicosTexto, dataFormatada, hora);
    document.getElementById('whatsappLink').href = whatsappLink;
  });

  function gerarLinkWhatsApp(nome, telefone, servico, data, hora) {
    const texto = `Olá Shalom Adonai! Confirme meu agendamento:\n\n` +
      `*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Data:* ${data} às ${hora}\n*Serviço:* ${servico}\n\nPor favor, confirme.`;
    return `https://wa.me/5511967036990?text=${encodeURIComponent(texto)}`;
  }
}); // Este é o único fechamento necessário