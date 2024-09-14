export function generateRangeArray(range: number) {
    return Array.from({ length: range }, (_, index) => index + 1);
}
