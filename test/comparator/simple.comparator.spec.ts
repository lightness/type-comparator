import {SimpleComparator} from "../../src/comparator/simple.comparator";

describe(`SimpleComparator should compare numbers`, () => {

    test(`should return 1, if first arg is greater`, () => {
        const actual = SimpleComparator(5, 1);
        const expected = 1;

        expect(actual).toBe(expected);
    });

    test(`should return -1, if second arg is greater`, () => {
        const actual = SimpleComparator(1, 5);
        const expected = -1;

        expect(actual).toBe(expected);
    });

    test(`should return 0, if args is equal`, () => {
        const actual = SimpleComparator(5, 5);
        const expected = 0;

        expect(actual).toBe(expected);
    });

});

describe(`SimpleComparator should compare strings`, () => {

    test(`should return 1, if first arg is greater`, () => {
        const actual = SimpleComparator('x', 'a');
        const expected = 1;

        expect(actual).toBe(expected);
    });

    test(`should return -1, if second arg is greater`, () => {
        const actual = SimpleComparator('a', 'x');
        const expected = -1;

        expect(actual).toBe(expected);
    });

    test(`should return 0, if args is equal`, () => {
        const actual = SimpleComparator('x', 'x');
        const expected = 0;

        expect(actual).toBe(expected);
    });
    
});
