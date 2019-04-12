import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/tasks")
      .then(res => res.json())
      .then(
        result => {
          let itemList = result.map(item => {
            item = {
              text: item.task,
              key: item.id
            };
            return item;
          });
          this.setState({
            items: itemList
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  componentWillUnmount() {}

  addItem(e) {
    let value = this._inputElement.value;
    if (value !== "") {
      fetch("http://localhost:3000/api/tasks", {
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `task=${value}`
      })
        .then(res => res.json())
        .then(result => {
          let newItem = {
            text: value,
            key: result.id
          };
          this.setState(prevState => {
            return {
              items: prevState.items.concat(newItem)
            };
          });
        });
      this._inputElement.value = "";
    }
    console.log(this.state.items);

    e.preventDefault();
  }

  deleteItem(key) {
    fetch(`http://localhost:3000/api/tasks/${key}`, {
      method: "delete"
    });

    var filteredItems = this.state.items.filter(function(item) {
      return item.key !== key;
    });

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              ref={a => (this._inputElement = a)}
              placeholder="enter task"
            />
            <button type="submit">add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items} delete={this.deleteItem} />
      </div>
    );
  }
}

export default App;
