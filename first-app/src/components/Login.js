import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/dummy.jpg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Tambah state showPassword
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Mengirim username dan password ke server
      });
  
      if (response.status === 200) {
        // Login berhasil
        toast.success('Login berhasil', { autoClose: 2000 });
        // Mengarahkan pengguna ke halaman Home
        navigate('/home');
      } else if (response.status === 401) {
        toast.error('Login gagal: Username atau password salah', { autoClose: 2000 });
      } else {
        toast.error('Terjadi kesalahan server', { autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan', { autoClose: 2000 });
    }
  };

  // Fungsi untuk mengganti status showPassword
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-poppins min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Isi gambar latar belakang */}
      </div>
      <div className="lg:w-1/2 p-10 mx-auto flex flex-col justify-center">
        <div className="text-white text-4xl lg:text-5xl font-extrabold text-center mb-6">Welcome Back!</div>
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-white text-lg font-semibold block mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 bg-white bg-opacity-30 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-white text-lg font-semibold block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Ganti tampilan password sesuai status showPassword
                id="password"
                className="w-full p-3 bg-white bg-opacity-30 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleShowPassword} // Tombol untuk mengganti status showPassword
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'} {/* Teks pada tombol bergantung pada status showPassword */}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-md hover-bg-blue-700 transition-all duration-300">
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
