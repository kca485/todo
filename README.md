# Tugas _unit testing_

Tes lebih mudah dibuat jika dilakukan sejak awal.
Tapi untuk tugas kali ini, kita akan membuat tes untuk aplikasi yang sudah ada.
Aplikasi yang akan kita tes adalah aplikasi _todo_ sederhana.

## _Setup_ Aplikasi
1. _Clone_ repositori ini
```sh
git clone https://github.com/kca485/todo.git
```
2. Pindah ke direktori
```sh
cd todo
```
3. Menginstal dependensi
```sh
npm install
```
4. Jalankan aplikasi
```sh
npm run dev
```
5. Aplikasi akan berjalan pada nomor port yang ditampilkan di terminal, misalnya http://localhost:5173
6. Untuk menjalan tes, jalankan perintah
```sh
npm run test
```
hasil test akan ditampilkan di terminal, misalnya
```sh
  ✓ test/list.test.js (1)
    ✓ List (1)
      ✓ constructor (1)
        ✓ should only accept string as the argument

  Test Files  1 passed (1)
       Tests  1 passed (1)
    Start at  18:00:00
    Duration  100ms
```
## Struktur Direktori
 - komponen React ada di direktori `src/component`
 - inti aplikasi ada di `src/lib/list.js`
 - pembuatan tes bisa dilakukan di `test/list.test.js`

## Panduan pembuatan tes
Tes di repositori ini menggunakan [vitest](https://vitest.dev/).
API-nya bisa dilihat di [sini](https://vitest.dev/api/), dan berbagai _assertion_ yang bisa digunakan bisa dilihat di [sini](https://vitest.dev/api/expect.html).

Kita akan membuat tes untuk `List` yang ada di `src/lib/list.js`.
Silahkan pilih salah satu _method_ yang ada di `List` untuk dibuat tesnya.
Sudah ada beberapa contoh untuk `constructor` dari `List` dan _static method_ `use` di `test/list.test.js`.

`List` mempunyai beberapa _method_ seperti `add`, `remove`, `edit`, dll.
Dibebaskan untuk memilih _method_ mana yang akan dibuat tesnya.
Boleh pilih yang sekiranya gampang.

Boleh juga membuat method yang belum ada.
Bisa dilihat di `src/component/App.jsx` di dalam `todoItemHandlers` masih ada kasus yang belum ditangani oleh `List`.
Jika mau, silahkan buat tes untuk _method_ baru di `List` untuk menangani kasus tersebut.

## Tentang `List`
`List` adalah sebuah _constructor_ (jika kurang paham, bayangkan _class_).
_Instance_ dari `List` akan mempunyai properti `data` yang berupa _array_.
Propert `data` ini akan tampak pada aplikasi kita sebagai daftar _todo_.
Berbagai _method_ dari `List` fungsinya untuk memanipulasi properti `data` ini.

Contoh:
_method_ `add` akan menambahkan data baru ke properti `data`,
kemudian aplikasi _React_ kita akan membaca properti `data` ini dan menampilkan data tersebut.

Untuk melihat pemakaian `List`, bisa cek di `src/component/App.jsx`.