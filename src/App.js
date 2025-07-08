import './App.css';
import Products from './components/Products';
import Product from './components/Product';
function App() {
  return (
     <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <Products />
      </div>
      <div style={{ flex: 1 }}>
        <Product />
      </div>
    </div>
  );
}

export default App;
