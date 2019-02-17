import { Comparator } from "../interfaces";

export function queue(comparators: Comparator[]): Comparator {
    return (a, b) => {
        // VERBOSE && console.log(`Q: (${JSON.stringify(a)}, ${JSON.stringify(b)})`);
        for (const comparator of comparators) {
            const result = comparator(a, b);

            if (result !== 0) {
                return result;
            }
        }

        return 0;
    };
}
