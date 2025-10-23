export function showHint() {
    const hint = document.querySelector('.hint');
    hint.classList.remove('hint--hidden');
}

export function hideHint() {
    const hint = document.querySelector('.hint');
    hint.classList.add('hint--hidden');
}

export function clearNewItemInput(itemInputField) {
    itemInputField.value = '';
}