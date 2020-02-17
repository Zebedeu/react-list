import React, { Component } from 'react';
import './App.css';
import ListItems from './List/ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends Component {
 
  constructor(props){
    super(props);

    this.state = {
      items:[],
      currentItem: {
        text:'',
        key:''
      }
    }
    this.handlerInput = this.handlerInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    
  }
  handlerInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key:Date.now()
      }
    })
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const newItems = [...this.state.items, newItem]
      this.setState({
        items: newItems,
        currentItem:{
          text:'',
          key:''
        }
      })
    }

  }

  deleteItem(key) {
    const filterItems = this.state.items.filter(item => 
      item.key !== key );
      this.setState({items:filterItems});
  }

  setUpdate(text, key){
    const items = this.state.items;
    items.map(
      item => {
        if(item.key === key){
          item.text = text;
        }
      })
      this.setState({
        items:items
      })
  }
  render(){

    return(
      <div className="App">
        <section className="container m-5">
            <main>
                <form id="mz-form" onSubmit={this.addItem}>
                <input type="text"  placeholder="enter a text" value={this.state.currentItem.text} onChange={this.handlerInput} />
                <button type="submit">Submit</button>
                </form>
                <ListItems 
                items ={this.state.items}
                deleteItem = {this.deleteItem}
                setUpdate = {this.setUpdate}
                />
            </main>
        </section>
      </div>
    )
        
  }
}

export default App;
