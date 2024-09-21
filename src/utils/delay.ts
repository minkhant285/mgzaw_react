export function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Delayed for ${ms} milliseconds`);
        }, ms);
    });
}
