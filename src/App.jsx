import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import BackupProducts from "./components/BackupProducts";

function App() {
  const [viewProducts, setViewProducts] = useState(false);

  const query = useQueryClient()

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios("http://localhost:4000/product");
      return response.data;
    },
    enabled: true,
    refetchOnWindowFocus: false
  });

  if (isSuccess) {
    console.log(data);
  }

  if (isError) {
    console.log("error");
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.put("http://localhost:4000/");
      data: {
        title: "iPhone 13";
      }

      
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ['products']
      })
    }
  });

  return (
    <>
      <button onClick={() => setViewProducts(true)}>Fetch Api</button>
      <button onClick={() => mutate()}>Add Product</button>
      <h1>Product</h1>
      <ul>
        {data?.map((p) => (
          <li key={p._id}>{p.title}</li>
        ))}
      </ul>
      <BackupProducts />
    </>
  );
}

export default App;
