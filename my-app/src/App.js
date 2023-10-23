import React, { useState, useEffect } from 'react';
import manifest from './manifest.json';
import './App.css';

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';

function calculateAge(dateOfBirth) {
  const dob = moment(dateOfBirth, 'YYYY-MM-DD');
  const today = moment();

  if (!dob.isValid()) {
    return 'Invalid Date of Birth';
  }

  const age = today.diff(dob, 'years');
  return age;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({ gender: '', country: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setData(manifest);
  }, []);

  const toggleDetails = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData({
      gender: data[index].gender,
      country: data[index].country,
      description: data[index].description,
    });
  };

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      gender: editedData.gender,
      country: editedData.country,
      description: editedData.description,
    };
    setData(updatedData);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const confirmation = window.confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);
    }
  };

  const filteredData = data.filter((record) =>
    record.first.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h3>List View</h3>
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      {filteredData.map((record, index) => (
        <div className="box" key={index}>
          <div className="box-header">
            <img
              src={record.picture}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              alt={record.first}
            />
            <span>
              {record.first} {record.last}
            </span>
            <div className="dropdown-arrow" onClick={() => toggleDetails(index)}>
              {expandedIndex === index ? '▲' : '▼'}
            </div>
          </div>
          {expandedIndex === index && (
            <div className="details">
              <table className="info-table">
                <tr>
                  <td>Gender</td>
                  <td>Country</td>
                  <td>Age</td>
                </tr>
                <tr>
                  <td>
                    <div className="gender-box">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editedData.gender}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              gender: e.target.value,
                            })
                          }
                        />
                      ) : (
                        record.gender
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="gender-box1">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editedData.country}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              country: e.target.value,
                            })
                          }
                        />
                      ) : (
                        record.country
                      )}
                    </div>
                  </td>
                  <td>{calculateAge(record.dob)}</td>
                </tr>
              </table>
              <b>Description:</b>
              <div className="description-box">
                {editIndex === index ? (
                  <textarea
                    value={editedData.description}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{record.description}</p>
                )}
              </div>
              {editIndex === index ? (
                <div className="edit-delete-buttons">
                  <button onClick={() => handleSave(index)}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              ) : (
                <div className="edit-delete-buttons">
                  <button onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
