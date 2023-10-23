import React, { useState } from "react";

function HitungPajak() {
  const [layer1, setLayer1] = useState({ field1: "", field2: "", field3: "" });
  const [layer2, setLayer2] = useState({ field1: "", field2: "", field3: "" });
  const [notification, setNotification] = useState(null);

  const handleLayer1Change = (e) => {
    const { name, value } = e.target;
    // Menghilangkan karakter non-angka
    const numericValue = value.replace(/\D/g, "");
    // Mengatur nilai dengan format numerik
    setLayer1({ ...layer1, [name]: numericValue });
  };

  const handleLayer2Change = (e) => {
    const { name, value } = e.target;
    setLayer2({ ...layer2, [name]: value });
  };

  const formatCurrency = (value) => {
    // Menerapkan format uang dengan ribuan dan ,- pada akhirnya
    return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "";
  };

  const handleHitung = () => {
    // Implement logic untuk menghitung pajak disini
    // Anda dapat menggabungkan data dari layer1 dan layer2
    // untuk perhitungan pajak sesuai kebutuhan Anda
    const pajakInfo = "Total Pajak: $500"; // Gantilah dengan perhitungan yang sesuai
    setNotification(pajakInfo);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="p-4 space-y-4 font-poppins bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="flex space-x-4">
        <div className="w-1/3">
          <label htmlFor="field1">Gaji Pokok (Rp)</label>
          <input
            type="text"
            id="field1"
            name="field1"
            value={formatCurrency(layer1.field1)}
            onChange={handleLayer1Change}
            className="w-full p-2 border rounded-lg bg-white text-black"
            placeholder="0"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="field2">Tunjangan Lainnya (Rp)</label>
          <input
            type="text"
            id="field2"
            name="field2"
            value={formatCurrency(layer1.field2)}
            onChange={handleLayer1Change}
            className="w-full p-2 border rounded-lg bg-white text-black"
            placeholder="0"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="field3">Field 3</label>
          <input
            type="text"
            id="field3"
            name="field3"
            value={layer1.field3}
            onChange={handleLayer1Change}
            className="w-full p-2 border rounded-lg border-blue-400"
            placeholder="Field 3"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <label htmlFor="field4">Field 1</label>
          <input
            type="text"
            id="field4"
            name="field1"
            value={layer2.field1}
            onChange={handleLayer2Change}
            className="w-full p-2 border rounded-lg border-green-400"
            placeholder="Field 1"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="field5">Field 2</label>
          <input
            type="text"
            id="field5"
            name="field2"
            value={layer2.field2}
            onChange={handleLayer2Change}
            className="w-full p-2 border rounded-lg border-green-400"
            placeholder="Field 2"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="field6">Field 3</label>
          <input
            type="text"
            id="field6"
            name="field3"
            value={layer2.field3}
            onChange={handleLayer2Change}
            className="w-full p-2 border rounded-lg border-green-400"
            placeholder="Field 3"
          />
        </div>
      </div>
      <button
        onClick={handleHitung}
        className="bg-white text-blue-500 p-2 rounded-lg hover:bg-purple-800"
      >
        Hitung
      </button>

      {notification && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-blue-500 p-8 rounded-lg animate__animated animate__bounceInDown">
            <p className="text-white">{notification}</p>
            <button onClick={closeNotification} className="mt-4 p-2 bg-red-500 text-white rounded-md">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HitungPajak;
