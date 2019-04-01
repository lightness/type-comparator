import { Comparator } from "../interfaces";

export function reverse(f: Comparator): Comparator {
    return (a, b) => {
        return f(b, a);
    };
}
