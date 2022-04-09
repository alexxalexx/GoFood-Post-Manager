const container = document.querySelector('.container');

const addBtn = document.querySelector('.add-card');

const deleteBtn = document.querySelector('.delete-cards')

const h1Input = document.querySelector('.h1-input');

const pInput = document.querySelector('.p-input');

const LS_KEY = 'cards';

addBtn.addEventListener('click', () => {
    container.append(createCard({ shouldSave: true }))
});

deleteBtn.addEventListener('click', () => {
    localStorage.clear();
})

function loadData() {
    const data = JSON.parse(localStorage.getItem(LS_KEY)) || [];

    data.forEach((item) => {
        const card = createCard(item);
        container.append(card);
    })
}

loadData()
function getRandomFromArray(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index]
}

function createCard(params = {}) {
    const {title, description, shouldSave = false } = params;

    const el = document.createElement('div');
    el.classList.add('card-div')

    const h1 = document.createElement('h1');

    h1.textContent = title || h1Input.value;

    const p = document.createElement('p');

    p.textContent = description || pInput.value;

    if (shouldSave) {
        const oldData = JSON.parse(localStorage.getItem(LS_KEY)) || [];

        oldData.push({ title: h1.textContent, description: p.textContent })

        localStorage.setItem(LS_KEY, JSON.stringify(

            oldData
        ))
    }
    el.append(h1, p);
    return el;
}