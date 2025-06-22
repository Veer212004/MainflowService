import React, { useState } from 'react';
import './App.css';
import { User, Mail, Phone,  Star } from 'lucide-react';

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', role: 'Manager' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: '' });
  const [showForm, setShowForm] = useState(false);

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setNewUser({ name: '', email: '', phone: '', role: '' });
      setShowForm(false);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management System</h1>
          <p className="text-gray-600">Simple React application for managing users</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Users ({users.length})</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {showForm ? 'Cancel' : 'Add User'}
            </button>
          </div>

          {showForm && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Add New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={addUser}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add User
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  </div>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {user.phone}
                    </div>
                  )}
                  {user.role && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      {user.role}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found. Add some users to get started!
            </div>
          )}
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>Built with React • Simple and Clean Design</p>
        </footer>
      </div>
    </div>
  );
}