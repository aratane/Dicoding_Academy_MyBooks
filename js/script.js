document.addEventListener("DOMContentLoaded", function() {
    const inputBuku = document.getElementById("inputBuku");
    const cariJudulBuku = document.getElementById("cariBuku");
    const inputBukuSelesai = document.getElementById("inputBukuSelesai");

    inputBuku.addEventListener("submit", function(event) {
        event.preventDefault();
        tambahBuku();
    });

    cariJudulBuku.addEventListener("keyup", function(event) {
        event.preventDefault();
        cariBuku();
    });

    cariJudulBuku.addEventListener("submit", function(event) {
        event.preventDefault();
        cariBuku();
    });

    inputBukuSelesai.addEventListener("input", function(event) {
        event.preventDefault();
        buatTombolCek();
    });

    if (lokalSup()) {
        ambilData();
    }
});

document.addEventListener("ondatasaved", () => {
    // DISINI TADINYA MAU PAKE ALERT
    console.log("Buku berhasil di save");
});

document.addEventListener("ondataloaded", () => {
    ulangData();
});

/*
DILARANG UNTUK MENGUBAH APAPUN YANG ADA DISINI, KARENA INI SUDAH BERJALAN DENGAN BAIK, WALAUPUN TIDAK SEMPURNA
TAPI SAYA MENGERJAKAN INI DENGAN SANGAT HATI-HATI DAN PENUH KESABARAN, SAYA BARU SANGAT PEMULA, MOHON SANGAT DIMAKLUMI
BILA SAYA MEMBUAT SEBUAH KESALAHAN PADA MENULIS, KOMENTAR, DAN TAMPILAN.
TERIMA KASIH ~
*/