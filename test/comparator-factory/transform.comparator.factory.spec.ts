import {SimpleComparator} from "../../src/comparator/simple.comparator";
import {createTransformComparator} from "../../src/comparator-factory/transform.comparator.factory";

describe(`TransformComparator`, () => {

    test(`should call transform function 2 times`, () => {
        const mockComparator = SimpleComparator;
        const context = {
            transformFn: (a: number) => a % 2
        };

        const transformFnSpy = jest.spyOn(context, 'transformFn');

        const transformedComparator = createTransformComparator({
            comparator: mockComparator,
            transform: context.transformFn
        });

        transformedComparator(null, null);

        expect(transformFnSpy).toBeCalledTimes(2);
    });

    test(`should call original comparator with args returned by transform function`, () => {
        const argA = 12;
        const argB = 41;

        const context = {
            mockComparator: SimpleComparator
        };

        const transformFn = jest.fn()
            .mockReturnValueOnce(argA)
            .mockReturnValueOnce(argB);

        const originalComparatorSpy = jest.spyOn(context, 'mockComparator');

        const transformedComparator = createTransformComparator({
            comparator: context.mockComparator,
            transform: transformFn
        });

        transformedComparator(null, null);

        expect(originalComparatorSpy).toBeCalledTimes(1);
        expect(originalComparatorSpy).toHaveBeenCalledWith(argA, argB);
    });

    test(`should return original comparator return value`, () => {
        const originalComparatorOutput = 42;

        const transformedComparator = createTransformComparator({
            comparator: jest.fn().mockReturnValue(originalComparatorOutput),
            transform: jest.fn().mockReturnValue(null)
        });

        const actual = transformedComparator(null, null);

        expect(actual).toBe(originalComparatorOutput);
    });

});
