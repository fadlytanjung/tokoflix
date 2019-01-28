import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar'
import FooterBar from './components/FooterBar'
import { BrowserRouter,Route ,Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Detail from './components/Detail';
import Error from './components/Error';
import Myfilm from './components/Myfilm';

class App extends Component {
  constructor(props) {
    super(props);
   
    if(localStorage.getItem('saldo')==null){
        localStorage.setItem('saldo',100000);
    }
    
    if(localStorage.getItem('idbuyyer')==null){
        localStorage.setItem('idbuyyer','0');
    }
}
  render() {
   
    return (
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            <Route path="/" component={Dashboard} exact></Route>
            <Route path="/detail/:id" component={Detail}></Route>
            <Route path="/myfilm" component={Myfilm}></Route>
            <Route component={Error}></Route>
          </Switch>
          <FooterBar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
