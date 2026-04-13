# Автоматический деплой на GitHub Pages

Этот проект автоматически деплоится на GitHub Pages при пуше в ветку `main` с помощью GitHub Actions.

## Как это работает

1. При каждом пуше в ветку `main` запускается workflow `.github/workflows/deploy.yml`.
2. Проект собирается командой `npm run build` (результат — папка `dist`).
3. Содержимое папки `dist` автоматически публикуется в ветку `gh-pages`.

## Требования
- Репозиторий должен быть публичным (или у вас должны быть права на публикацию Pages).
- В настройках репозитория выберите ветку `gh-pages` как источник GitHub Pages.

## Скрипты
- `npm run build` — сборка проекта для продакшена.

## Workflow
Файл workflow уже добавлен: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Дополнительно
- Если у вас другая основная ветка, замените `main` на нужную.
- Для пользовательских доменов настройте файл `CNAME` в папке `public`.
