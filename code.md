### Как использовать useValidRouteParams

1. задать схему для роута src\pages\routes.ts

```js
export const routes = [
  {
    name: 'testRouteName',
    path: '/test',
    title: 'Тест',
    Component: adminNsNamespaceCatalog,
    paramsSchema: z.object({
      testParam: z.string(),
    }),
  },
] as const;

```

2. в коде использовать

```js
const { testParam } = useValidRouteParams('testRouteName'); // testParam:string
```

если компонент который использует useValidRouteParams('testRouteName') при этом текущий роут отличается от 'testRouteName',то
будет выброшено исключение, которое можно отключить

```js
useValidRouteParams('testRouteName', { useErrorBoundary: false });
```

### API

пример ручки из свагера
/catalog/:alias/:group_alias/:entrypoint_alias

api|
|- index.ts
|-...
|- catalog|
|-index.ts
|-get.ts
|-post.ts
|-put.ts
|-delete.ts
|-patch.ts
|-...
|-alias|
|-index.ts
|-get.ts
|-...
|-group-alias|
|-index.ts
|-get.ts
|-...
|-entrypoint-alias|
|-index.ts
|-get.ts
|-...

в каждой папку лежал запросы get.ts, post.ts, put.ts, delete.ts, patch.ts, могут быть редкие исключения.
пример catalog/index.ts

```js
export * as get from './get';
export * as post from './post';
export * as put from './put';
export * as delete from './delete';
export * as patch from './patch';
export * as alias from './alias';
```
