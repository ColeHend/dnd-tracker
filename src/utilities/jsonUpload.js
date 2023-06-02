import React, { useState } from 'react';
import JsonService from './fileService';

function UploadJsonFile(props) {
  const [data, setData] = useState([]);
  const [filename, setFilename] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFilename(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const jsonString = reader.result
      const newData = JSON.parse(jsonString);
      setData(newData);
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    setData([]);
    setFilename('');
  };

  const handleSave = () => {
    const jsonService = new JsonService();
    jsonService.saveFile(filename, data);
    };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {filename && (
        <div>
          File selected: {filename}
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      {data.length > 0 && (
        <div>
          <h2>Data:</h2>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {item.id}: {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UploadJsonFile;
