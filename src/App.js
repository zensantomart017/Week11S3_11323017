import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: '',
      editIndex: null,
      editedItem: ''
    };
  }

  handleChange = (e) => {
    this.setState({ newItem: e.target.value });
  };

  addItem = () => {
    if (this.state.newItem !== '') {
      this.setState((prevState) => ({
        items: [...prevState.items, prevState.newItem],
        newItem: ''
      }));
    }
  };

  removeItem = (index) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((_, i) => i !== index)
    }));
  };

  editItem = (index) => {
    this.setState({
      editIndex: index,
      editedItem: this.state.items[index]
    });
  };

  saveEdit = () => {
    const { editIndex, editedItem } = this.state;
    const updatedItems = [...this.state.items];
    updatedItems[editIndex] = editedItem;
    this.setState({
      items: updatedItems,
      editIndex: null,
      editedItem: ''
    });
  };

  cancelEdit = () => {
    this.setState({
      editIndex: null,
      editedItem: ''
    });
  };

  handleEditChange = (e) => {
    this.setState({ editedItem: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Daftar To-Do-List</h1>
        <input
          type="text"
          value={this.state.newItem}
          onChange={this.handleChange}
          placeholder="Tambahkan item baru"
        />
        <button onClick={this.addItem}>Tambahkan</button>
        <ul>
          {this.state.items.map((item, index) => (
            <li key={index}>
              {this.state.editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={this.state.editedItem}
                    onChange={this.handleEditChange}
                  />
                  <button onClick={this.saveEdit}>Simpan</button>
                  <button onClick={this.cancelEdit}>Batal</button>
                </>
              ) : (
                <>
                  {item}
                  <button onClick={() => this.removeItem(index)}>Hapus</button>
                  <button onClick={() => this.editItem(index)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
