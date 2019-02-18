import { Comparator } from "../interfaces";

export function map(t: (item: any) => any, f: Comparator): Comparator {
    return (a, b) => {
        // VERBOSE && console.log(`TR: (${JSON.stringify(a)}, ${JSON.stringify(b)})`);
        return f(t(a), t(b));
    };
}
