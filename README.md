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

【問題点】※アドバイス歓迎します！

1.NUXTLINK が初回反応しない（ページなしのエラー(500)になることもあり）、別のリンクをクリックで反応する

2.更新機能(登録・更新・削除)は、出来ますが、更新画面が前回表示データを表示します。
　なので、戻りで一旦一覧に戻って、再度、[変更]ボタンをクリックして、表示しなおす手順で更新
　更新画面も、初回表示できない、あるいは画面遷移しない等、初回の動作に不具合あります。
他、不具合多数
