let id, idForm, nomeForm, dependForm, salarioForm;
const sURL = 'http://localhost:8081/api/funcionarios/';

window.onload = async function (e) {
    const query = window.location.search;
    const parametros = new URLSearchParams(query);
    id = parametros.get('id');

    idForm = document.querySelector('#iID');
    nomeForm = document.querySelector('#iNome');
    dependForm = document.querySelector('#iDependentes');
    salarioForm = document.querySelector('#iSalario');

    const funcionario = await buscarFuncionario(id);
    preencherForm(funcionario);
};

function preencherForm(funcionario) {
    idForm.value = funcionario.id;
    nomeForm.value = funcionario.nome;
    dependForm.value = funcionario.dependentes;
    salarioForm.value = funcionario.salario;
}

async function buscarFuncionario(id) {
    const resposta = await axios.get(sURL + id);

    return resposta.data;
}

async function alterarFuncionario() {
    const id = idForm.value;
    const nome = nomeForm.value; 
    const dependentes = dependForm.value;
    const salario = salarioForm.value;

    axios.put(sURL, { id, nome, dependentes, salario })
        .then(res => {
            alert(JSON.stringify(res.data));
            console.log(res.data);
            setTimeout(() => window.location.href = '/', 100);
        })
        .catch(res => console.log(res.response.data));
}