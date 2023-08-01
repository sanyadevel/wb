# Service Desk 2

### Get starting

`node >=16`

```bash
# Для начала локальной разработки выполните следующие команды
cp .env.example .env
npm i
npm run start
```

### Deploy

NS `wbcrop`

### Links

- [Dldevel](https://wbcrop-ingress-controller.wbcrop.svc.k8s.dldevel)
- [Figma](https://www.figma.com/file/SpCB7MHi1GTAxPN5MFQRsw/Service-Desk-2.0?type=design&mode=design&t=e35TNbcJhtcFCTaf-0)
- [Youtrack](https://youtrack.wildberries.ru/agiles/83-1604/current)
- [Admin swagger](https://gitlab.wildberries.ru/infrastructure/wbcrop/admin/-/blob/dev/docs/swagger/swagger.yaml)
- [Public swagger](https://gitlab.wildberries.ru/infrastructure/wbcrop/backend/-/blob/dev/docs/swagger/swagger.yaml)
- [Gitlab frontend](https://gitlab.wildberries.ru/infrastructure/wbcrop/frontend/-/tree/dev)
- [Gitlab backend](https://gitlab.wildberries.ru/infrastructure/wbcrop/backend/-/tree/dev)

### TODO

- [x] Сделать доску для дизайна
- [ ] Аналитика web-vitals?
- [ ] Попробовать изменить GlobalRoutesType на расширяемый интерфейс
- [ ] Переопределить router.getDependencies(), чтобы появилась типизация
- [ ] Проверять схему на валидность переходов между статусами

### пример feature ветки.

название ветки - feature-sd-1
ссылка по которой доступен фронт этой ветки https://frontend-feature-sd-1.wbcrop.svc.k8s.dldevel/

### UX

[UX](./UX.md)

### CODE

[code](./code.md)
