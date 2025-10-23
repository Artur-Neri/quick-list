export function isValidItemName() {
    const newItemName = document.getElementById('new-item_description').value.trim();
    return newItemName !== '';
}

export function clickedOnCheckbox(event) {
    return event.target.classList.contains('list__item-check')
}

export function clickedOnDeleteButton(event) {
    return event.target.closest('.list__item-delete');
}