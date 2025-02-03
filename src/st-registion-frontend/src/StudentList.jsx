import React, { useState, useEffect } from 'react'; // Added useEffect here
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

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Form state for editing
  const [editForm, setEditForm] = useState({
    studentId: '',
    name: '',
    email: '',
    course: '',
    year: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      // Replace with actual backend call
      const result = await window.canister.getAllStudents();
      setStudents(result);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to fetch students'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditForm(student);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await window.canister.updateStudent(editForm);
      setStatus({
        type: 'success',
        message: 'Student updated successfully'
      });
      setEditingStudent(null);
      await fetchStudents();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to update student'
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setIsLoading(true);
        await window.canister.deleteStudent(studentId);
        setStatus({
          type: 'success',
          message: 'Student deleted successfully'
        });
        await fetchStudents();
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Failed to delete student'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading && students.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Registered Students</h1>

      {status.message && (
        <div style={{
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: status.type === 'error' ? '#ffebee' : '#e8f5e9',
          color: status.type === 'error' ? '#c62828' : '#2e7d32',
          marginBottom: '20px'
        }}>
          {status.message}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Student ID</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Course</th>
              <th style={tableHeaderStyle}>Year Of Birth</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId}>
                {editingStudent?.studentId === student.studentId ? (
                  <td colSpan="6">
                    <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '10px', padding: '10px' }}>
                      <input
                        type="text"
                        name="studentId"
                        value={editForm.studentId}
                        onChange={handleChange}
                        style={inputStyle}
                        readOnly
                      />
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                      <input
                        type="text"
                        name="course"
                        value={editForm.course}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                      <input
                        type="text"
                        name="year"
                        value={editForm.year}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button type="submit" style={buttonStyle}>Save</button>
                        <button 
                          type="button" 
                          onClick={() => setEditingStudent(null)}
                          style={{ ...buttonStyle, backgroundColor: '#6c757d' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td style={tableCellStyle}>{student.studentId}</td>
                    <td style={tableCellStyle}>{student.name}</td>
                    <td style={tableCellStyle}>{student.email}</td>
                    <td style={tableCellStyle}>{student.course}</td>
                    <td style={tableCellStyle}>{student.year}</td>
                    <td style={tableCellStyle}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          onClick={() => handleEdit(student)}
                          style={{ ...buttonStyle, backgroundColor: '#28a745' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(student.studentId)}
                          style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const tableHeaderStyle = {
  backgroundColor: '#f8f9fa',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #dee2e6'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #dee2e6'
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ced4da',
  flex: 1
};

const buttonStyle = {
  padding: '8px 12px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer'
};

export default StudentList;