import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../declarations/st-registion-backend';

// Add this before creating the agent
const globalThis = window; // Fix for global not defined error

// Initialize the agent and canister
const agent = new HttpAgent({
  host: "http://localhost:4943" // Local replica
});

// Only fetch root key in development
if (process.env.NODE_ENV !== "production") {
  try {
    agent.fetchRootKey();
  } catch(err) {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  }
}

const canisterId = import.meta.env.VITE_CANISTER_ID_ST_REGISTION_BACKEND || 'bkyz2-fmaaa-aaaaa-qaaaq-cai';

if (!canisterId) {
  throw new Error("Canister ID not found!");
}

const canister = Actor.createActor(idlFactory, {
  agent,
  canisterId
});

// Make canister available globally (optional, for debugging)
window.canister = canister;

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    course: '',
    year: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const student = {
        ...formData,
        registrationDate: new Date().toISOString()
      };
      
      const result = await canister.registerStudent(student);
      if ('ok' in result) {
        setStatus({
          type: 'success',
          message: 'Student registered successfully!'
        });
        setFormData({
          studentId: '',
          name: '',
          email: '',
          course: '',
          year: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to register student: ' + result.err
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to register student. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Registration</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input
          type="number"
          name="year"
          placeholder="Year Of Birth"
          value={formData.year}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Registering...' : 'Register Student'}
        </button>

        {status.message && (
          <div style={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: status.type === 'error' ? '#ffebee' : '#e8f5e9',
            color: status.type === 'error' ? '#c62828' : '#2e7d32',
            marginTop: '10px'
          }}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentRegistration;