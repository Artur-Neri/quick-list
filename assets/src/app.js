import { clearNewItemInput, showHint, hideHint } from './utils/uiHelpers.js';
import { isValidItemName, clickedOnCheckbox, clickedOnDeleteButton } from './utils/validations.js';

function addItem(shoppingList, itemName) {
    const newItem = {
        id: Date.now(),
        name: itemName,
        checked: false,
    }

    shoppingList.push(newItem); // Adding to database
    localStorage.setItem('storedDataBase', JSON.stringify(localDataBase));

    renderShoppingList(shoppingList);
}

function getItemById(shoppingList, itemId) {
    return shoppingList.find(item => item.id == itemId);
}

function removeItemById(shoppingList, itemId) {
    const item = getItemById(shoppingList, itemId);
    const itemIndex = shoppingList.indexOf(item);
    shoppingList = shoppingList.splice(itemIndex, 1);
}

function renderShoppingList(shoppingList) {
    const itemsList = document.getElementById('list');
    itemsList.innerHTML = '';

    shoppingList.forEach(shopItem => {
        const newItem = document.createElement('li');
        newItem.classList.add('list__item');
        newItem.setAttribute('data-id', shopItem.id);

        const checkBox = document.createElement('span');
        checkBox.classList.add('list__item-check');

        if (shopItem.checked) {
            checkBox.classList.add('list__item-check--checked');
        }

        const newItemDescription = document.createElement('span');
        newItemDescription.textContent = shopItem.name;
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
    });    
}

function handleCheckClick(checkBoxElement) {
    const listItem = checkBoxElement.closest('.list__item');
    const itemId = listItem.getAttribute('data-id');
    const item = getItemById(localDataBase.shoppingList, itemId);
    item.checked = !item.checked;
    
    localStorage.setItem('storedDataBase', JSON.stringify(localDataBase));
}

function handleDeleteClick(deleteButtonElement) {
    const listItem = deleteButtonElement.closest('.list__item');
    const itemId = listItem.getAttribute('data-id');
    removeItemById(localDataBase.shoppingList, itemId);
    
    localStorage.setItem('storedDataBase', JSON.stringify(localDataBase));
}

function initForm() {
    const form = document.getElementById('shopping-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (isValidItemName()) {
            hideHint();
            const newItemNameField = document.getElementById('new-item_description');
            addItem(localDataBase.shoppingList, newItemNameField.value.trim());
            clearNewItemInput(newItemNameField);
        } else {
            showHint();
        }
    });
}

function initShoppingList(){
    renderShoppingList(localDataBase.shoppingList);

    const itemsList = document.getElementById('list');
    
    itemsList.addEventListener('click', (event) => {
        if (clickedOnCheckbox(event)) {
            handleCheckClick(event.target);
            renderShoppingList(localDataBase.shoppingList);
        } else if (clickedOnDeleteButton(event)) {
            handleDeleteClick(event.target);
            renderShoppingList(localDataBase.shoppingList);
        }
    });
}

function loadLocalDataBase() {
    return localStorage.getItem('storedDataBase') ?
           JSON.parse(localStorage.getItem('storedDataBase')) :
           { shoppingList: [] };
}

let localDataBase = loadLocalDataBase();

initForm();
initShoppingList();