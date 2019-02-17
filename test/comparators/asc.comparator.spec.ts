import {asc} from "../../src/comparators/asc.comparator";

describe(`asc should compare numbers`, () => {

    test(`should return 1, if first arg is greater`, () => {
        const actual = asc(5, 1);
        const expected = 1;

        expect(actual).toBe(expected);
    });

    test(`should return -1, if second arg is greater`, () => {
        const actual = asc(1, 5);
        const expected = -1;

        expect(actual).toBe(expected);
    });

    test(`should return 0, if args is equal`, () => {
        const actual = asc(5, 5);
        const expected = 0;

        expect(actual).toBe(expected);
    });

});

describe(`asc should compare strings`, () => {

    test(`should return 1, if first arg is greater`, () => {
        const actual = asc('x', 'a');
        const expected = 1;

        expect(actual).toBe(expected);
    });

    test(`should return -1, if second arg is greater`, () => {
        const actual = asc('a', 'x');
        const expected = -1;

        expect(actual).toBe(expected);
    });

    test(`should return 0, if args is equal`, () => {
        const actual = asc('x', 'x');
        const expected = 0;

        expect(actual).toBe(expected);
    });
    
});
