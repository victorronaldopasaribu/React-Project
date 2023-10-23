import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import { FaSignOutAlt, FaClock, FaRegClock } from 'react-icons/fa'; // Import Font Awesome icons

function Home() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Perform any necessary logout logic here, e.g., clearing user session or state.
    // After logout logic, navigate back to the Login page.
    navigate('/login'); // Navigate to the "Login" page.
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:3001/getUsername', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setGreeting(getGreeting());
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return 'Good morning';
      } else if (currentHour >= 12 && currentHour < 17) {
        return 'Good afternoon';
      } else {
        return 'Good evening';
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <button onClick={handleLogout} className="absolute top-0 right-0 m-4 bg-red-500 text-white hover:bg-red-400 px-4 py-2 rounded">
          <FaSignOutAlt /> {/* Render the log out icon */}
        </button>
        <h2 className="text-2xl font-bold" style={{ marginBottom: '20px' }}>
          {greeting}, {username}!
        </h2>
        <div className="flex space-x-8">
          <div className="w-40 h-40 bg-blue-500 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Clock In</h2>
            <Link to="/clockin">
              <button className="bg-white text-blue-500 hover:bg-blue-400 px-4 py-2 rounded mt-4">
                <FaRegClock size={40}/>
              </button>
            </Link>
          </div>
          <div className="w-40 h-40 bg-yellow-500 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Clock Out</h2>
            <button className="bg-white text-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded mt-4">
              <FaClock size={40}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
