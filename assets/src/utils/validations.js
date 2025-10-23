export function isValidItemName(itemName) {
    return itemName !== '';
}

export function clickedOnCheckbox(event) {
    return event.target.classList.contains('list__item-check')
}

export function clickedOnDeleteButton(event) {
    return event.target.closest('.list__item-delete');
}