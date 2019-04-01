import {condition} from "../../src";

describe(`mutation:condition`, () => {
    const A = 42;
    const B = 101;

    beforeEach(() => {
        this.conditionFn = jest.fn();
        this.cmpA = jest.fn(() => A);
        this.cmpB = jest.fn(() => B);
    });

    test(`should return positive value, if first arg satisfies condition and second arg not`, () => {
        this.conditionFn
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);

        const comparator = condition(this.conditionFn, this.cmpA, this.cmpB);

        const args: [number, number] = [null, null];

        expect(comparator(...args)).toBeGreaterThan(0);
        expect(this.conditionFn).toBeCalledTimes(2);
        expect(this.cmpA).not.toBeCalled();
        expect(this.cmpB).not.toBeCalled();
    });

    test(`should return negative value, if second arg satisfies condition and first arg not`, () => {
        this.conditionFn
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        const comparator = condition(this.conditionFn, this.cmpA, this.cmpB);

        const args: [number, number] = [null, null];

        expect(comparator(...args)).toBeLessThan(0);
        expect(this.conditionFn).toBeCalledTimes(2);
        expect(this.cmpA).not.toBeCalled();
        expect(this.cmpB).not.toBeCalled();
    });

    test(`should apply first comparator, if both args satisfy condition`, () => {
        this.conditionFn
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true);

        const comparator = condition(this.conditionFn, this.cmpA, this.cmpB);

        const args: [number, number] = [null, null];

        expect(comparator(...args)).toBe(A);
        expect(this.conditionFn).toBeCalledTimes(2);
        expect(this.cmpA).toBeCalledTimes(1);
        expect(this.cmpB).not.toBeCalled();
    });

    test(`should apply first comparator, if both args don't satisfy condition`, () => {
        this.conditionFn
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false);

        const comparator = condition(this.conditionFn, this.cmpA, this.cmpB);

        const args: [number, number] = [null, null];

        expect(comparator(...args)).toBe(B);
        expect(this.conditionFn).toBeCalledTimes(2);
        expect(this.cmpA).not.toBeCalled();
        expect(this.cmpB).toBeCalledTimes(1);
    });

});
