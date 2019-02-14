import {TransformComparatorInput} from "./interfaces";

// transform - transformation function (value: T) => T
// comparator - IComparator<T>
export function createTransformComparator<T, K>({transform, comparator}: TransformComparatorInput<T, K>) {
    // TransformComparator just apply transform function to value and compare values than.
    // Example:
    //    transform = (value) => value[0]
    //    comparator = StringComparator
    //  ('AX', 'AA') => 0
    //  ('A9', 'B1') => -1
    return function TransformComparator(a: T, b: T) {
        return comparator(transform(a), transform(b));
    };
}
