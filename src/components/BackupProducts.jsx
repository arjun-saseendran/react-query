import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

function BackupProducts() {

    const query = useQueryClient()

    const products = query.getQueriesData(['products'])

    console.log(products);
    

  return (
    <div>
      <h1>Product</h1>
      <ul>
        {products?.map((p) => (
          <li key={p._id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BackupProducts