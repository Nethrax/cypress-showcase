export function headers (token) {
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
}

export function generateRandomHexString() {
    const randomDecimal = (Math.random() + 1).toString(16).substring(2, 8);
    const randomHex = "0".repeat(6 - randomDecimal.length) + randomDecimal;
    return randomHex;
}

export const generateStringOfLength = (length) => {
    return 'a'.repeat(length);
}