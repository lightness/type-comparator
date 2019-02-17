import { Comparator } from "../interfaces";
import { reverse } from "../mutations";
import { asc } from "./asc.comparator";

export const desc: Comparator = reverse(asc);
