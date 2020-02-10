import React, { Component } from 'react';
import './App.css';
import products from './resources/products.js';
import ProductsTable from './components/ProdTable/ProdTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products,
      timer: 0,
      highlightAreasToRandomize: false
    }
  }

  getTotalCount(products) {
    const totalCount = products.reduce((accumulator, current) => {
      return accumulator + current.count;
    }, 0);

    return totalCount;
  }

  getAveragePrice(products) {
    const priceTotal = products.reduce((accumulator, current) => {
      return accumulator + current.price;
    }, 0);

    return (priceTotal / products.length).toFixed(2);
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  randomizeValues = () => {
    const randomizedProducts = this.state.products.map((product) => {
      return {
        name: product.name,
        count: this.getRandomInteger(1, 8),
        price: this.getRandomInteger(1, 20),
      }
    })

    this.setState({ products: randomizedProducts });
  }

  addRandomProduct = () => {
    const name = prompt('Give this product a name');
    if (!name) { return; }

    const prod = {
      name,
      count: this.getRandomInteger(1, 8),
      price: this.getRandomInteger(1, 20)
    };

    this.setState({ products: [...this.state.products, prod] });
  }

  deleteProduct = (idx) => {
    const sure = window.confirm('Are you sure?');
    if (!sure) { return; }

    let products = [...this.state.products];
    products.splice(idx, 1);
    this.setState({ products });
  }

  updateProduct = (idx) => {
    const name = prompt('Give this product a name');
    if (!name) { return; }

    let products = [...this.state.products];
    let newProd = products[idx];
    newProd.name = name;
    products.splice(idx, 1, newProd);
    this.setState({ products });
  }

  runTimer = () => {
    setInterval(() => {
      let timer = this.state.timer;
      timer+=1;

      this.setState({ timer });
    }, 1000);
  }

  componentDidMount = () => {
    this.runTimer();
  }

  highlightAreasToRandomize = () => {
    this.setState({ highlightAreasToRandomize: true });
  }

  turnOffHighlightedAreasToRandomize = () => {
    this.setState({ highlightAreasToRandomize: false });
  }

  highlightClass = () => { return this.state.highlightAreasToRandomize ? 'highlight-for-random' : ''  };

  render() { 
    return (
      <div className='app'>
        <div className="container">
          <ProductsTable 
            products={this.state.products} 
            deleteProduct={this.deleteProduct} 
            updateProduct={this.updateProduct}
            addRandomProduct={this.addRandomProduct}
            highlightClass={this.highlightClass()}>
          </ProductsTable>
          <div>Total count: <span className={this.highlightClass()}>{this.getTotalCount(this.state.products)}</span></div>
          <div>Average price: <span className={this.highlightClass()}>{this.getAveragePrice(this.state.products)}</span></div>
          <div className="app-randomize">
            <button type="button" 
            className="btn btn-outline-light btn-sm" 
            onClick={this.randomizeValues} 
            onMouseEnter={this.highlightAreasToRandomize}
            onMouseLeave={this.turnOffHighlightedAreasToRandomize}>Randomize values
          </button>
          </div>
          <div>Timer: {this.state.timer}</div>
        </div>
      </div>
    );
  }
}
 
export default App;