import {cmp} from "../../src/chaining/cmp";

describe(`chain`, () => {

    describe(`use`, () => {

        test(`should save original sorting if 'use' method called with []`, () => {
            const array = [1, -2, 5, 0];
            const comparator = cmp().use([]);
            const actual = array.slice().sort(comparator);
            const expected = [1, -2, 5, 0];

            expect(actual).toEqual(expected);
        });

    });

    describe(`asc`, () => {

        test(`should apply "asc" comparator`, () => {
            const array = [0, 3, 2, 1, 4];
            const comparator = cmp().asc();

            const actual = array.sort(comparator);
            const expected = [0, 1, 2, 3, 4];

            expect(actual).toEqual(expected);
        });

    });

    describe(`desc`, () => {

        test(`should apply "desc" comparator`, () => {
            const array = [0, 3, 2, 1, 4];
            const comparator = cmp().desc();

            const actual = array.sort(comparator);
            const expected = [4, 3, 2, 1, 0];

            expect(actual).toEqual(expected);
        });

    });

});
