import './App.css';
import Fileupload from './Fileupload';

function App() {
  let date =process.env.REACT_APP_URL
  return (
    <div className="App">
      {date}
      <Fileupload/>
    </div>
  );
}

export default App;
