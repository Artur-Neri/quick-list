const form = document.querySelector('#shopping-list');
const itemDescriptionInput = document.querySelector('#new-item_description');

const itemsList = document.querySelector('#list');

let dbItemsList = [];

function clearFields() {
    itemDescriptionInput.value = '';
}

function handleCheckBoxClick(element) {
    const itemIndex = Array.from(itemsList.children).indexOf(element.parentElement);
    if (dbItemsList[itemIndex].checked) {
        dbItemsList[itemIndex].checked = false;
    } else {
        dbItemsList[itemIndex].checked = true;
    }
    element.classList.toggle('list__item-check--checked');
    
    saveNewList();
}

function handleDeleteButton(deleteBtn) {
    const itemIndex = Array.from(itemsList.children).indexOf(deleteBtn.parentElement);
    dbItemsList.splice(itemIndex, 1);
    deleteBtn.parentElement.remove();
    
    saveNewList();
}

function addNewItem(itemDescription) {
    const newItem = {
        description: itemDescription,
        checked: false
    }

    addToDb(newItem);
    addToHtml(newItem);

    saveNewList();
}

function saveNewList() {    
    localStorage.setItem("dbShoppingList", JSON.stringify(dbItemsList));
}

function addToDb(item) {
    dbItemsList.push(item);
}

function addToHtml(item) {
    const newItem = document.createElement('li');
    newItem.classList.add('list__item');

    const checkBox = document.createElement('span');
    checkBox.classList.add('list__item-check');

    if (item.checked) {
        checkBox.classList.add('list__item-check--checked');
    }

    const newItemDescription = document.createElement('span');
    newItemDescription.textContent = item.description;
    newItemDescription.classList.add('list__item-description');

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('list__item-delete');

    const deleteButtonIcon = document.createElement('img');
    deleteButtonIcon.src = './assets/images/delete.svg';
    deleteButtonIcon.alt = 'Delete Icon';
    deleteButtonIcon.width = '16';

    deleteButton.append(deleteButtonIcon);

    newItem.append(checkBox, newItemDescription, deleteButton);

    itemsList.append(newItem);
}

function handleFormSubmit() {
    const itemDescription = itemDescriptionInput.value;

    if (itemDescription !== '' ){
        addNewItem(itemDescription);
    }
}

function readShoppingListFromDb() {
    const dbShoppingList = localStorage.getItem("dbShoppingList");
    if (dbShoppingList) {
        dbItemsList = JSON.parse(dbShoppingList);
    }
}

function init() {
    readShoppingListFromDb();
    if (dbItemsList.length > 0) {
        dbItemsList.forEach(element => {
            addToHtml(element)
        });
    }
}

init()

form.addEventListener('submit', (e)=> {
    e.preventDefault()
    handleFormSubmit();
    clearFields();
})

itemsList.addEventListener('click', (e)=>{
    if (e.target.classList.contains('list__item-check')) {
        handleCheckBoxClick(e.target);
    } else if ((e.target.classList.contains('list__item-delete')) || (e.target.parentElement.classList.contains('list__item-delete'))) {
        handleDeleteButton(e.target.parentElement);
    }
})