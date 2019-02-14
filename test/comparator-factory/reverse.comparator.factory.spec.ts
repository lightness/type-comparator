import {createReverseComparator} from "../../src/comparator-factory/reverse.comparator.factory";

describe(`ReverseComparator`, () => {

    test(`should return -1, when original comparator returns 1`, () => {
        const comporatorMock = (a: any, b: any) => 1;
        const reverseComparator = createReverseComparator(comporatorMock);

        const actual = reverseComparator(1, 1);
        const expected = -1;

        expect(actual).toBe(expected);
    });

    test(`should return 1, when original comparator returns -1`, () => {
        const comporatorMock = (a: any, b: any) => -1;
        const reverseComparator = createReverseComparator(comporatorMock);

        const actual = reverseComparator(1, 1);
        const expected = 1;

        expect(actual).toBe(expected);
    });

    test(`should return 0, when original comparator returns 0`, () => {
        const comporatorMock = (a: any, b: any) => 0;
        const reverseComparator = createReverseComparator(comporatorMock);

        const actual = reverseComparator(1, 1);
        const expected = 0;

        expect(actual).toBe(expected);
    });

});
