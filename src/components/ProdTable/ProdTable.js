import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './ProdTable.css';

const ProductsTable = (props) => {
  return ( 
    <div className="products-table"> 
      <h3>Products</h3>
      <table className="table table-striped table-dark table-hover table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Count</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
            {props.products.map((product, idx) => (
              <CSSTransition
                key={idx}
                timeout={300}
                classNames="product"
              >
                <tr key={idx}>
                  <th scope="row">{idx+1}</th>
                  <td>{product.name}</td>
                  <td>{product.count}</td>
                  <td>
                    {product.price}
                    <span className="products-table__edit-icons">
                      <span onClick={() => {props.updateProduct(idx)}}><i className="products-table__icon products-table__icon--update far fa-edit"></i></span>
                      <span onClick={() => {props.deleteProduct(idx)}}><i className="products-table__icon products-table__icon--trash fas fa-trash-alt"></i></span>
                    </span>
                  </td>
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </tbody>
      </table>
      <span onClick={() => {props.addRandomProduct()}} className="products-table__add"><i className="fas fa-plus"></i></span>
      <div className="products-table__next-row"></div>
    </div>
  );
}
 
export default ProductsTable;