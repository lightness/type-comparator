import {Chain} from "./chain";
import {Comparator, MutationType} from "../interfaces";
import {ThenChain} from "./then-chain";

export class ElseChain {

    public constructor(
        private originalChain: Chain
    ) {
    }

    public else(comparator): Comparator {
        return this.originalChain.use(comparator);
    }

    public elif(condition): ThenChain {
        const mutations = this.originalChain['mutations'];
        mutations.push({ type: MutationType.IF, condition });

        return new ThenChain(this.originalChain);
    }
}
