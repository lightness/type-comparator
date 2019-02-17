import { transform, queue, asc, reverse } from '../src';

describe(`test`, () => {

    const comparator = transform(
        x => x.b,
        queue([
            transform(x => x.a % 10, asc),
            transform(x => x.a, reverse(asc))
        ])
    );

    test(`test 1`, () => {
        const a = Object.freeze({ a: { b: 11 }, b: { a: 10 } });
        const b = Object.freeze({ a: { b: 8 }, b: { a: 74 } });
        const c = Object.freeze({ a: { b: 3 }, b: { a: 40 } });
        const array = [a, b, c];

        const actual = array.slice(0).sort(comparator);
        const expected = [c, a, b];

        expect(actual).toEqual(expected);

    });

    test(`test 2`, () => {
        const a = Object.freeze({ a: { b: 11 }, b: { a: 10 } });
        const b = Object.freeze({ a: { b: 8 }, b: { a: 74 } });
        const c = Object.freeze({ a: { b: 3 }, b: { a: -40 } });
        const array = [a, b, c];

        const actual = array.slice(0).sort(comparator);
        const expected = [a, c, b];

        expect(actual).toEqual(expected);

    });
});
