import { Comparator } from "../interfaces";

export function map(t: (item: any) => any, f: Comparator): Comparator {
    return (a, b) => {
        return f(t(a), t(b));
    };
}
