export interface EolinkApikit {
    readonly key: string;
    readonly type: string;
    readonly description?: string;
    readonly required?: boolean;
    readonly childList?: ReadonlyArray<EolinkApikit>;
    readonly typeName?: string;
}