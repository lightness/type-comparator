import { Chainable, MutationDescriptor, Transformer, MutationType, Comparator, Condition } from "../interfaces";
import { condition, reverse, transform } from "../mutations";

export class Chain implements Chainable {

    private mutations: MutationDescriptor[];

    public constructor() {
        this.mutations = [];
    }

    public reverse() {
        this.mutations.push({ type: MutationType.REVERSE });

        return this;
    }

    public transform(transformer: Transformer) {
        this.mutations.push({ type: MutationType.TRANSFORM, transformer });

        return this;
    }

    public if(condition: Condition) {
        this.mutations.push({ type: MutationType.IF, condition });

        return this;
    }

    public introspect() {
        console.log(this.mutations);

        return this;
    }

    public use(comparator) {
        return Chain.mutate(comparator, this.mutations);
    }

    public useList(comparators) {
        return (a, b) => {
            for (const comparator of comparators) {
                const result = this.use(comparator)(a, b);

                if (result !== 0) {
                    return result;
                }
            }

            return 0;
        };
    }

    private static mutate(fn: Comparator, descriptors: MutationDescriptor[]) {
        let currentFn = fn;

        for (const descriptor of descriptors.slice().reverse()) {
            currentFn = ((prevFn) => {
                switch (descriptor.type) {
                    case MutationType.REVERSE:
                        return reverse(prevFn);
                    case MutationType.TRANSFORM:
                        return transform(descriptor.transformer, prevFn);
                    case MutationType.IF:
                        return condition(descriptor.condition, prevFn);
                }
            })(currentFn);
        }

        return currentFn;
    }
}
