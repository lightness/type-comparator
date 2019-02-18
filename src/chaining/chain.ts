import {Chainable, MutationDescriptor, Mapper, MutationType, Comparator, Condition} from "../interfaces";
import {condition, reverse, map} from "../mutations";

export class Chain implements Chainable {

    private mutations: MutationDescriptor[];

    public constructor() {
        this.mutations = [];
    }

    public reverse() {
        this.mutations.push({type: MutationType.REVERSE});

        return this;
    }

    public map(mapper: Mapper) {
        this.mutations.push({type: MutationType.MAP, mapper: mapper});

        return this;
    }

    public if(condition: Condition) {
        this.mutations.push({type: MutationType.IF, condition});

        return this;
    }

    public use(comparatorOrComparators: Comparator | Comparator[]) {
        if (Array.isArray(comparatorOrComparators)) {
            return (a, b) => {
                for (const comparator of comparatorOrComparators) {
                    const result = this.use(comparator)(a, b);

                    if (result !== 0) {
                        return result;
                    }
                }

                return 0;
            };
        }

        return Chain.mutate(comparatorOrComparators, this.mutations);
    }

    private static mutate(fn: Comparator, descriptors: MutationDescriptor[]) {
        let currentFn = fn;

        for (const descriptor of descriptors.slice().reverse()) {
            currentFn = ((prevFn) => {
                switch (descriptor.type) {
                    case MutationType.REVERSE:
                        return reverse(prevFn);
                    case MutationType.MAP:
                        return map(descriptor.mapper, prevFn);
                    case MutationType.IF:
                        return condition(descriptor.condition, prevFn);
                }
            })(currentFn);
        }

        return currentFn;
    }
}
