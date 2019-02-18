import { condition } from "../../src";

describe(`mutation:condition`, () => {

    const originalComparator = (a, b) => a - b;
    const conditionFn = (x) => x % 2 === 0;
        
    test(`should return positive value, if first arg satisfies condition and second arg not`, () => {
        const resultComparator = condition(conditionFn, originalComparator);

        const args: [number, number] = [-2, 1];

        expect(conditionFn(args[0])).toBe(true);
        expect(conditionFn(args[1])).toBe(false);

        expect(resultComparator(...args)).toBeGreaterThan(0);
    });

    test(`should return negative value, if second arg satisfies condition and first arg not`, () => {
        const resultComparator = condition(conditionFn, originalComparator);

        const args: [number, number] = [1, 0];

        expect(conditionFn(args[0])).toBe(false);
        expect(conditionFn(args[1])).toBe(true);

        expect(resultComparator(...args)).toBeLessThan(0);
    });

    test(`should apply original comparator, if both args satisfy condition`, () => {
        const originalComparatorMock = jest.fn(originalComparator);
        const resultComparator = condition(conditionFn, originalComparatorMock);

        const args: [number, number] = [-2, 2];

        expect(conditionFn(args[0])).toBe(true);
        expect(conditionFn(args[1])).toBe(true);

        const result = resultComparator(...args);

        expect(originalComparatorMock).toBeCalledTimes(1);
        expect(originalComparatorMock).toBeCalledWith(...args);
        expect(originalComparatorMock).toReturnWith(result);
    });

    test(`should apply original comparator, if both args doesn't satisfy condition`, () => {
        const originalComparatorMock = jest.fn(originalComparator);
        const resultComparator = condition(conditionFn, originalComparatorMock);

        const args: [number, number] = [1, -23];

        expect(conditionFn(args[0])).toBe(false);
        expect(conditionFn(args[1])).toBe(false);

        const result = resultComparator(...args);

        expect(originalComparatorMock).toBeCalledTimes(1);
        expect(originalComparatorMock).toBeCalledWith(...args);
        expect(originalComparatorMock).toReturnWith(result);
    });

});
