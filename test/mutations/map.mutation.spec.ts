import { map } from "../../src";

describe(`mutation:map`, () => {
    
    const originalComparator = (a, b) => a - b;
    const mapper = (x) => x % 2;

    test(`should call original comparator with mapped values`, () => {
        const originalComparatorMock = jest.fn(originalComparator);
        const mapperMock = jest.fn(mapper);

        const tansformedComparator = map(mapperMock, originalComparatorMock);

        const args: [number, number] = [3, 10];

        const result = tansformedComparator(...args);

        expect(originalComparatorMock).toBeCalledTimes(1);
        expect(originalComparatorMock).toBeCalledWith(...args.map(mapper));
        expect(originalComparatorMock).toReturnWith(result);

        expect(mapperMock).toHaveBeenCalledTimes(2);
        expect(mapperMock).toHaveBeenCalledWith(args[0]);
        expect(mapperMock).toHaveBeenCalledWith(args[1]);
    });

});
