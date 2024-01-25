export const dataDefaults = {
    item: () => ({
        id: generateRandomHexString(),
        name: generateRandomHexString(),
        note: 'Default note from cypress'
    }),
};