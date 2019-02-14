import {createExclusiveComparator} from "../../src/comparator-factory/exclusive.comparator.factory";

describe(`ExclusiveComparator`, () => {

    describe('should operate with strings', () => {

        beforeAll(() => {
            this.comparator = createExclusiveComparator(['A', 'X']);
        })
    
        test(`should return 1, if first arg is exclusive, but second not`, () => {
            const actual = this.comparator('A', 'B');
            const expected = 1;

            expect(actual).toBe(expected);
        });

        test(`should return -1, if second arg is exclusive, but first not`, () => {
            const actual = this.comparator('B', 'X');
            const expected = -1;

            expect(actual).toBe(expected);
        });

        test(`should return 0, if both args is exclusive`, () => {
            const actual = this.comparator('X', 'A');
            const expected = 0;

            expect(actual).toBe(expected);
        });

    });

    describe('should operate with numbers', () => {

        beforeAll(() => {
            this.comparator = createExclusiveComparator([5, 10]);
        });

        test(`should return 1, if first arg is exclusive, but second not`, () => {
            const actual = this.comparator(5, 7);
            const expected = 1;

            expect(actual).toBe(expected);
        });

        test(`should return -1, if second arg is exclusive, but first not`, () => {
            const actual = this.comparator(14, 10);
            const expected = -1;

            expect(actual).toBe(expected);
        });

        test(`should return 0, if both args is exclusive`, () => {
            const actual = this.comparator(5, 10);
            const expected = 0;

            expect(actual).toBe(expected);
        });

    });

});
