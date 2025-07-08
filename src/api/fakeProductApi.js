let products = [
  { id: 1, name: 'Laptop', description: 'A powerful laptop', quantity: 5 },
  { id: 2, name: 'Phone', description: 'A smart phone', quantity: 10 },
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...products]), 500); // return a shallow copy
  });
};

export const updateProduct = (updatedProduct) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (updatedProduct.quantity < 0) {
        reject(new Error('Quantity cannot be less than 0'));
      } else {
        // Make a new copy of the product list with updated product
        products = products.map(p =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        );
        resolve({ ...updatedProduct }); // return a fresh copy
      }
    }, 500);
  });
};
