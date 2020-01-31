import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // 1. Look up the current store in the firebase datastore
    const store = await base.fetch(this.props.storeId, {context: this});
    // 2. Claim store if there is no owner
    if (!store.owner) {
      // create store owner property in firebase if there isn't one, assign to logged in user
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set state of inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
      // Creating local state that doesn't need to exist in other components
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    // TODO: Make logout button a separate component

    // 1. Check if a user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if logged in user is not the store owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the store owner.</p>
          <button onClick={this.logout}>Log Out</button>
        </div>
      );
    }
    
    // 3. Proceed to render inventory as store owner
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <button onClick={this.logout}>Log Out</button>
        {Object.keys(this.props.fishes).map(key => (           <EditFishForm 
            key={key} 
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;