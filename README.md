# Simple Marketplace ( Typescript ) 🚀

## Deskripsi

Dalam repo ini, berisikan dokumentasi belajar typescript dari saya ( day 3 ), dalam repository ini saya tidak akan terlalu banyak menjelaskan dasar dasar dari pemrograman, namun lebih berfokus pada dokumentasi dari sebuah project, jika anda sudah bisa memahami repository sales ticket ( day 1 ) saya, anda bisa melanjutkan untuk membaca dokumentasi dari repository ini 

[`Repository Sales Ticket ( day 1 )`](https://github.com/panntod/Sales-Ticket)

## Fitur

Didalam project ini akan memiliki beberapa fitur, yaitu:
- Sistem CRUD 🔄
- Koneksi dengan database ( MySql ) 📊
- Endpoint 📍
- Rest API 🌐

## Dependencies 📦

Proyek ini menggunakan beberapa dependensi utama:
- [Express](https://expressjs.com/) - Framework web untuk Node.js 🚀
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript dengan tipedata statis 📘
- [MySQL2](https://www.npmjs.com/package/mysql2) - Library MySQL untuk Node.js 📊
- [Sequelize](https://sequelize.org/) - ORM untuk Node.js, Postgres, MySQL, MariaDB, SQLite, dan Microsoft SQL Server 🛠️
- [Dotenv](https://www.npmjs.com/package/dotenv) - Modul untuk mengelola variabel lingkungan 🌐
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Digunakan untuk menghash password dan membandingkannya untuk validasi login/changePassword 🌐
- [validatorJs](https://www.npmjs.com/package/validator) - Digunakan untuk memvalidasi inputan, menentukan rules dari input yang dikirimkan 📋
- [ts-node](https://www.npmjs.com/package/ts-node) - Menjalankan Node.js dengan TypeScript 🚀
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) - Mirip dengan Nodemon, digunakan untuk menjalankan aplikasi TypeScript 🔄
- [typescript](https://www.npmjs.com/package/typescript) - Memberitahu Node.js bahwa kita menggunakan TypeScript dalam proyek ini 📘
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Mengambil dan mensetting variabel yang ada di cookie 🍪
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Menggenerate token untuk Authorization dan Authentication 🔐

Jika anda menggunakan ts-node-dev gantilah script dalam package.json dengan:
```json
"scripts": {
    "start": "ts-node-dev src/index.ts"
},
```

## Konfigurasi project

1. Pastikan sudah menginstall typeScript secara global, atau jalankan perintah:
```cmd
npm i -g typescript
```

2. Lakukan inisialisasi typeScript, untuk mendapatkan `.tsconfig`, jalankan perintah:
```cmd
tsc --init
```
*lakukan sedikit perubahan dalam file, yaitu:
```json
"target": "es6", 
"module": "commonjs",  
"allowJs": true, 
"outDir": "./build", 
```

3. Lakukan instalasi dasar untuk project ini, lakukan perintah ini
```cmd
npm i ts-node nodemon typescript express -D && npm i --save sequelize mysql2 && npm i --save-dev sequelize-cli dotenv
```

4. Buat file baru dan beri nama `.sequelizerc`, ini berguna untuk mengkonfigurasi dimana file sequelize akan disimpan disebuah folder, anda dapat membaca dokumentasi resmi dari [Sequelize - Migration Skeletom](https://sequelize.org/docs/v6/other-topics/migrations/#the-sequelizerc-file), isi file tesebut sesuai kebutuhan anda, disini saya menggunakan:
```js
const path = require("path");

module.exports = {
  config: path.resolve("src/config", "database.js"), // ganti file database menjadi js, supaya bisa di export default
  "models-path": path.resolve("src/db", "models"),
  "seeders-path": path.resolve("src/db", "seeders"),
  "migrations-path": path.resolve("src/db", "migrations"),
};
```

5. Jalankan perintah:
```
npx sequelize-cli init
```
untuk menginisialisasikan dari sequelize.

6. Pembuatan tabel `Role` dan seeder untuk inisialisasi data `Role`
```
npx sequelize-cli model:generate --name Role --attributes roleName:string,active:boolean 
```
lalu rubah konfigurasi file models nya menjadi `ts`, dan lakukan perubahan pada seluruh file tersebut. untuk perubahan bisa dilihat di `Documentation`

```
npx sequelize-cli seed:generate --name RoleSeeder
```
Lalu isi seeder tersebut sesuai dengan kebutuhan.

Jalankan perintah ini untuk mengisi tabel `Role`.
```
npx sequelize-cli db:seed:all    
```

7. Pembuatan tabel `User`
Jalankan perintah:
```
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,roleID:bigint,accessToken:text,verified:boolean,active:boolean
```

8. Install dependencies tambahan, dan karena saya menggunakan `typeScript` maka harus menginstall `@types/` dari sebuah dependencies yang belum terinstall, anda bisa melihat cara nya di `Documentation`

9. Pembuatan tabel `MasterMenu`
Jalankan perintah:
```
npx sequelize-cli model:generate --name MasterMenu --attributes name:string,icon:text,ordering:integer,active:boolean
```

10. Pembuatan tabel `Submenu`
Jalankan perintah:
```
npx sequelize-cli model:generate --name Submenu --attributes name:string,masterMenuID:bigint,url:text,title:string,icon:text,ordering:integer,isTargetSelf:boolean,active:boolean
```

11. Pembuatan tabel `RoleMenuAccess`
Jalankan perintah: 
```
npx sequelize-cli model:generate --name RoleMenuAccess --attributes roleID:bigint,submenuID:bigint,active:boolean
```

Lakukan perintah ini untuk migrate seluruh tabel.
```
npx sequelize-cli db:migrate
```

# Documentation

- Tabel Design
<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/DatabaseDesign.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Desain Table Database</p>
</div>

ini adalah struktur data yang akan dibuat, tabel user dan role memiliki koneksi yaitu belongsTo untuk menghubungkan, dan foreignKey nya adalah `roleID`

- Models `typeScript`
<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Model%20ts%20-%20Import.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Model ts - Import</p>
</div>

Import connesction db dan juga beberapa kebutuhan dari `sequelize`

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Model%20ts%20-%20Implements.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Model ts - Implements</p>
</div>

- Kelas Role:
Memperluas kelas Model dari Sequelize dan mengimplementasikan antarmuka RoleAttributes.
Kelas ini mendefinisikan properti (id, roleName, active, createdAt, dan updatedAt) yang sesuai dengan kolom-kolom di database.

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Model%20ts%20-%20Export.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Model ts - Exports</p>
</div>

- RoleInput:
Sebuah antarmuka yang mewakili properti input untuk membuat atau memperbarui sebuah Role.
Menggunakan utilitas Optional dari Sequelize, dengan menentukan bahwa properti id bersifat opsional.
- RoleOutput:
Sebuah antarmuka yang mewakili properti output dari sebuah Role yang sudah terisi penuh.
Menggunakan utilitas Required dari Sequelize, dengan menentukan bahwa semua properti harus diisi.

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Model%20ts%20-%20Init.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Model ts - Init</p>
</div>

- Inisialisasi Model (Role.init):
Menginisialisasi model Role dengan Sequelize ORM.
Opsi konfigurasi diberikan sebagai argumen kedua.
id: Konfigurasi untuk kolom id, menentukan sebagai kunci utama dengan increment otomatis.
roleName dan active: Konfigurasi untuk kolom-kolom yang sesuai, menentukan tipe data mereka.
Opsi konfigurasi lainnya termasuk timestamps untuk kolom timestamp otomatis, sequelize untuk menentukan koneksi, dan underscored untuk menonaktifkan konversi otomatis dari camelCase ke snake_case.


- Connection Database
<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Database%20-%20Config%20js.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Database - Config</p>
</div>

mengubah konfigurasi dari `config` menjadi `js` supaya bisa di exports.modules dan digunakan difile lain

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Database%20-%20Connect%20ts.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Database - Connection</p>
</div>

membuat koneksi baru menggunakan sequelize dan megimpementasikannya langsunf, menggunakan as string untuk memastikan bahwa nilai yang diberikan berupa string

- Instalasi `@types/`
<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Error%20types%20-%20check.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Error types - Check</p>
</div>

Akan muncul tampilan error seperti ini jika anda belum menginstall `@types/` dari sebuah dependencies, lakukan langkah selanjutnya untuk mengatasi masalah ini:

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Error%20types%20-%20copy.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Error types - Copy</p>
</div>

Copy bagian `npm install ...` dan jalankan di cmd/ powershell

- Helper
    - Response Helper
    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Helper%20Response%20-%20before.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Helper response - Before</p>
    </div>

    karena banyak sekali perulangan code yang sama, dan terlalu boros penggunaan line, maka dibuatlah `Helper` untuk mempersingkat code

    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Helper%20Response.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Helper response</p>
    </div>

    ini adalah code `Helper` yang saya gunakan untuk mengirim response, berisikan success, message, error, data. Bisa digunakan dan dirubah sesuai dengan kebutuhan

    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Helper%20Response%20-%20After.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Helper response - After</p>
    </div>

    ini adalah code setelah penggunaan `Helper`

    - Generate Token
    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Generate%20Token.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Generate Token</p>
    </div>

    ini digunakan untuk Authorization, menggunakan jwt, dan membuatnya di dalam function untuk menggenerate code

    - Extract Token
    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Extract%20Token.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Extract Token</p>
    </div>

    ini digunakan untuk meng-extract token yang ada, memastikan apakah token valid atau sudah invalid

    - Password Helper
    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Helper%20Password%20-%20Hash.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Helper Password - Hashing</p>
    </div>

    ini adalah sebuah function untuk meng-hash password menggunakan bcrypt

    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Helper%20Password%20-%20Compare.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Helper Password - Compare</p>
    </div>

    ini adalah sebuah function untuk meng-compare sebuah password apakah sesuai atau tidak menggunakan bcrypt

    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Helper%20Password%20-%20use%20Hash.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Helper Password - UseHash</p>
    </div>

    ini adalah contoh penggunaan function hash password

    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Helper%20Password%20-%20use%20Compare.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Helper Password - UseCompare</p>
    </div>

    ini adalah contoh penggunaan function compaare password
- Authorization
    - Role Validation
    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Role%20Validation.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Middleware - Role Validation</p>
    </div>

    ini adalah Role validation, digunakan pada middleware untuk memastikan bahwa sebuah tindakan apakah sesuai dengan kriteria role yang dibutuhkan

    - Authentication
    <div>
      <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Authenticate.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Middleware - Authenticate</p>
    </div>

    ini adalah proses Authentication yang saya gunakan, untuk mengecek apakah memiliki sebuah accessToken untuk  melakukan suatu tindakan

- Validator input
<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Validate%20input%20-%20data.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Validate input - Data</p>
</div>

ini adalah proses mengambil data dari inputan

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Validate%20input%20-%20rules.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Validate input - Rules</p>
</div>

ini adalah pembuatan rules untuk memastikan bahwa inputan memenuhi seluruh rules

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Validate%20input%20-%20fails.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Validate input - Fails</p>
</div>

jika rules tidak terpenuhi maka akan mengembalikan sebuah message error

<div>
    <img src="https://github.com/panntod/Marketplace-Backend/blob/main/doc/Validate%20input%20-%20email%20checked.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
    <p style="text-align: center;">Validate input - email checked</p>
</div>

ini adalah logika tambahan untuk memastikan bahwa email user yang diregistrasikan tidak terdaftar sebelumnya

- Standardized Controller
    <div>
      <img src="https://github.com/panntod/School-Lib-Modul/blob/main/table-designer.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
      <p style="text-align: center;">Standardized Controller</p>
    </div>

    ini adalah standart dari pembuatan controller di project ini
