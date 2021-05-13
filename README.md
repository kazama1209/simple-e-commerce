# simple-e-commerce

https://simple-e-commerce-20210513.netlify.app/

![FireShot Capture 145 - React App - localhost](https://user-images.githubusercontent.com/51913879/118161406-810b7480-b45a-11eb-8ce8-8b284fa6aae2.png)

React × TypeScript × Stripe × Netlify Functionsで作ったサーバーレスな決済基盤を持つECサイト。

詳細はQiitaにて記載。

https://qiita.com/kazama1209/items/375ab7747fc3df6c79d2

## セットアップ

```
$ cp .env.sample .env


STRIPE_SECRET_KEY=<Stripeのシークレットキー> 
```

環境変数をセット。

```
$ npm install 
$ npm run start
```

http://localhost:3000 にアクセス。

## テスト環境で使えるカード情報

アプリ内で使用しているAPIキーはテスト環境のものなので以下のカード情報が使用可能。

### Visa

- カード番号: 4242424242424242
- セキュリティコード: 任意の数字3桁
- 日付: 将来の日付であれば何でもOK
- 郵便番号: 任意の数字５桁

### Mastercard

- カード番号: 5555555555554444
- セキュリティコード: 任意の数字3桁
- 日付: 将来の日付であれば何でもOK
- 郵便番号: 任意の数字５桁

### JCB

- カード番号: 3566002020360505
- セキュリティコード: 任意の数字3桁
- 日付: 将来の日付であれば何でもOK
- 郵便番号: 任意の数字５桁
