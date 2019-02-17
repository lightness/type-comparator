
export interface Comparator {
    (a: any, b: any): number;
}

export type Mutation = (c: Comparator) => Comparator;

export enum MutationType {
    TRANSFORM = 'transform',
    REVERSE = 'reverse',
    IF = 'if'
}

export type MutationDescriptor = ReverseMutationDescriptor | TransformMutationDescriptor | IfMutationDescriptor;

export interface MutationDescriptorBase {
    type: MutationType;
}

export interface ReverseMutationDescriptor extends MutationDescriptorBase {
    type: MutationType.REVERSE;
}

export interface TransformMutationDescriptor extends MutationDescriptorBase {
    type: MutationType.TRANSFORM;
    transformer: (x: any) => any;
}

export interface IfMutationDescriptor extends MutationDescriptorBase {
    type: MutationType.IF;
    condition: (x: any) => boolean;
}

export type Transformer = (item: any) => any;
export type Condition = (item: any) => boolean;

export interface Chainable {
    reverse(): this;
    transform(transformer: Transformer): this;
    if(condition: Condition): this;
    introspect(): this;
    use(comparator: Comparator): Comparator;
    useList(comparators: Comparator[]): Comparator;
}
