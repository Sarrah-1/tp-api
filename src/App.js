import './App.css';
import FetchPosts from './FetchPosts';
import AxiosUsers from './AxiosUsers';

function App() {
  return (
    <div className="App">
      <h1>TP – Consommer une API avec React</h1>
      <section>
        <h2>Articles (fetch)</h2>
        <FetchPosts />
      </section>
      <section>
        <h2>Utilisateurs (axios)</h2>
        <AxiosUsers />
      </section>
    </div>
  );
}

export default App;
