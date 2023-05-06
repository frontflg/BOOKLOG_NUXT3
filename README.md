# BOOKLOG_NUXT3
読書履歴管理システムのNuxt3.js化

【インストール手順】（一例：参考）
% npx nuxi init nuxt3-vuetify3

% cd nuxt3-vuetify3

% npm install

% npm install -D vuetify@next sass vite-plugin-vuetify

% npm install -D @mdi/js

% npm install prisma

% npx prisma init

% npx prisma migrate dev

% npm_run_dev

% npx prisma studio

【問題点】
1.NUXTLINK が初回反応しない（500ページなしのエラーになることもあり）、別のリンクをクリックで反応する
2.更新機能は、未実装
他、不具合多数
