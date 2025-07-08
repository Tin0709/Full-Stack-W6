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
        <div key={p.id} onClick={() => dispatch(selectProduct(p))}>
          {p.name} (Quantity: {p.quantity})
        </div>
      ))}
    </div>
  );
}
