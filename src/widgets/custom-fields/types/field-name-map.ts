export type FieldNameMap<Type> = Type extends Array<infer R>
  ? { readonly _: string } & { readonly get: (index: number) => FieldNameMap<R> }
  : Type extends Record<string, any>
  ? { readonly _: string } & { readonly [Key in keyof Type]: FieldNameMap<Type[Key]> }
  : string;
