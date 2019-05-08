import React, { Component } from "react";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      keyPressCount: 0,
      warning:false
    };

    this.formatNumber = this.formatNumber.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.isNumeric = this.isNumeric.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {}

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  handleKeyPress(e) {
    this.setState({ keyPressCount: this.state.keyPressCount + 1 });

     if (this.isNumeric(e.key) === false && e.key !== "Backspace") {
      //  let string = this.state.number.slice(
      //    0,
      //    this.state.number.length - 2
      //  );
      //  let string2 = string.slice(0, this.state.number.length - 1);
      //  this.setState({ number: string });
       this.setState({ warning: true , number:""});
       setTimeout(() => { this.setState({ warning: false , number:"" }) }, 2000);
     }
    
    

    console.log("key is :", e.key);
    if (e.key === "Backspace" && this.state.number.length === 11) {
      let string = this.state.number.slice(0, this.state.number.length - 1);
      this.setState({ number: string });
    }

    if (e.key === "Backspace" && this.state.number.length === 7) {
      let string = this.state.number.slice(1, this.state.number.length - 2);
      this.setState({ number: string });
    }

   
  }

  formatNumber(e) {
    let numberString = e.target.value;
    this.setState({ number: numberString });

    // if (numberString.length === 3 && numberString[0] !== "(") {

    //   let string = "(" + numberString + ")";
    //   numberString = string;
    //   this.setState({ number: numberString });
    // }

    if (numberString.length === 4 && numberString[3] !== " ") {
      let str1 = "(" + numberString.slice(0, 3) + ")";
      let string2 = str1 + " " + numberString.slice(3);
      numberString = string2;
      this.setState({ number: numberString });
    } else if (numberString.length === 10 && numberString[9] !== "-") {
      let string1 = numberString.slice(0, 9);
      let string2 = string1 + "-" + numberString.slice(9);
      numberString = string2;
      this.setState({ number: numberString });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Format Phone Number in US Format</h1>
        <form>
          <label>Enter the Number here :</label>
          <input
            type="tel"
            value={this.state.number}
            placeholder="(XXX) XXX-XXXX"
            onKeyDown={e => {
              this.handleKeyPress(e);
            }}
            // onKeyUp={e => this.handleInput(e)}
            onChange={e => this.formatNumber(e)}
            maxLength="14"
          />
          {this.state.warning === true ? <p style={{color:"red"}}>Only Numeric input allowed</p>:null}
          <br />
          <br />
          <button onClick={() => this.setState({ number: "" })}>Reset</button>
        </form>
      </div>
    );
  }
}
