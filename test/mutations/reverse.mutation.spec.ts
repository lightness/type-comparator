import { reverse } from "../../src";

describe(`mutation:reverse`, () => {

    const originalComparator = (a, b) => a - b;
    const reversedComparator = reverse(originalComparator);

    test(`should return negative value, when original comparator returns positive one`, () => {
        const args: [number, number] = [5, 1];

        expect(originalComparator(...args)).toBeGreaterThan(0);
        expect(reversedComparator(...args)).toBeLessThan(0);
    });

    test(`should return positive value, when original comparator returns negative one`, () => {
        const args: [number, number] = [1, 5];

        expect(originalComparator(...args)).toBeLessThan(0);
        expect(reversedComparator(...args)).toBeGreaterThan(0);
    });

    test(`should return zero, when original comparator returns zero`, () => {
        const args: [number, number] = [1, 1];

        expect(originalComparator(...args)).toBe(0);
        expect(reversedComparator(...args)).toBe(0);
    });

});
