import { selectors as componentSelectors } from '../../component/support/selectors';

const {
    starIcon,
} = componentSelectors;

const items = {
    item: '[data-test=item]',
    starredItem: '[data-test=starred-item]',
    message: '[data-test=message-box]',
}

const newItem = {
    createButton: '[data-test=new-item-button]',
    title: '[data-test=new-item-title]',
    name: '[data-test=new-item-name]',
    note: '[data-test=new-item-note]',
    validationMessage: '[data-test=validation-message]',
    save: '[data-test=save-button]'
}

const login = {
    usernameInput: '[data-test=username-input]',
    passwordInput: '[data-test=password-input]'
}

export const selectors = {
    starIcon,
    items,
    newItem,
    login,
}