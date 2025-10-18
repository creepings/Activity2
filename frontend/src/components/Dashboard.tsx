import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Note } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await notesAPI.getAll();
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingNote) {
        await notesAPI.update(editingNote.id, title, content);
        setEditingNote(null);
      } else {
        await notesAPI.create(title, content);
      }
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      setError('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.delete(id);
        fetchNotes();
      } catch (err) {
        setError('Failed to delete note');
      }
    }
  };

  const handleCancel = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>My Notes</h1>
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="note-form-section">
          <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
          <form onSubmit={handleSubmit} className="note-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
                placeholder="Enter note title"
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={loading}
                placeholder="Enter note content"
                rows={6}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingNote ? 'Update Note' : 'Create Note'}
              </button>
              {editingNote && (
                <button type="button" onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="notes-list-section">
          <h2>Your Notes ({notes.length})</h2>
          {notes.length === 0 ? (
            <p className="no-notes">No notes yet. Create your first note!</p>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note.id} className="note-card">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <div className="note-meta">
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="note-actions">
                    <button onClick={() => handleEdit(note)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(note.id)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;