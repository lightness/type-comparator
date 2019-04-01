import {Comparator} from "../interfaces";

export function condition(cond: (item: any) => boolean, thenCmp: Comparator, elseCmp: Comparator): Comparator {
    return (a, b) => {
        const condA = cond(a);
        const condB = cond(b);

        if (condA) {
            if (condB) {
                return thenCmp(a, b);
            } else {
                return 1;
            }
        } else {
            if (condB) {
                return -1;
            } else {
                return elseCmp(a, b);
            }
        }
    };
}
