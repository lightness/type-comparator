import {map, queue, asc, reverse, cmp, desc} from '../src';

describe(`functional`, () => {

    const comparator = map(
        x => x.b,
        queue([
            map(x => x.a % 10, asc),
            map(x => x.a, reverse(asc))
        ])
    );

    test(`test 1`, () => {
        const a = Object.freeze({a: {b: 11}, b: {a: 10}});
        const b = Object.freeze({a: {b: 8}, b: {a: 74}});
        const c = Object.freeze({a: {b: 3}, b: {a: 40}});
        const array = [a, b, c];

        const actual = array.slice(0).sort(comparator);
        const expected = [c, a, b];

        expect(actual).toEqual(expected);

    });

    test(`test 2`, () => {
        const a = Object.freeze({a: {b: 11}, b: {a: 10}});
        const b = Object.freeze({a: {b: 8}, b: {a: 74}});
        const c = Object.freeze({a: {b: 3}, b: {a: -40}});
        const array = [a, b, c];

        const actual = array.slice(0).sort(comparator);
        const expected = [a, c, b];

        expect(actual).toEqual(expected);

    });
});

describe(`chaining`, () => {

    const condition = x => x % 10 === 0;
    const array = [1, 10, 2, 20];

    test(`test 1`, () => {
        const comparator = cmp().if(condition).use(asc);

        expect(comparator(10, 1)).toBe(1);
        expect(comparator(1, 10)).toBe(-1);
        expect(comparator(20, 10)).toBe(1);
        expect(comparator(10, 20)).toBe(-1);
        expect(comparator(10, 10)).toBe(0);
        expect(array.slice(0).sort(comparator)).toEqual([1, 2, 10, 20]);
    });

    test(`test 2`, () => {
        const comparator = cmp().if(condition).reverse().use(asc);

        expect(comparator(10, 1)).toBe(1);
        expect(comparator(1, 10)).toBe(-1);
        expect(comparator(20, 10)).toBe(-1);
        expect(comparator(10, 20)).toBe(1);
        expect(comparator(10, 10)).toBe(0);
        expect(array.slice(0).sort(comparator)).toEqual([2, 1, 20, 10]);
    });

    test(`test 3`, () => {
        const comparator = cmp().reverse().if(condition).use(asc);

        expect(comparator(10, 1)).toBe(-1);
        expect(comparator(1, 10)).toBe(1);
        expect(comparator(20, 10)).toBe(-1);
        expect(comparator(10, 20)).toBe(1);
        expect(comparator(10, 10)).toBe(0);
        expect(array.slice(0).sort(comparator)).toEqual([20, 10, 2, 1]);
    });

    test(`test 3`, () => {
        const comparator = cmp().reverse().if(condition).reverse().use(asc);

        expect(comparator(10, 1)).toBe(-1);
        expect(comparator(1, 10)).toBe(1);
        expect(comparator(20, 10)).toBe(1);
        expect(comparator(10, 20)).toBe(-1);
        expect(comparator(10, 10)).toBe(0);
        expect(array.slice(0).sort(comparator)).toEqual([10, 20, 1, 2]);
    });

});

describe(`chaining with objects`, () => {

    const comparator = cmp()
        .map(x => x.a)
        .use([
            cmp().map(x => x.b).use(desc),
            cmp().if(x => (x.b + x.c) % 2 === 0).map(x => x.c).use(asc)
        ]);

    test(`dataset 1`, () => {
        const array = [
            { a: { b: 1, c: 7 } },
            { a: { b: 1, c: 6 } },
            { a: { b: 2, c: 5 } },
            { a: { b: 2, c: 4 } },
            { a: { b: 3, c: 3 } },
            { a: { b: 3, c: 2 } },
        ];

        const expected = [
            { a: { b: 3, c: 2 } },
            { a: { b: 3, c: 3 } },
            { a: { b: 2, c: 5 } },
            { a: { b: 2, c: 4 } },
            { a: { b: 1, c: 6 } },
            { a: { b: 1, c: 7 } },
        ];

        expect(array.slice().sort(comparator)).toEqual(expected);
    });

    test(`dataset 2`, () => {
        const array = [
            { a: { b: 1, c: 7 } },
            { a: { b: 1, c: 6 } },
            { a: { b: 1, c: 5 } },
            { a: { b: 1, c: 4 } },
            { a: { b: 1, c: 3 } },
            { a: { b: 3, c: 2 } },
        ];

        const expected = [
            { a: { b: 3, c: 2 } },
            { a: { b: 1, c: 4 } },
            { a: { b: 1, c: 6 } },
            { a: { b: 1, c: 3 } },
            { a: { b: 1, c: 5 } },
            { a: { b: 1, c: 7 } },
        ];

        expect(array.slice().sort(comparator)).toEqual(expected);
    });

});
