/*
import React from 'react'

import { Table, Row, Col } from 'antd'

const navigation21 = () => <div className='content-inner'>
 <p>hello world !</p>
</div>

export default navigation21
*/
import React, { Component } from 'react';

export default class navigation21 extends Component {
  constructor(props) {
        super(props);
        this.state = {
          a:'444'
        };
      }
  test=()=>{
    alert('333');
    this.setState({a:'555'});
  }
  render() {
    
    return (
      <div>
      <p>you are welcome {this.state.a}</p>
      <button onClick={this.test}>test</button>

      </div>
    );
  }
}

