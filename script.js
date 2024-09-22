const inputEl = (document.getElementsByClassName('app__controls-input'))[0]
const btnEl = (document.getElementsByClassName('app__controls-button'))[0]
const listEl = (document.getElementsByClassName('app__list'))[0]

let counter = 1

const data = []

data.forEach((item) => {
    if (item.id > counter) {
        counter = item.id + 1
    }
})

if (counter > 1) {
    counter++
}

function createTask(objectData) {
    const root = document.createElement('div')
    root.classList.add('app__list-item')

    if (objectData.isDone) {
        root.classList.add('app__list-item_done')
    }

    const input = document.createElement('input')
    input.classList.add('app__list-checkbox')
    input.type = 'checkbox'

    if (objectData.isDone) {
        input.checked = true
    }

    const txt = document.createElement('p')
    txt.classList.add('app__list-item-txt')
    txt.innerText = objectData.text

    const btn = document.createElement('button')
    btn.classList.add('app__list-btn')

    const img = document.createElement('img')
    img.src = '/images/image_trash-bin.svg'
    img.alt = ''

    btn.appendChild(img)

    root.appendChild(input)
    root.appendChild(txt)
    root.appendChild(btn)

    return root
}

btnEl.addEventListener('click', () => {
    const textValue = inputEl.value
    data.push({
        id: counter++,
        text: textValue,
        isDone: false
    })
    render()
    console.log(data);
    
    inputEl.value = ''
})

function render() {
    listEl.innerHTML = ''
    for (let item of data) {
        const tmpEl = createTask(item)
        listEl.appendChild(tmpEl)
    } 
}

render()

