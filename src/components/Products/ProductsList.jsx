import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const [page,setPage]=useState(1);
  const [sortBy,setSortBy]=useState('');
  const [sortedProducts,setSortedProducts]=useState([]);
  const category = search.get("category");
  const searchQuery = search.get("search");
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search:searchQuery,
        category: category,
        perPage:10,
        page: page,
      },
    },
    [searchQuery,category, page]
  );

  useEffect(()=>{
    setPage(1)
  },[searchQuery,category])

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({...currentParams, page: parseInt(currentParams.page)+1 });
  };
  // const [products,setProducts]=useState([]);
  // const [error,setError]=useState("");
  // useEffect(()=>{
  //   apiClient.get("/products")
  //   .then(res=>setProducts(res.data.products))
  //   .catch(err=>setError(err.message))
  // },[])
  useEffect(()=>{
    const handleScroll=()=>{
      const{scrollTop, clientHeight, scrollHeight} = document.documentElement;
      if(scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && data && page<data.totalPages){
        console.log("Reached to Bottom!");
        setPage(prev=>prev+1)
      }
    }
    window.addEventListener("scroll",handleScroll)
    return () =>  window.removeEventListener("scroll",handleScroll)
  },[data,isLoading])

  
  
  

  useEffect(()=>{
    // a is first item and b is second item desc  means b-a  for asc a-b
    if(data && data.products){
      const products=[...data.products]
      if(sortBy==="price desc"){
        setSortedProducts(products.sort((a,b) => b.price - a.price))
      }else if(sortBy==="price asc"){
        setSortedProducts(products.sort((a,b) => a.price - b.price))
      }else if(sortBy==="rate desc"){
        setSortedProducts(products.sort((a,b) => b.reviews.rate - a.reviews.rate))
      }else if(sortBy==="rate asc"){
        setSortedProducts(products.sort((a,b) => a.reviews.rate - b.reviews.rate))
      }else{
        setSortedProducts(products);
      }
    }
  },[sortBy,data])

  return (
    <section className="product_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting" onChange={e=>setSortBy(e.target.value)}>
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>
      <div className="products_list">
        {error && <p className="form_error">{error}</p>}
        { data?.products &&
            sortedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
        {isLoading
          && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
          
      </div>
      {/* <Pagination
        totalRecords={data?.totalProducts}
        recordsPerPage={8}
        onClick={handlePageChange}
        currentpage={page}
      /> */}
    </section>
  );
};

export default ProductsList;
