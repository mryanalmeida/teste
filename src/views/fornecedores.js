/**
 * Processo de Renderização: 
 * fornecedores.html
 */

const foco = document.getElementById('searchSupplier')

// Mudar as propriedades do documento html ao iniciar a janela
document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true
    btnDelete.disabled = true
    foco.focus()
    // Desativar o input das caixas de texto denro da div .bloqueio
    /*
    document.querySelectorAll('.bloqueio input').forEach(input => {
        input.disabled = true
    })
    */

    // Aviso (pop-up)
    //api.avisoCliente()
})

// Função para manipular o evento da tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarFornecedor()
    }
}

// Função para remover o manipulador do evento da tecla Enter
function restaurarEnter() {
    document.getElementById('frmSupplier').removeEventListener('keydown', teclaEnter)
}
// Manipulando o evento (tecla Enter)
document.getElementById('frmSupplier').addEventListener('keydown', teclaEnter)

// Array usado nós métodos para manipulação da estrutura de dados
let arrayFornecedor = []

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Passo 1 - slide (capturar os dados dos inputs form)
let formFornecedor = document.getElementById('frmSupplier')
let idFornecedor = document.getElementById('inputIdSupplier')
let nomeFornecedor = document.getElementById('inputNameSupplier')
let cnpjFornecedor = document.getElementById('inputCnpjSupplier')
let foneFornecedor = document.getElementById('inputPhoneSupplier')
let siteFornecedor = document.getElementById('inputSiteSupplier')
let cepFornecedor = document.getElementById('inputCepSupplier')
let cidadeFornecedor = document.getElementById('inputCitySupplier')
let estadoFornecedor = document.getElementById('inputStateSupplier')
let enderecoFornecedor = document.getElementById('inputStreetSupplier')
let numeroFornecedor = document.getElementById('inputNumberSupplier')
let complementoFornecedor = document.getElementById('inputComplementSupplier')
let bairroFornecedor = document.getElementById('inputNeighborhoodSupplier')

// CRUD Create/Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Evento associado ao botão adicionar (quando o botão for pressionado)
formFornecedor.addEventListener('submit', async (event) => {
    // Evitar o comportamento padrão de envio em um form
    event.preventDefault()
    // Teste importante! (fluxo dos dados)
    console.log(idFornecedor.value, nomeFornecedor.value, cnpjFornecedor.value, foneFornecedor.value, siteFornecedor.value, cepFornecedor.value, cidadeFornecedor.value, estadoFornecedor.value, enderecoFornecedor.value, numeroFornecedor.value, complementoFornecedor.value, bairroFornecedor.value)

    // Passo 2 - slide (envio das informações para o main).
    // Estratégia para determinar se é um novo cadastro de fornecedores ou a edição de um fornecedor já existente.
    if (idFornecedor.value === "") {
        // Criar um objeto.
        const fornecedor = {
            nomeFor: nomeFornecedor.value,
            cnpjFor: cnpjFornecedor.value,
            foneFor: foneFornecedor.value,
            siteFor: siteFornecedor.value,
            cepFor: cepFornecedor.value,
            cidadeFor: cidadeFornecedor.value,
            estadoFor: estadoFornecedor.value,
            enderecoFor: enderecoFornecedor.value,
            numeroFor: numeroFornecedor.value,
            complementoFor: complementoFornecedor.value,
            bairroFor: bairroFornecedor.value
        }
        api.novoFornecedor(fornecedor)
    } else {
        // Criar um novo objeto com o ID do fornecedor.
        const fornecedor = {
            idFor: idFornecedor.value,
            nomeFor: nomeFornecedor.value,
            cnpjFor: cnpjFornecedor.value,
            foneFor: foneFornecedor.value,
            siteFor: siteFornecedor.value,
            cepFor: cepFornecedor.value,
            cidadeFor: cidadeFornecedor.value,
            estadoFor: estadoFornecedor.value,
            enderecoFor: enderecoFornecedor.value,
            numeroFor: numeroFornecedor.value,
            complementoFor: complementoFornecedor.value,
            bairroFor: bairroFornecedor.value
        }
        api.editarFornecedor(fornecedor)
    }
})
// Fim do CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscarFornecedor() {
    // Passo 1 (slides)
    let forNome = document.getElementById('searchSupplier').value
    // Validação
    if (forNome === "") {
        api.validarBusca() // Validação do campo obrigatório.
        foco.focus()
    } else {
        //console.log(forNome) // Teste do passo 1.
        // Passo 2 (slide) - enviar o pedido de busca do fornecedor ao main.
        api.buscarFornecedor(forNome)
        // Passo 5 - Recebimento dos dados do fornecedor.
        api.renderizarFornecedor((event, dadosFornecedor) => {
            // Teste de recebimento dos dados do fornecedor.
            console.log(dadosFornecedor)
            // Passo 6 (slide): renderização dos dados do fornecedor no formulário.
            const fornecedorRenderizado = JSON.parse(dadosFornecedor)
            arrayFornecedor = fornecedorRenderizado
            // Teste para entendimento da lógica.
            console.log(arrayFornecedor)
            // Percorrer o array de fornecedores, extrair os dados e setar (preencher) os campos do formulário.
            arrayFornecedor.forEach((c) => {
                document.getElementById('inputNameSupplier').value = c.nomeFornecedor
                document.getElementById('inputCnpjSupplier').value = c.cnpjFornecedor
                document.getElementById('inputPhoneSupplier').value = c.foneFornecedor
                document.getElementById('inputSiteSupplier').value = c.siteFornecedor
                document.getElementById('inputCepSupplier').value = c.cepFornecedor
                document.getElementById('inputCitySupplier').value = c.cidadeFornecedor
                document.getElementById('inputStateSupplier').value = c.estadoFornecedor
                document.getElementById('inputStreetSupplier').value = c.enderecoFornecedor
                document.getElementById('inputNumberSupplier').value = c.numeroFornecedor
                document.getElementById('inputComplementSupplier').value = c.complementoFornecedor
                document.getElementById('inputNeighborhoodSupplier').value = c.bairroFornecedor
                document.getElementById('inputIdSupplier').value = c._id
                // Limpar o campo de busca e remover o foco.
                foco.value = ""
                // Validação e correção de BUGs.
                foco.disabled = true
                btnRead.disabled = true
                // Desativar o botão adicionar.
                btnCreate.disabled = true
                //foco.blur()
                // Liberar os botões editar e excluir.
                document.getElementById('btnUpdate').disabled = false
                document.getElementById('btnDelete').disabled = false
                // Restaurar o padrão da tecla Enter.
                restaurarEnter()
                // Reativar os inputs das caixas de textos.
                /*
                document.querySelectorAll('.bloqueio input').forEach(input => {
                    input.disabled = false
                })
                    */
            })
        })
    }
    // Setar o nome do fornecedor e liberar o botão adicionar.
    api.setarNomeFornecedor(() => {
        // Setar o nome do fornecedor.      
        let campoNome = document.getElementById('searchSupplier').value
        document.getElementById('inputNameSupplier').focus()
        document.getElementById('inputNameSupplier').value = campoNome
        // Limpar o campo de busca e remover o foco.
        foco.value = ""
        foco.blur()
        // Restaurar o padrão da tecla Enter.
        restaurarEnter()
        // Reativar os inputs das caixas de textos.
        /*
        document.querySelectorAll('.bloqueio input').forEach(input => {
            input.disabled = false
        })
        */
    })
}
// Fim CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Função para buscar o CEP
function buscarCep(cep) {
    // Verifica se o CEP possui 8 caracteres (ex: 12345678)
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    console.error("CEP não encontrado.")
                } else {
                    // Preenche os campos do formulário com os dados do CEP
                    document.getElementById('inputStreetSupplier').value = data.logradouro || ""
                    document.getElementById('inputNeighborhoodSupplier').value = data.bairro || ""
                    document.getElementById('inputCitySupplier').value = data.localidade || ""
                    document.getElementById('inputStateSupplier').value = data.uf || ""
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar CEP:", erro)
            })
    }
}

// Função para formatar CEP (XXXXX-XXX)
function formatarCEP(input) {
    let value = input.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o hífen após os 5 primeiros números
    }
    input.value = value
}

// Evento: Formatar e buscar CEP ao digitar
document.getElementById('inputCepSupplier').addEventListener('input', function () {
    formatarCEP(this) // Aplica a formatação
    const cep = this.value.replace(/\D/g, '') // Remove qualquer caractere não numérico
    if (cep.length === 8) {  // Se o CEP já tiver 8 caracteres
        buscarCep(cep)
    }
});

// Evento: Buscar CEP ao perder o foco
document.getElementById('inputCepSupplier').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (cep.length === 8) {
        buscarCep(cep)
    }
});

// Função para formatar CNPJ (XX.XXX.XXX/XXXX-XX)
function formatarCNPJ(input) {
    let value = input.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (value.length > 2) {
        value = value.replace(/(\d{2})(\d)/, '$1.$2')
    }
    if (value.length > 5) {
        value = value.replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    }
    if (value.length > 8) {
        value = value.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    }
    if (value.length > 12) {
        value = value.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
    }
    input.value = value;
}

// Aplicar a formatação de CNPJ ao digitar
document.getElementById('inputCnpjSupplier').addEventListener('input', function () {
    formatarCNPJ(this);  // Aplica a formatação ao campo de CNPJ
})

// Formatar Telefone (DDD + Número)
function formatarTelefone(input) {
    let value = input.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (value.length > 2) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2')
    }
    if (value.length > 7) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
    }
    input.value = value
}

// Aplicar eventos para CNPJ e Telefone
document.getElementById('inputCnpjSupplier').addEventListener('input', function () {
    formatarCNPJ(this)
})

document.getElementById('inputPhoneSupplier').addEventListener('input', function () {
    formatarTelefone(this)
})

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirFornecedor() {
    api.deletarFornecedor(idFornecedor.value) // Passo 1 do slide
}
// Fim CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    resetForm()
})

function resetForm() {
    // Recarregar a página.
    location.reload()
}
// Fim - resetForm <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//acessar site
function acessarSite() {
    let urlFornecedor = document.getElementById('inputSiteSupplier').value
    //console.log(urlFornecedor)
    const url = {
        url: urlFornecedor
    }
    //enviar ao main a url do  site
    api.abrirSite(url)
}