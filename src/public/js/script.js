/**
 * Busca de CEP Automatica
 * @author Marcos Almeida 
 */

function buscarEndereco() {
    let cep = document.getElementById('inputCepClient').value; // Corrigido para usar o campo correto
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`

    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            document.getElementById('inputStreetClient').value = dados.logradouro || ''
            document.getElementById('inputNeighborhoodClient').value = dados.bairro || ''
            document.getElementById('inputCityClient').value = dados.localidade || ''
            document.getElementById('inputStateClient').value = dados.uf || ''
        })
        .catch(error => console.error('Erro ao buscar o endereço:', error))
}

// Formatar CEP
function formatarCEP(input) {
    let value = input.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o hífen
    }
    input.value = value
}

// Formatar CPF
function formatarCPF(input) {
    let value = input.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (value.length > 11) {
        value = value.substring(0, 11) // Limita a 11 dígitos
    }
    value = value.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
    value = value.replace(/(\d{2})$/, '-$1') // Adiciona o hífen
    input.value = value;
}

// Validação de CPF
function validarCPF(input) {
    function validarCPF(cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
    
        // Verificar se o CPF tem 11 caracteres
        if (cpf.length !== 11) {
            return false;
        }
    
        // Verificar se o CPF é uma sequência de números repetidos (ex: 111.111.111-11)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
    
        // Validar o primeiro dígito verificador
        let soma = 0;
        let peso = 10;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;
        if (parseInt(cpf[9]) !== digito1) {
            return false;
        }
    
        // Validar o segundo dígito verificador
        soma = 0;
        peso = 11;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;
        if (parseInt(cpf[10]) !== digito2) {
            return false;
        }
    
        return true;
    }
    
    const cpf = input.value; // Pega o valor do input
    const campoCpf = document.getElementById('inputCpfClient');
    
    if (!validarCPF(cpf)) {
        campoCpf.style.borderColor = 'red'; // Destaca o campo em vermelho
        campoCpf.setCustomValidity("CPF inválido!"); // Define uma mensagem de erro customizada
    } else {
        campoCpf.style.borderColor = 'green'; // Destaca o campo em verde
        campoCpf.setCustomValidity(""); // Limpa qualquer mensagem de erro
    }
}

// Função para validar o CNPJ
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
        return false; // CNPJ inválido (sequência de números iguais)
    }

    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj[i]) * peso;
        peso = (peso === 9) ? 2 : peso + 1;
    }

    let resto = soma % 11;
    let digito1 = (resto < 2) ? 0 : 11 - resto;
    if (parseInt(cnpj[12]) !== digito1) {
        return false;
    }

    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj[i]) * peso;
        peso = (peso === 9) ? 2 : peso + 1;
    }

    resto = soma % 11;
    let digito2 = (resto < 2) ? 0 : 11 - resto;
    if (parseInt(cnpj[13]) !== digito2) {
        return false;
    }

    return true;
}

// Formatar Celular
function formatarCelular(input) {
    let value = input.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3') // Adiciona parênteses e hífen
    } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3') // Adiciona parênteses e hífen
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})/, '($1) ') // Adiciona parênteses
    }
    input.value = value;
}

function verificarCampos() {
    const camposObrigatorios = [
        'inputNameClient', 'inputPhoneClient', 'inputEmailClient', 'inputCepClient',
        'inputStreetClient', 'inputCityClient', 'inputStateClient', 'inputNumberClient', 'inputComplementClient', 'inputNeighborhoodClient'
    ];
    let camposVazios = []

    // Verifica se os campos obrigatórios estão preenchidos
    camposObrigatorios.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (!elemento.value.trim()) {
            camposVazios.push(campo)
            elemento.style.borderColor = 'red' // Destaca o campo vazio
        } else {
            elemento.style.borderColor = '' // Remove o destaque caso preenchido
        }
    })

    if (camposVazios.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios.')
    } else {
        alert('Todos os campos foram preenchidos corretamente!')
        // Aqui você pode adicionar a lógica para salvar os dados
    }
}