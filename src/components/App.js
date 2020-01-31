import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }


  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish; // makes a unique fish id, unless you submit faster than 1 per millisecond
    // 3. Set new fishes object to state
    this.setState({
      fishes // fishes: fishes
    });
    console.log("Adding a fish object...");
  };

  updateFish = (key, updatedFish) => {
    // 1. Take copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update state
    fishes[key] = updatedFish;
    // 3. Set update to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. Update state
    fishes[key] = null; // Firebase will not remove items unless set to null
    // 3. Update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Add to, or update item quantity
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Delete item matching the key
    delete order[key];
    // 3. Call setState to update state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key} 
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;