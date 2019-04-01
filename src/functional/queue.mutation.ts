import { Comparator } from "../interfaces";

export function queue(comparators: Comparator[]): Comparator {
    return (a, b) => {
        for (const comparator of comparators) {
            const result = comparator(a, b);

            if (result !== 0) {
                return result;
            }
        }

        return 0;
    };
}
