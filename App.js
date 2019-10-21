import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import NumberFormat from 'react-number-format';

export default class AppScreen extends Component {

  state = {
    from:"KRW",
    to:"USD",
    amount:'',
    rate: 0
  };

  //Get the exchange rate and set rate in this.state.rate
  componentDidMount(){
    fetch("https://api.exchangeratesapi.io/latest?base=KRW")
    .then(response => response.json())
    .then((responseJSON) => {
      this.setState({
        rate: responseJSON.rates.USD.toString()
      })
    })
  }

  //Switch the two currencies being exchanged from and to
  switchCurrency(){
    //from -> to
    //to -> from
    this.setState(state => {
      return{
        from: state.to, to: state.from, rate: 0
      }
    },
    //the new exchange rate for the pair is requesed from the api
    ()=>{
      let URL = "https://api.exchangeratesapi.io/latest?base=" + this.state.from;
      fetch(URL)
      .then(response => response.json())
      .then((responseJSON) => {
        this.setState({
          rate: responseJSON.rates[this.state.to].toString()
        });
      })
    }
    );
  }

  render(){
    return(
      //Global View
      <View style={styles.masterContainer}>
        {/*Area to enter from-currency*/}
        <View style={styles.textArea}> 
          <Text style={styles.txtGuides}>Enter Amount in <Text style={styles.txtInfo}>{this.state.from}</Text></Text>
          {/*TextInput to enter from-currency*/}
          <TextInput
            style={styles.inputBox} 
            onChangeText={(text)=>this.setState({amount: text})}
            keyboardType={"numeric"}
            placeholder="0"
            value={String(this.state.amount)}
          />
        </View>
        {/*Button to reverse the exchange*/}
        <Button
          style={styles.button}
          title="Reverse Exchange"
          onPress={()=>this.switchCurrency()}
          raised
        />
        {/*Area to display to-currency*/}
        <View style={styles.textArea}>
          <Text style={styles.txtGuides}>
            Amount in <Text style={styles.txtInfo}>{this.state.to}</Text>    
          </Text>
          <NumberFormat
            value={this.state.amount * this.state.rate}
            decimalScale={2}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => <Text style={styles.txtInfo}>{value}</Text>} 
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  textArea: {
    alignItems: "center"
  },
  masterContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  inputBox: {
    borderWidth: 2,
    width: 200,
    padding: 5,
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
    fontSize: 20
  },
  // inputBar: {
  //   flexDirection: "row",
  //   alignItems: "center"
  // },
  button: {
    borderRadius: 5
  },
  txtGuides: {
    fontSize: 15
  },
  txtInfo: {
    fontSize: 20
  }
})