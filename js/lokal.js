// bagian storage
const KUNCI_SIMPAN = "MyBooks";
let bukuku = [];

// fungsi ini untuk mengecek apakah browser si user mendukung penyimpanan lokal atau tidak
function lokalSup() {
    if (typeof(Storage) === undefined) {
        console.log("Browser kamu ngga support local storage bang :)");
        return false;
    }
    return true;
}

// FUNGSI UNTUK MENYIMPAN DATA ITEM BUKU KE LOCAL STORAGE
function simpanData() {
    const simpanLokal = JSON.stringify(bukuku);
    localStorage.setItem(KUNCI_SIMPAN, simpanLokal);
    document.dispatchEvent(new Event("ondatasaved"));
}

function ambilData() {
    const tangkapData = localStorage.getItem(KUNCI_SIMPAN);

    let data = JSON.parse(tangkapData);

    if (data !== null)
        bukuku = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function perbaruiData() {
    if (lokalSup())
        simpanData();
}

// fungsi ini dipanggil di kode objekBuku
function objekdariBuku(judul, penulis, tahun, sudahSelesai) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        sudahSelesai
    };
}

// FUNGSI SUPAYA BISA DITEMUKAN PADA FITUR SEARCH
function temukanBuku(bukuid) {
    for (buku of bukuku) {
        if (buku.id === bukuid)
            return buku;
    }
    return null;
}

// INI JUGA SAMA
function cariIndeksBuku(bukuid) {
    let indeks = 0;
    for (buku of bukuku) {
        if (buku.id === bukuid)
            return indeks;

        indeks++;
    }
    return -1;
}

function ulangData() {
    const belumSelesaiDibaca = document.getElementById(BUKU_BELUM_SELESAI_DIBACA);
    const sudahSelesaiDibaca = document.getElementById(BUKU_SELESAI_DIBACA);

    for (buku of bukuku) {
        const bukuBaru = buatBuku(buku.judul, `Penulis: ${buku.penulis}`, `Tahun: ${buku.tahun}`, buku.sudahSelesai);
        bukuBaru[PRODUK_BUKU] = buku.id;

        if (buku.sudahSelesai) {
            sudahSelesaiDibaca.append(bukuBaru);
        } else {
            belumSelesaiDibaca.append(bukuBaru);
        }
    }
}

/*
DILARANG UNTUK MENGUBAH APAPUN YANG ADA DISINI, KARENA INI SUDAH BERJALAN DENGAN BAIK, WALAUPUN TIDAK SEMPURNA
TAPI SAYA MENGERJAKAN INI DENGAN SANGAT HATI-HATI DAN PENUH KESABARAN, SAYA BARU SANGAT PEMULA, MOHON SANGAT DIMAKLUMI
BILA SAYA MEMBUAT SEBUAH KESALAHAN PADA MENULIS, KOMENTAR, DAN TAMPILAN.
TERIMA KASIH ~
*/