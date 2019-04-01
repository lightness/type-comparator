
export interface Comparator {
    (a: any, b: any): number;
}

export type Mutation = (c: Comparator) => Comparator;

export enum MutationType {
    MAP = 'map',
    REVERSE = 'reverse',
    IF = 'if'
}

export type MutationDescriptor = ReverseMutationDescriptor | MapMutationDescriptor | IfMutationDescriptor;

export interface MutationDescriptorBase {
    type: MutationType;
}

export interface ReverseMutationDescriptor extends MutationDescriptorBase {
    type: MutationType.REVERSE;
}

export interface MapMutationDescriptor extends MutationDescriptorBase {
    type: MutationType.MAP;
    mapper: Mapper;
}

export interface IfMutationDescriptor extends MutationDescriptorBase {
    type: MutationType.IF;
    condition: Condition;
    comparator?: Comparator;
}

export type Mapper = (item: any) => any;
export type Condition = (item: any) => boolean;

export interface ThenChainable {
    then(comparator: Comparator): ElseChainable;
}

export interface ElseChainable {
    else(comparator: Comparator): Comparator;
    elif(condition: Condition): ThenChainable;
}

export interface Chainable {
    reverse(): this;
    map(mapper: Mapper): this;
    if(condition: Condition): ThenChainable;
    use(comparatorOrComparators: Comparator | Comparator[]): Comparator;
    asc(): Comparator;
    desc(): Comparator;
}
