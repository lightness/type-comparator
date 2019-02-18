import { transform } from "../../src";

describe(`mutation:transform`, () => {
    
    const originalComparator = (a, b) => a - b;
    const transformer = (x) => x % 2;

    test(`should call original comparator with transformed values`, () => {
        const originalComparatorMock = jest.fn(originalComparator);
        const transformerMock = jest.fn(transformer);

        const tansformedComparator = transform(transformerMock, originalComparatorMock);

        const args: [number, number] = [3, 10];

        const result = tansformedComparator(...args);

        expect(originalComparatorMock).toBeCalledTimes(1);
        expect(originalComparatorMock).toBeCalledWith(...args.map(transformer));
        expect(originalComparatorMock).toReturnWith(result);

        expect(transformerMock).toHaveBeenCalledTimes(2);
        expect(transformerMock).toHaveBeenCalledWith(args[0]);
        expect(transformerMock).toHaveBeenCalledWith(args[1]);
    });

});
