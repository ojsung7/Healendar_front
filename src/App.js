// import logo from './logo.svg';
import './App.css';
import Calendar from './component/Calendar';
// import Content2 from './component/Content2';
import Footer from './component/Footer';
import Header from './component/Header';
import Menu from './component/Menu';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';

function App() {
  return (
    <Router basename={"/"}>
    <div className="App">
      <Header />
      <div className='middle'>
        <Menu />
        <div className='main'>
          <Switch>
          <Route path="/" component={Calendar} exact/>                 
          </Switch>
        </div>
      </div>
      <Footer />    
    </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
