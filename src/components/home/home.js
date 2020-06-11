import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import home from "./home.css";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     modal: false
   };
   this.state ={
    listItem:[],
    name: '',
    comments:''
   }
   this.toggle = this.toggle.bind(this);
 };
 toggle() {
   this.setState({
     modal: !this.state.modal
   });
   
   
 }

 onSubmit = (event) => {
  console.log(this.state.name,this.state.comments);
  var items = JSON.parse(localStorage.getItem("listItem") || "[]");
  let id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }
  console.log(Math.floor((1 + Math.random()) * 0x10000))
     items.push({
      id: Math.floor((1 + Math.random()) * 0x10000),
      name: this.state.name,
      status: this.state.comments,
      color:'green',
      comments: this.state.comments
    });
    localStorage.setItem("listItem", JSON.stringify(items));
  console.log(items)
  this.setState({
    modal: !this.state.modal
  });
  alert('Item Saved')
    }
    handleChange = (event) => {
     const target = event.target;
     const field = target.name;
     const value = target.value
     console.log(value)
     this.setState({
      [field]: value
  });
     
  }
  render() {
    // const listItem = [{
    //   id: 1,
    //   name: 'item 1',
    //   status: 'Completed',
    //   color:'green',
    //   comments: ''
    // },
    // {
    //   id: 2,
    //   name: 'item 2',
    //   status: 'Completed',
    //   color:'green',
    //   comments: ''
    // },
    // {
    //   id: 3,
    //   name: 'item 3',
    //   status: 'pending',
    //   color:'red',
    //   comments: ''
    // },
    // {
    //   id: 4,
    //   name: 'item 4',
    //   status: 'pending',
    //   color:'red',
    //   comments: ''
    // },
    // {
    //   id: 5,
    //   name: 'item 5',
    //   status: 'pending',
    //   color:'red',
    //   comments: ''
    // },
    // ]
    var items = JSON.parse(localStorage.getItem("listItem") || "[]");

    return (
      <div className="content">
        <Row>
          {items.map(item => {
            return <div className={item.status === 'Completed' ? "class1" : "class2" }>
              <Container>
                <Row>
                  <Col sm={3} className="col">
                  <div className={item.status === 'Completed' ? "card-container" : "card-containerpending" }>
                  {item.name}<br/>
                  {item.status}
                  </div>
                  </Col>
                </Row>
              </Container>
            </div>
          })}
        </Row>
        <div className="divBtn">
          <button className="addBtn" onClick={this.toggle}> Add Item</button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Enter item Details</ModalHeader>
          <ModalBody>
            <div className="inputDiv">
            <input type="text" className="inputText" placeholder="Item name"  onChange={this.handleChange} name="name" value={this.state.name}
                                   
                                    id="name"></input><br/>
            </div>
            <div className="textareaDiv">
            <textarea className="inputTextarea" placeholder="Comments"   onChange={this.handleChange} name="comments" value={this.state.comments}
                                   
                                    id="comment"></textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggle} className="cancelBtn">Cancel</Button>
            <Button onClick={this.onSubmit} className="saveBtn">Save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Home;