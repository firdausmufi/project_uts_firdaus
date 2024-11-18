const express = require("express");
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Data awal
let musikList = [
  { id: 1, judul: "Bohemian Rhapsody", artis: "Queen", genre: "Rock" },
  { id: 2, judul: "Shape of You", artis: "Ed Sheeran", genre: "Pop" },
  { id: 3, judul: "Billie Jean", artis: "Michael Jackson", genre: "Pop" },
];

// Endpoint untuk mendapatkan semua lagu
app.get("/musik", (req, res) => {
  res.json(musikList);
});

// Endpoint untuk menambahkan lagu baru
app.post("/musik", (req, res) => {
  const { judul, artis, genre } = req.body;
  if (!judul || !artis || !genre) {
    return res
      .status(400)
      .json({ message: "Judul, artis, dan genre wajib diisi" });
  }

  const newLagu = {
    id: musikList.length + 1,
    judul,
    artis,
    genre,
  };
  musikList.push(newLagu);
  res.status(201).json(newLagu);
});

// Endpoint untuk memperbarui informasi lagu
app.put("/musik/:id", (req, res) => {
  const { id } = req.params;
  const { judul, artis, genre } = req.body;
  const lagu = musikList.find((m) => m.id === parseInt(id));

  if (!lagu) {
    return res.status(404).json({ message: "Lagu tidak ditemukan" });
  }

  if (judul) lagu.judul = judul;
  if (artis) lagu.artis = artis;
  if (genre) lagu.genre = genre;

  res.json(lagu);
});

// Endpoint untuk menghapus lagu
// Endpoint untuk menghapus lagu
app.delete("/musik/:id", (req, res) => {
  const { id } = req.params;
  const index = musikList.findIndex((m) => m.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Lagu tidak ditemukan" });
  }

  musikList.splice(index, 1); // Hapus lagu dari array
  res.status(204).send(); // Response status 204 menunjukkan penghapusan berhasil
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
