import { queue, asc } from "../../src";

describe(`mutation:queue`, () => {
    
    const originalComparator1 = (a, b) => asc(a % 2, b % 2);
    const originalComparator2 = (a, b) => asc(a, b);

    test(`should apply only first comparator, if it returns non-zero value`, () => {
        const originalComparator1Mock = jest.fn(originalComparator1);
        const originalComparator2Mock = jest.fn(originalComparator2);
        
        const comparartor = queue([
            originalComparator1Mock,
            originalComparator2Mock
        ]);

        const args: [number, number] = [3, 10];

        const result = comparartor(...args);

        expect(originalComparator1Mock).toBeCalledTimes(1);
        expect(originalComparator1Mock).toBeCalledWith(...args);
        expect(originalComparator1Mock).toReturnWith(result);

        expect(originalComparator2Mock).toBeCalledTimes(0);
    });

    test(`should apply second comparator, if first one returns zero`, () => {
        const originalComparator1Mock = jest.fn(originalComparator1);
        const originalComparator2Mock = jest.fn(originalComparator2);
        
        const comparartor = queue([
            originalComparator1Mock,
            originalComparator2Mock
        ]);

        const args: [number, number] = [30, 10];

        const result = comparartor(...args);

        expect(originalComparator1Mock).toBeCalledTimes(1);
        expect(originalComparator1Mock).toBeCalledWith(...args);
        expect(originalComparator1Mock).toReturnWith(0);

        expect(originalComparator2Mock).toBeCalledTimes(1);
        expect(originalComparator2Mock).toBeCalledWith(...args);
        expect(originalComparator2Mock).toReturnWith(result);
    });

});
