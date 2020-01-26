import React from 'react';

class EditFishForm extends React.Component {
  handleChange = event => {
    console.log(event.currentTarget.value);
    // update fish
    // Take a copy of the current fish, overwrite the thing that gets changed
    const updatedFish = { 
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
      // Using computed property names, making property being updated dynamic, using the "name" property
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return <div className="fish-edit">
      <input 
        type="text" 
        name="name" 
        onChange={this.handleChange} 
        value={this.props.fish.name}
      />
      <input 
        type="text" 
        name="price" 
        onChange={this.handleChange}
        value={this.props.fish.price}
      />
      <select 
        type="text" 
        name="status" 
        onChange={this.handleChange}
        value={this.props.fish.status}
      >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
      </select>
      <textarea 
        name="desc" 
        onChange={this.handleChange}
        value={this.props.fish.desc}
      />
      <input 
        type="text" 
        name="image" 
        onChange={this.handleChange}
        value={this.props.fish.image}
      />
      <button onClick={() => this.props.deleteFish(this.props.index)}>
        Remove Fish
      </button>
    </div>
  }
}

export default EditFishForm;