import React, { useState } from 'react';
import StudentRegistration from './StudentRegistration';
import StudentList from './StudentList';

const App = () => {
  const [currentPage, setCurrentPage] = useState('list'); // 'list' or 'register'

  return (
    <div>
      <nav style={{
        backgroundColor: '#007bff',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          gap: '1rem'
        }}>
          <button
            onClick={() => setCurrentPage('list')}
            style={{
              ...navButtonStyle,
              backgroundColor: currentPage === 'list' ? '#0056b3' : 'transparent'
            }}
          >
            View Students
          </button>
          <button
            onClick={() => setCurrentPage('register')}
            style={{
              ...navButtonStyle,
              backgroundColor: currentPage === 'register' ? '#0056b3' : 'transparent'
            }}
          >
            Register New Student
          </button>
        </div>
      </nav>

      {currentPage === 'register' ? <StudentRegistration /> : <StudentList />}
    </div>
  );
};

const navButtonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default App;