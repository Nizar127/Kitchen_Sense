import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import {Root, Container, Content, Header, Form, Label, Input, Item, Button} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';
//import {db} from './config/firebase';
import {db, auth, storage} from '../config/Firebase';
import * as Facebook from 'expo-facebook';

import * as Font from 'expo-font';


export default class Login extends Component {
  constructor(props){
    super(props);
    //this.dbRef = firestore.collection('User');
    this.state = { loading: true};
     this.state = ({
       email: '',
       password: ''
   })


  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }


  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }


  signUpUser = () => {

    try {

        if (this.state.password.length < 6) {
            alert("Please enter atleast 6 characters")
            return;
        }

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    }
    catch (error) {
        console.log(error.toString())
    }
}

loginUser = () => {

    try {

        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            
        })
        this.props.navigation.navigate('MyLocation');

    }
    catch (error) {
        console.log(error.toString())
    }
}

callGraph = async token => {
  /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
  );
  const responseJSON = JSON.stringify(await response.json());
  this.setState({ responseJSON });
};

async loginWithFacebook() {

  //ENTER YOUR APP ID 
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('<>', { permissions: ['public_profile'] })

  if (type == 'success') {

    this.callGraph(token);

    const credential = firebase.auth.FacebookAuthProvider.credential(token)

    auth.signInWithCredential(credential).catch((error) => {
      console.log(error)
    })
  }
}

  render() {
    return (
      <Container style={styles.container}>
      <Form>
          <Item floatingLabel>
              <Label>Email</Label>
              <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(email) => this.setState({ email: email })}
              />

          </Item>

          <Item floatingLabel>
              <Label>Password</Label>
              <Input
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({ password:password })}
              />
          </Item>

          <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() => this.loginUser()}
          >
              <Text style={{ color: 'white' }}> Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => this.props.navigation.navigate('SignUp')}    /* this.signUpUser() */
          >
              <Text style={{ color: 'white' }}> Sign Up</Text>
          </Button>



          <Button style={{ marginTop: 10 }}
            full
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: 'white' }}> Login With Facebook</Text>
          </Button>


      </Form>
  </Container>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
});

