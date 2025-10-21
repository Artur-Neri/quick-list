const form = document.querySelector('#shopping-list');
const itemDescriptionInput = document.querySelector('#new-item_description');

const itemsList = document.querySelector('#list');

function clearFields() {
    itemDescriptionInput.value = '';
}

function handleCheckBoxClick(element) {
    element.classList.toggle('list__item-check--checked');
}

function handleDeleteButton(deleteBtn) {
    deleteBtn.parentElement.remove()
}

function addNewItem(itemDescription) {
    const newItem = document.createElement('li');
    newItem.classList.add('list__item');

    const checkBox = document.createElement('span');
    checkBox.classList.add('list__item-check');

    const newItemDescription = document.createElement('span');
    newItemDescription.textContent = itemDescription;
    newItemDescription.classList.add('list__item-description');

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('list__item-delete');

    const deleteButtonIcon = document.createElement('img');
    deleteButtonIcon.src = './assets/images/delete.svg';
    deleteButtonIcon.alt = 'Delete Icon';
    deleteButtonIcon.width = '32';

    deleteButton.append(deleteButtonIcon);

    newItem.append(checkBox, newItemDescription, deleteButton);

    itemsList.append(newItem);
}

function handleFormSubmit() {
    if (itemDescriptionInput.value !== '' ){
        addNewItem(itemDescriptionInput.value);
    }
}

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