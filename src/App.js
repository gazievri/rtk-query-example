import { useState } from 'react';
import { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } from './redux';

function App() {
  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const {data = [], isLoading} = useGetGoodsQuery(count);
  const [addProduct, {isError}] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async() => {
    if (newProduct) {
      await addProduct({name: newProduct}).unwrap();
      setNewProduct('');
    }
  }

  const handleDeleteProduct = async(id) => {
      await deleteProduct(id).unwrap();
    }


  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="App">

      <div>
        <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
        <button onClick={handleAddProduct}>add</button>
      </div>

      <select value={count} onChange={(event => setCount(event.target.value))}>
        <option value="">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <ul>
        {
          data.map(item => (
            <li key={item.id} onClick={(e) => handleDeleteProduct(item.id)}>
              {item.name}
            </li>
          ))
        }
      </ul>

    </div>
  );
}

export default App;
