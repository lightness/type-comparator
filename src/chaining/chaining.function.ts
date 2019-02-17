import { Chainable } from "../interfaces";
import { Chain } from "./chain";

export function chain(): Chainable {
    return new Chain();
}
