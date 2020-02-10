import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ProductsTable = (props) => {
  return ( 
    <React.Fragment>
      <h3>Products</h3>
      <table className="table table-striped table-dark table-hover table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Count</th>
            <th scope="col">Price</th>
            <th scope="col">Change</th>
            <th scope="col">Delete</th>
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
                  <td>{product.price}</td>
                  <td onClick={() => {props.updateProduct(idx)}}>change</td>
                  <td onClick={() => {props.deleteProduct(idx)}}>✕</td>
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </tbody>
      </table>
    </React.Fragment>
  );
}
 
export default ProductsTable;