# test-form

## Установка проекта
### Первый способ deploy проекта (необходим docker вместе с docker-compose)
```
docker-compose up -d
```
### Второй способ (стандартный vue-cli разворот, необходимо два окна командной строки)

#### В первом окне (развернет client на порте 8080)
```
npm install
```
```
npm run serve
```
#### Во втором окне (развернет api на порте 3000)
```
json-server /server/data/db.json
```
