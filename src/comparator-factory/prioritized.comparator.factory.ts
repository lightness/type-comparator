import {ConditionalComparator, PrioritizedComparatorInput} from "./interfaces";
import {Comparator} from "../comparator/interfaces";

// Input - list of values of two types:
// 1. IComparator<T> - just comparator function
// 2. { condition: (val: T) => boolean, comparator: IComparator<T> }
//      condition - function which determines is comparator applicable
//      comparator - same as from point 1
export function createPrioritizedComparator<T>(input: PrioritizedComparatorInput<T>) {
    // PrioritizedComparator tries to apply comparators from list.
    // Examples:
    //
    //  Example 1:
    //    input = [ AgeComparator, NameComparator ]
    //  How it works:
    //    Try to compare by age.
    //    If age is same, compare by name.
    //
    //  Example 2:
    //    input = [
    //     { condition: _.isNumber, comparator: NumberComparator },
    //     { condition: _.isDate, comparator: DateComparator },
    //     { condition: _.isString, comparator: StringComparator },
    //    ]
    //  How it works:
    //    If both values are numbers - compare by NumberComparator
    //    If only one value is number - it is greater
    //    If both values are not numbers - go to next condition
    //    If both values are dates - compare by DateComparator
    //    If only one value is date - it is greater
    //    If both values are not date - go to next condition
    //    If both values are strings - compare by StringComparator
    //    If only one value is string - it is greater
    //    If both values are not strings - both values are equivalent
    return function PrioritizedComparator(a: T, b: T) {
        for (const inputItem of input) {
            if (typeof inputItem === 'function') {
                const comparator = inputItem as Comparator<T>;
                const result = comparator(a, b);

                if (result !== 0) {
                    return result;
                }
            } else {
                const conditionalComparator = inputItem as ConditionalComparator<T>;
                const condition = (conditionalComparator.condition instanceof RegExp)
                    ? (value: T) => (conditionalComparator.condition as RegExp).test(value as any)
                    : conditionalComparator.condition;
                const isApplicableToA = condition(a);
                const isApplicableToB = condition(b);

                if (isApplicableToA && isApplicableToB) {
                    return conditionalComparator.comparator(a, b);
                }

                if (isApplicableToA && !isApplicableToB) {
                    return 1;
                }

                if (isApplicableToB && !isApplicableToA) {
                    return -1;
                }
            }
        }

        return 0;
    };
}