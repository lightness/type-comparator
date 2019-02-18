import { Chainable } from "../interfaces";
import { Chain } from "./chain";

export function cmp(): Chainable {
    return new Chain();
}
