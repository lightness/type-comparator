import { Comparator } from "../interfaces";

export function reverse(f: Comparator): Comparator {
    return (a, b) => {
        // VERBOSE && console.log(`REVERSE: (${JSON.stringify(a)}, ${JSON.stringify(b)})`);
        return f(b, a);
    };
}
