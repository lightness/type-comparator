import {Chain} from "./chain";
import {IfMutationDescriptor} from "../interfaces";
import {ElseChain} from "./else-chain";

export class ThenChain {

    public constructor(
        private originalChain: Chain
    ) {
    }

    public then(comparator): ElseChain {
        const mutations = this.originalChain['mutations'];
        const ifMutataionDescriptor: IfMutationDescriptor = mutations[mutations.length - 1] as IfMutationDescriptor;

        ifMutataionDescriptor.comparator = comparator;

        return new ElseChain(this.originalChain);
    }

}

