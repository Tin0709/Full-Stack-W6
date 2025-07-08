import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProduct } from '../redux/productsSlice';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Product List</h2>
      {products.map(p => (
        <div
          key={p.id}
          onClick={() => dispatch(selectProduct(p))}
          style={{
            padding: '8px',
            margin: '6px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            transition: '0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
        >
          {p.name} (Quantity: {p.quantity})
        </div>
      ))}
    </div>
  );
}
