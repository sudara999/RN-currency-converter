import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class AppScreen extends Component {

  state = {
    amount: 0,
    rate: 0
  };

  //Try to get the exchange rate and set rate in this.state.rate
  componentDidMount(){
    fetch("https://api.exchangeratesapi.io/latest?base=KRW")
    .then(response => response.json())
    .then((responseJSON) => {
      this.setState({
        rate: responseJSON.rates.USD.toString()
      })
    })
  }

  

  render(){
    return(
      //Global View
      <View style={styles.masterContainer}>
        {/*Area to enter from-currency*/}
        <View style={styles.textArea}> 
          <Text>Enter Amount in KRW</Text>
          <TextInput
            style={styles.inputBox} 
            onChangeText={(text)=>this.setState({amount: text})}
            keyboardType={"numeric"}
            placeholder="0"  
          />
        </View>
        {/*Area to display to-currency*/}
        <View style={styles.textArea}>
          <Text>
            Amount in USD    
          </Text>
          <Text>
            {this.state.amount * this.state.rate}
          </Text>
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
  }
})