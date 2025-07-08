import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, saveProduct } from '../redux/productsSlice';

export default function Product() {
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.selectedProduct);
  const error = useSelector(state => state.products.error);

  if (!product) return <div>Select a product</div>;

  const handleQuantityChange = (delta) => {
    dispatch(changeQuantity({ id: product.id, delta }));
  };

  const handleSave = () => {
    dispatch(saveProduct(product));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Quantity: {product.quantity}</p>
      <button onClick={() => handleQuantityChange(1)}> + </button>
      <button onClick={() => handleQuantityChange(-1)}> - </button>
      <br />
      <button onClick={handleSave}>Save</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
