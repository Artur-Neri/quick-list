import { isValidItemName } from "./validations";

test('function returns true for non-empty string', () => {
    expect(isValidItemName('Chocolate')).toBe(true);
});

test('function returns false for empty string', () => {
    expect(isValidItemName('')).toBe(false);
});