import {Comparator} from "../comparator/interfaces";
import {SimpleComparator} from "../comparator/simple.comparator";

// Factory for creation exclusive comparator
// Exclusive values - values which have top priority during comparison process.
// All values in list have same top priority. All values not from this list have low priority.
export function createExclusiveComparator(exclusiveValues: any[]): Comparator<any> {
    // Exclusive comparator consider that exclusive values is greater than anothers
    // Examples: exclusiveValues = ['F']
    // ('A', 'B') => 0
    // ('A', 'F') => -1
    // ('F', 'X') => 1
    // ('F', 'F') => 0
    return function ExclusiveComparator(a: any, b: any) {
        const isIncludesA = exclusiveValues.indexOf(a) > -1;
        const isIncludesB = exclusiveValues.indexOf(b) > -1;

        return SimpleComparator(Number(isIncludesA), Number(isIncludesB));
    };
}