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

});
