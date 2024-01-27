import logo from './logo.svg';
import './App.css';

function App() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the upload
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={handleFileUpload} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
