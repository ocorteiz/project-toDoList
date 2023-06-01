const inputTarefa = document.querySelector('.inputTarefa')
const btnTarefa = document.querySelector('.btnTarefa')
const ulTarefa = document.querySelector('.ulTarefa')

function criaLi() {
    const li = document.createElement('li')
    return li
}

function limparInput() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaBtnApagar (li) {
    li.innerText += ' '
    const btnApagar = document.createElement('button')
    btnApagar.innerText = 'APAGAR'
    li.appendChild(btnApagar)
    btnApagar.setAttribute('class','apagar')
}

function criaTarefa (textoInput) {
    const li = criaLi()
    li.innerText = textoInput
    ulTarefa.appendChild(li)
    limparInput()
    criaBtnApagar(li)
    salvarTerafa()
}

btnTarefa.addEventListener('click', () => {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
})

inputTarefa.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

document.addEventListener('click', (event) => {
    const e = event.target

    if (e.classList.contains('apagar')) {
        e.parentElement.remove()
        salvarTerafa()
    }
})

function salvarTerafa () {
    const listaDeTarefas = document.querySelectorAll('li')
    const arrayDeTerafas = []

    for (tarefas of listaDeTarefas) {
        let tarefasTexto = tarefas.innerText
        tarefasTexto = tarefasTexto.replace('APAGAR', '').trim()
        arrayDeTerafas.push(tarefasTexto)
    }
    const tarefasJSON = JSON.stringify(arrayDeTerafas)
    localStorage.setItem('tarefas',tarefasJSON)
}

(function () {
    const tarefasJSON = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefasJSON)

    for (tarefas of listaDeTarefas) {
        criaTarefa(tarefas)
    }
})()