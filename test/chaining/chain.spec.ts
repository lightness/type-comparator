import {cmp} from "../../src/chaining/cmp";
import {asc} from "../../src/comparators";

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

    describe(`reverse`, () => {

        test(`should change elements order for comparator calls`, () => {
            const ascMock = jest.fn(asc);
            const comparator = cmp().reverse().use(ascMock);

            const args: [number, number] = [1, 2];
            comparator(...args);

            expect(ascMock).toBeCalledTimes(1);
            expect(ascMock).toBeCalledWith(...args.reverse());
        });

    });

    describe(`if / else`, () => {

        const condition = (x) => x % 2 === 0;
        const returnValue1 = 111;
        const returnValue2 = 222;

        test(`should call comparator from "then" chain if both args satisfy condition`, () => {
            const conditionMock = jest.fn(condition).mockReturnValue(true);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);

            const comparator = cmp()
                .if(conditionMock).then(cmpMock1)
                .else(cmpMock2);

            const result = comparator(null, null);

            expect(conditionMock).toBeCalledTimes(2);
            expect(cmpMock1).toBeCalledTimes(1);
            expect(cmpMock2).not.toBeCalled();
            expect(result).toBe(returnValue1);
        });

        test(`should call comparator from "else" chain if both args do not satisfy condition`, () => {
            const conditionMock = jest.fn(condition).mockReturnValue(false);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);

            const comparator = cmp()
                .if(conditionMock).then(cmpMock1)
                .else(cmpMock2);

            const result = comparator(null, null);

            expect(conditionMock).toBeCalledTimes(2);
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).toBeCalledTimes(1);
            expect(result).toBe(returnValue2);
        });

        test(`should return positive value, if only first arg satisfy condition`, () => {
            const conditionMock = jest.fn(condition).mockReturnValueOnce(true).mockReturnValueOnce(false);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);

            const comparator = cmp()
                .if(conditionMock).then(cmpMock1)
                .else(cmpMock2);

            const result = comparator(null, null);

            expect(conditionMock).toBeCalledTimes(2);
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).not.toBeCalled();
            expect(result).toBeGreaterThan(0);
        });

        test(`should return negative value, if only second arg satisfy condition`, () => {
            const conditionMock = jest.fn(condition).mockReturnValueOnce(false).mockReturnValueOnce(true);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);

            const comparator = cmp()
                .if(conditionMock).then(cmpMock1)
                .else(cmpMock2);

            const result = comparator(null, null);

            expect(conditionMock).toBeCalledTimes(2);
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).not.toBeCalled();
            expect(result).toBeLessThan(0);
        });

    });

    describe(`if / elif / else`, () => {

        const condition1 = (x) => x % 2 === 0;
        const condition2 = (x) => x % 3 === 0;
        const returnValue1 = 111;
        const returnValue2 = 222;
        const returnValue3 = 333;

        test(`should check "elif" condition, if both args do not satisfy "if" condition`, () => {
            const conditionMock1 = jest.fn(condition1).mockReturnValue(false);
            const conditionMock2 = jest.fn(condition2).mockReturnValue(false);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);
            const cmpMock3 = jest.fn(asc).mockReturnValue(returnValue3);

            const comparator = cmp()
                .if(conditionMock1).then(cmpMock1)
                .elif(conditionMock2).then(cmpMock2)
                .else(cmpMock3);

            const result = comparator(null, null);

            expect(conditionMock1).toBeCalledTimes(2);
            expect(conditionMock2).toBeCalledTimes(2);
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).not.toBeCalled();
            expect(cmpMock3).toBeCalledTimes(1);
            expect(result).toBe(returnValue3);
        });

        test(`should not check "elif" condition, if both args satisfy "if" condition`, () => {
            const conditionMock1 = jest.fn(condition1).mockReturnValue(true);
            const conditionMock2 = jest.fn(condition2).mockReturnValue(false);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);
            const cmpMock3 = jest.fn(asc).mockReturnValue(returnValue3);

            const comparator = cmp()
                .if(conditionMock1).then(cmpMock1)
                .elif(conditionMock2).then(cmpMock2)
                .else(cmpMock3);

            const result = comparator(null, null);

            expect(conditionMock1).toBeCalledTimes(2);
            expect(conditionMock2).not.toBeCalled();
            expect(cmpMock1).toBeCalledTimes(1);
            expect(cmpMock2).not.toBeCalled();
            expect(cmpMock3).not.toBeCalled();
            expect(result).toBe(returnValue1);
        });

        test(`should not check "elif" condition, if only first arg satisfy "if" condition`, () => {
            const conditionMock1 = jest.fn(condition1).mockReturnValueOnce(true).mockReturnValue(false);
            const conditionMock2 = jest.fn(condition2).mockReturnValue(false);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);
            const cmpMock3 = jest.fn(asc).mockReturnValue(returnValue3);

            const comparator = cmp()
                .if(conditionMock1).then(cmpMock1)
                .elif(conditionMock2).then(cmpMock2)
                .else(cmpMock3);

            const result = comparator(null, null);

            expect(conditionMock1).toBeCalledTimes(2);
            expect(conditionMock2).not.toBeCalled();
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).not.toBeCalled();
            expect(cmpMock3).not.toBeCalled();
            expect(result).toBeGreaterThan(0);
        });

        test(`should not check "elif" condition, if only second arg satisfy "if" condition`, () => {
            const conditionMock1 = jest.fn(condition1).mockReturnValueOnce(false).mockReturnValue(true);
            const conditionMock2 = jest.fn(condition2).mockReturnValue(false);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);
            const cmpMock3 = jest.fn(asc).mockReturnValue(returnValue3);

            const comparator = cmp()
                .if(conditionMock1).then(cmpMock1)
                .elif(conditionMock2).then(cmpMock2)
                .else(cmpMock3);

            const result = comparator(null, null);

            expect(conditionMock1).toBeCalledTimes(2);
            expect(conditionMock2).not.toBeCalled();
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).not.toBeCalled();
            expect(cmpMock3).not.toBeCalled();
            expect(result).toBeLessThan(0);
        });

        test(`should apply comparator from next "then", if both args satisfy "elif" condition`, () => {
            const conditionMock1 = jest.fn(condition1).mockReturnValue(false);
            const conditionMock2 = jest.fn(condition2).mockReturnValue(true);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);
            const cmpMock3 = jest.fn(asc).mockReturnValue(returnValue3);

            const comparator = cmp()
                .if(conditionMock1).then(cmpMock1)
                .elif(conditionMock2).then(cmpMock2)
                .else(cmpMock3);

            const result = comparator(null, null);

            expect(conditionMock1).toBeCalledTimes(2);
            expect(conditionMock2).toBeCalledTimes(2);
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).toBeCalledTimes(1);
            expect(cmpMock3).not.toBeCalled();
            expect(result).toBe(returnValue2);
        });

        test(`should apply comparator from next "elif", if both args do not satisfy current "elif" condition`, () => {
            const conditionMock1 = jest.fn(condition1).mockReturnValue(false);
            const conditionMock2 = jest.fn(condition2).mockReturnValue(false);
            const conditionMock3 = jest.fn(condition1).mockReturnValue(true);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);
            const cmpMock3 = jest.fn(asc).mockReturnValue(returnValue3);
            const cmpMock4 = jest.fn(asc).mockReturnValue(returnValue1);

            const comparator = cmp()
                .if(conditionMock1).then(cmpMock1)
                .elif(conditionMock2).then(cmpMock2)
                .elif(conditionMock3).then(cmpMock3)
                .else(cmpMock4);

            const result = comparator(null, null);

            expect(conditionMock1).toBeCalledTimes(2);
            expect(conditionMock2).toBeCalledTimes(2);
            expect(conditionMock3).toBeCalledTimes(2);
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).not.toBeCalled();
            expect(cmpMock3).toBeCalledTimes(1);
            expect(cmpMock4).not.toBeCalled();
            expect(result).toBe(returnValue3);
        });

        test(`should apply comparator from next "else", if both args do not satisfy "elif" condition and there is no more "elif" chains`, () => {
            const conditionMock1 = jest.fn(condition1).mockReturnValue(false);
            const conditionMock2 = jest.fn(condition2).mockReturnValue(false);
            const cmpMock1 = jest.fn(asc).mockReturnValue(returnValue1);
            const cmpMock2 = jest.fn(asc).mockReturnValue(returnValue2);
            const cmpMock3 = jest.fn(asc).mockReturnValue(returnValue3);

            const comparator = cmp()
                .if(conditionMock1).then(cmpMock1)
                .elif(conditionMock2).then(cmpMock2)
                .else(cmpMock3);

            const result = comparator(null, null);

            expect(conditionMock1).toBeCalledTimes(2);
            expect(conditionMock2).toBeCalledTimes(2);
            expect(cmpMock1).not.toBeCalled();
            expect(cmpMock2).not.toBeCalled();
            expect(cmpMock3).toBeCalledTimes(1);
            expect(result).toBe(returnValue3);
        });

    });

});
