import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.fetchDog = this.fetchDog.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      dogImagePath: '',
    };
  }

  async componentDidMount() {
    const imgUrl = await this.fetchDog();
    this.updateState(imgUrl);
  }

  async handleClick() {
    const imgUrl = await this.fetchDog();
    this.updateState(imgUrl);
  }

  async fetchDog() {
    const makeDogRequest = await fetch('https://dog.ceo/api/breeds/image/random');
    const dogResponse = await makeDogRequest.json();
    const imgPath = dogResponse.message;
    return imgPath;
  }

  updateState(url) {
    this.setState((state) => ({ ...state, dogImagePath: url }));
  }

  render() {
    const { dogImagePath } = this.state;
    if (dogImagePath === '') {
      return (
        <div className="main">
          <p>LOADING...</p>
        </div>
      );
    }
    return (
      <div className="main">
        <img className="dog-picture" src={ dogImagePath } alt="random-dog" />
        <button
          className="dog-button"
          type="button"
          onClick={ this.handleClick }
        >
          Get random dog!
        </button>
      </div>
    );
  }
}

export default App;
