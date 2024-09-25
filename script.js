const inputEl = (document.getElementsByClassName('app__controls-input'))[0];
const btnEl = (document.getElementsByClassName('app__controls-button'))[0];
const listEl = (document.getElementsByClassName('app__list'))[0];

let counter = 1;

function loadData() {
    const savedData = localStorage.getItem('tasks');
    return savedData ? JSON.parse(savedData) : [];
}

const data = loadData();

data.forEach((item) => {
    if (item.id >= counter) {
        counter = item.id + 1;
    }
});

function saveData() {
    localStorage.setItem('tasks', JSON.stringify(data));
}

function createTask(objectData) {
    const root = document.createElement('div');
    root.classList.add('app__list-item');

    if (objectData.isDone) {
        root.classList.add('app__list-item_done');
    }

    const input = document.createElement('input');
    input.classList.add('app__list-checkbox');
    input.type = 'checkbox';

    if (objectData.isDone) {
        input.checked = true;
    }

    const txt = document.createElement('p');
    txt.classList.add('app__list-item-txt');
    txt.innerText = objectData.text;

    const btn = document.createElement('button');
    btn.classList.add('app__list-btn');

    const img = document.createElement('img');
    img.src = '/images/image_trash-bin.svg';
    img.alt = '';

    btn.appendChild(img);

    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteTask(objectData.id);
    });

    root.addEventListener('click', () => toggleTaskState(objectData.id));

    root.appendChild(input);
    root.appendChild(txt);
    root.appendChild(btn);

    return root;
}

function deleteTask(id) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        saveData();
        render();
    }
}

function toggleTaskState(id) {
    const task = data.find(item => item.id === id);
    if (task) {
        task.isDone = !task.isDone;
        saveData();
        render();
    }
}

btnEl.addEventListener('click', () => {
    const textValue = inputEl.value;
    data.push({
        id: counter++,
        text: textValue,
        isDone: false
    });
    saveData();
    render();
    
    inputEl.value = '';
});

function render() {
    listEl.innerHTML = '';
    for (let item of data) {
        const tmpEl = createTask(item);
        listEl.appendChild(tmpEl);
    } 
}

render();
