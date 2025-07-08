import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, saveProduct } from '../redux/productsSlice';
import { useState } from 'react';

export default function Product() {
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.selectedProduct);
  const error = useSelector(state => state.products.error);
  const [statusMessage, setStatusMessage] = useState('');

  if (!product) return <div>Select a product</div>;

  const handleQuantityChange = (delta) => {
    setStatusMessage('');
    dispatch(changeQuantity({ id: product.id, delta }));
  };

  const handleSave = async () => {
    const resultAction = await dispatch(saveProduct(product));
    if (saveProduct.fulfilled.match(resultAction)) {
      setStatusMessage('✅ Product saved successfully!');
    } else {
      setStatusMessage(`❌ ${resultAction.payload}`);
    }
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
      <div style={{ marginTop: '10px', color: error ? 'red' : 'green' }}>
        {statusMessage}
      </div>
    </div>
  );
}
