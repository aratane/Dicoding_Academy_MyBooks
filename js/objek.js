// bagian untuk buku selesai dibaca atau belum
const BUKU_BELUM_SELESAI_DIBACA = "belumSelesaiDibaca";
const BUKU_SELESAI_DIBACA = "sudahSelesaiDibaca";
const PRODUK_BUKU = "bukuid";

function buatBuku(judul, penulis, tahun, sudahSelesai) {
    // buat elemen baru untuk judul buku
    const judulBuku = document.createElement("h3");
    judulBuku.innerText = judul;

    // buat elemen baru untuk si nama penulis
    const penulisBuku = document.createElement("p");
    penulisBuku.innerText = penulis;

    // elemen baru untuk tahun diluncurkannya buku
    const tahunBuku = document.createElement("p");
    tahunBuku.innerText = tahun;

    // aksi buku ini untuk menambahkan aksi ketika tombol kembali, selesai dan tombol hapus ditekan
    const aksiBuku = document.createElement("div");
    aksiBuku.classList.add("action");
    if (sudahSelesai) {
        aksiBuku.append(buatTombolKembali(), buatTombolBuang());
    } else {
        aksiBuku.append(buatTombolSelesai(), buatTombolBuang());
    }

    const artBuku = document.createElement("article");
    artBuku.classList.add("book_item");
    artBuku.append(judulBuku, penulisBuku, tahunBuku, aksiBuku);

    return artBuku;
}

// ini fungsi untuk mengembalikan item buku yang sudah selesai dibaca ke tempat belum selesai dibaca
function buatTombolKembali() {
    //alert("ITEM SUDAH SELESAI DIBACA");
    return buatTombol("green", "TEU ACAN RENGSE", function(event) {
        kembalikanBuku(event.target.parentElement.parentElement);
    });
}

// fungsi cek tombol, apakah sudah selesai
function buatTombolSelesai() {
    //alert("ITEM BERHASIL DITAMBAHKAN");
    return buatTombol("green", "ATOS RENGSE", function(event) {
        tambahBukuSelesai(event.target.parentElement.parentElement);
    });
}

// fungsi untuk menghapus si buku dari list
function buatTombolBuang() {
    return buatTombol("red", "Hapus buku", function(event) {
        buangBuku(event.target.parentElement.parentElement);
    });
}


// fungsi untuk elemen tombol baru, si fungsi ini dipanggil ke kode yg atas untuk memunculkan elemen tombol baru
function buatTombol(tipeTombol, tombolTeks, eventListener) {
    const tombol = document.createElement("button");
    tombol.innerText = tombolTeks;
    tombol.classList.add(tipeTombol);
    tombol.addEventListener("click", function(event) {
        eventListener(event);
    });

    return tombol;
}

// fungsi untuk menambahkan buku dari form input judul, penulis, dan tahun 
function tambahBuku() {
    const belumSelesaiDibaca = document.getElementById(BUKU_BELUM_SELESAI_DIBACA);
    const sudahSelesaiDibaca = document.getElementById(BUKU_SELESAI_DIBACA);
    const judulBuku = document.getElementById("inputJudulBuku").value;
    const penulisBuku = document.getElementById("inputPemilikBuku").value;
    const tahunBuku = document.getElementById("inputTahunBuku").value;
    const sudahSelesai = document.getElementById("inputBukuSelesai").checked;

    const buku = buatBuku(judulBuku, `Penulis: ${penulisBuku}`, `Tahun: ${tahunBuku}`, sudahSelesai);
    const objekBuku = objekdariBuku(judulBuku, penulisBuku, tahunBuku, sudahSelesai);

    buku[PRODUK_BUKU] = objekBuku.id;
    bukuku.push(objekBuku);

    if (sudahSelesai) {
        sudahSelesaiDibaca.append(buku);
    } else {
        belumSelesaiDibaca.append(buku);
    }
    perbaruiData();
}

// fungsi untuk menambahkan buku dari yang belum dibaca menjadi sudah dibaca
function tambahBukuSelesai(elemenBuku) {
    const sudahSelesaiDibaca = document.getElementById(BUKU_SELESAI_DIBACA);
    const judulBuku = elemenBuku.querySelector("h3").innerText;
    const penulisBuku = elemenBuku.querySelectorAll("p")[0].innerText;
    const tahunBuku = elemenBuku.querySelectorAll("p")[1].innerText;

    const bukuBaru = buatBuku(judulBuku, penulisBuku, tahunBuku, true);
    const buku = temukanBuku(elemenBuku[PRODUK_BUKU]);
    buku.sudahSelesai = true;
    bukuBaru[PRODUK_BUKU] = buku.id;

    sudahSelesaiDibaca.append(bukuBaru);
    elemenBuku.remove();

    perbaruiData();
}

// fungsi ini dipanggil pada const buku pada fungsi tambahkan buku yg selesai dibaca
// untuk mendelete item
function buangBuku(elemenBuku) {
    const dihapus = window.confirm("Hapus buku? Tekan [ok] untuk menghapus dan tekan [batal] untuk membatalkan penghapusan");
    if (dihapus) {
        const posisiObjekBuku = cariIndeksBuku(elemenBuku[PRODUK_BUKU]);
        bukuku.splice(posisiObjekBuku, 1);

        // ketika buku berhasil dihapus maka akan memunculkan dialog melalui console
        // tadinya ingin memakai alert namun kurang sreg
        elemenBuku.remove();
        // PENAMBAHAN UPDATE DATA 17-02-22
        // DISINI LETAK KESALAHANNYA HHE :D
        perbaruiData();

        console.log("Berhasil dihapus");
        alert("Berhasil menghapus item")
    } else {
        console.log("Gagal dihapus");
        alert("Item gagal untuk dihapus")
    }

}

// fungsi ini mengembalikan item yang sudah dibaca tadi menjadi belum dibaca
function kembalikanBuku(elemenBuku) {
    const belumSelesaiDibaca = document.getElementById(BUKU_BELUM_SELESAI_DIBACA);
    const judulBuku = elemenBuku.querySelector("h3").innerText;
    const penulisBuku = elemenBuku.querySelectorAll("p")[0].innerText;
    const tahunBuku = elemenBuku.querySelectorAll("p")[1].innerText;

    const bukuBaru = buatBuku(judulBuku, penulisBuku, tahunBuku, false);

    const buku = temukanBuku(elemenBuku[PRODUK_BUKU]);
    buku.sudahSelesai = false;
    bukuBaru[PRODUK_BUKU] = buku.id;

    belumSelesaiDibaca.append(bukuBaru);
    elemenBuku.remove();

    perbaruiData();
}

// nah ini fungsi yg penting, jangan merubah apapun yang ada disini, jika ada kesalahan disini maka fungsi mencari buku akan error
function cariBuku() {
    const cariBuku = document.getElementById("cariJudulBuku");
    const pilah = cariBuku.value.toUpperCase();
    const objekBuku = document.querySelectorAll("section.book_shelf > .book_list > .book_item");

    for (let x = 0; x < objekBuku.length; x++) {
        isiJuml = objekBuku[x].textContent || objekBuku[x].innerText;
        if (isiJuml.toUpperCase().indexOf(pilah) > -1) {
            objekBuku[x].style.display = "";
        } else {
            objekBuku[x].style.display = "none";
        }
    }
}

// ini untuk tulisan tombol inputan, ketika si check box nya di tekan maka akan tombol berubah tulisan menjadi selesai dibaca
// fungsi ini dipanggil pada file script.js, pada bagian :
/* 
inputBukuSelesai.addEventListener("input", function(event) {
        event.preventDefault();
        buatTombolCek(); //disini untuk mengganti
    });
*/
function buatTombolCek() {
    const seleu = document.querySelector("span");
    if (inputBukuSelesai.checked) {
        seleu.innerText = "Selesai dibaca";
    } else {
        seleu.innerText = "Belum selesai dibaca";
    }
}

/*
DILARANG UNTUK MENGUBAH APAPUN YANG ADA DISINI, KARENA INI SUDAH BERJALAN DENGAN BAIK, WALAUPUN TIDAK SEMPURNA
TAPI SAYA MENGERJAKAN INI DENGAN SANGAT HATI-HATI DAN PENUH KESABARAN, SAYA BARU SANGAT PEMULA, MOHON SANGAT DIMAKLUMI
BILA SAYA MEMBUAT SEBUAH KESALAHAN PADA MENULIS, KOMENTAR, DAN TAMPILAN.
TERIMA KASIH ~
*/