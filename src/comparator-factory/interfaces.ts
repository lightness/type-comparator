import {Comparator} from "../comparator/interfaces";

export interface TransformComparatorInput<T, K> {
    transform: (value: T) => K;
    comparator: Comparator<K>;
}

export interface ConditionalComparator<T> {
    condition: RegExp | ((value: T) => boolean);
    comparator: Comparator<T>;
}

export type PrioritizedComparatorInput<T> = Array<Comparator<T> | ConditionalComparator<T>>;
