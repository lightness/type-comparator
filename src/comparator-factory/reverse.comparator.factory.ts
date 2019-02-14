import {Comparator} from "../comparator/interfaces";

export function createReverseComparator<T>(comparator: Comparator<T>) {
    return function ReverseComparator(a: T, b: T) {
        const original = comparator(a, b);

        return original === 0 ? 0 : -1 * original; // 0 and -0 isn't equal by Object.is
    }
}
