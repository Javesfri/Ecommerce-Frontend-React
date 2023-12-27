import "./ProductsFilterStyles.css"
import { Link } from "react-router-dom";
export const ProductFilter = ({
  filterTitle,
  filterArray,
  pathname,
  query,
  filterBy,
}) => {
  return (
    <div className="ProductFilterContainer">
      <h4 className="filterTitle">{filterTitle}</h4>
      {filterArray.map((filter) => (
        <Link
        className="filterLink"
          key={filter}
          to={{ pathname: pathname, search: `?${filterBy}=${filter}` }}       >
           {`>${filter}`}
        </Link>
      ))}
    </div>
  );
};

