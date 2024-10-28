export function generateRangeArray(range: number, start: number = 1) {
    return Array.from({ length: range }, (_, index) => index + start);
}
