# simple-e-commerce

![FireShot Capture 138 - Sample Shop - 609bd4a856ccd01cbac2b86c--priceless-clarke-3f37be netlify app](https://user-images.githubusercontent.com/51913879/117981788-57761e80-b370-11eb-8079-3571b020c6d6.png)

React × TypeScript × Stripe × Netlify Functionsで作ったサーバーレスな決済基盤を持つECサイト。

https://609bd4a856ccd01cbac2b86c--priceless-clarke-3f37be.netlify.app/

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
