import {Comparator} from "./interfaces";

export const SimpleComparator: Comparator<string | number> = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}
