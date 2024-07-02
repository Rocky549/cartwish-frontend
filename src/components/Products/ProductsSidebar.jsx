import React from "react";
import config from '../../config.json'
import "./ProductsSidebar.css";
import LinkWithIcon from "./../NavBar/LinkWithIcon";
import useData from "../../hooks/useData";

const ProductsSidebar = () => {
 const {data:category,error}=useData("/category")
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error&&<em className="form_error">{error}</em>}
        {category && category.map((item) => (
          <LinkWithIcon
            key={item._id}
            title={item.name}
            link={`/products?category=${item.name}`}
            emoji={`${config.backendURL}/category/${item.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
