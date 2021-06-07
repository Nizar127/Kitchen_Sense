import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image,Alert,  g, ActivityIndicator, ScrollView,} from 'react-native';
import {Root, Container, Content, Header, Form, Label, Input, Icon, Item, Button, Textarea} from 'native-base';
//import Icon from '@expo/vector-icons/Ionicons';
import {auth, firestore, db, storage} from '../config/Firebase';
import {useRoute} from '@react-navigation/native';
//import * as Font from 'expo-font';
/* import ImagePicker from 'react-native-image-crop-picker';*/
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import * as Location from 'expo-location';

export default function(props) {
   const route = useRoute();

   return <SignUp {...props} route={route} />;
}

class SignUp extends Component {
  
    constructor() {
        super();

    
        this.state = {
            email: '',
            password: '',
            fullname:'',
            phoneNum:'',
            employee: false,
            address: '',
            url: null,
            description:'',
            uploading: false,
            isLoading: false,
            locationServiceEnabled: false,
            displayCurrentAddress: false
        };
      
        this.pickImage = this.pickImage.bind(this);
       // this.uploadImage = this.uploadImage.bind(this);

        this.saveData = this.saveData.bind(this);

    }

    //const item = useRoute();


    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
      };
    

    _maybeRenderImage = () => {
        let { url } = this.state;
        if (!url) {
          return;
        }
    
        return (
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: null,
              height: 250,
              borderRadius: 3,
              elevation: 2,
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: 'rgba(0,0,0,1)',
                borderColor: '#ffffff',
                elevation: 4,
                borderWidth:5,
                shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                shadowRadius: 5,
                overflow: 'hidden',
              }}>
              <Image source={{ uri: url }} style={{ width: null, height: 250 }} />
            </View>
          </View>
        );
    };
  
      _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };


      _handleImagePicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            const uploadUrl = await uploadImageAsync(pickerResult.uri);
            this.setState({ url: uploadUrl });
          }
        } catch (e) {
          console.log(e);
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };

pickImage = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    this._handleImagePicked(pickerResult);

}




setFullName = (value) => {
    this.setState({ fullname: value })
}

setPhoneNum = (value) => {
    this.setState({ phoneNum: value })
}

setDescription = (value) => {
    this.setState({ description: value })
}

setAddress = (value) => {
    this.setState({ address: value })
}


saveData = async() => {
    console.log("state", this.state)
    const {route} = this.props;
    if (this.state.description && route.params.userAddress && this.state.fullname && this.state.email && this.state.password  && this.state.phoneNum  && this.state.url) {
        if (this.state.password.length < 6){
            Alert.alert('Status', 'Invalid Figure!');
            
        }
        else {
            await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(doc => {
                return firestore.collection("Users").doc(doc.user.uid).set({
                    email: this.state.email,
                    fullname: this.state.fullname,
                    description: this.state.description,
                    address: route.params.userAddress,
                    phoneNum: this.state.phoneNum,
                    url: this.state.url,
                }).then((res) => {
                    this.setState({
                        email: '',
                        fullname:'',
                        password:'',
                        address: '',
                        description:'',
                        phoneNum:'',
                        url: '',
          
                    });
                    Alert.alert('Your Job Has Been Posted', 'Please Choose',
                    [
                        {
                            text: "Thank You For Signin Up With Kitchen Sense. Please Sign In to proceed",
                            onPress: () => this.props.navigation.navigate('Login')
                        },
                    ], { cancelable: false }
                );
                })
            })

        }
    } else {
        Alert.alert('Status', 'Empty Field(s)!');
    }
}




  render() {
    //let { url } = this.state;
    const {route} = this.props;

    
    return (
      <Container> 
        <ScrollView>
        <Content>
         
            <View style={{margin: 20, padding: 5, flex: 1, flexDirection:'column'}}> 
              <View>
                <View style={{margin: 10, padding: 5, flex: 1, flexDirection:'column'}}>
                   <Text style={{ textAlign: "center", height: 40, fontSize: 24,fontWeight: "bold", marginTop: 20 }}>Welcome To The Kitchen Sense</Text>
                   <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Please Sign In Using Button Below</Text>
                </View>

              </View>
              <View>
                  <Text></Text>
              </View>
          <Button block primary last style={{ marginTop: 50, width: 180, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.props.navigation.navigate('Login')}>
                        <Text style={{ fontWeight: "bold", color:'#fff' }}>LOGIN</Text>
           </Button>
            </View>
        </Content>
          <Content padder>
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Sign Up System</Text>
      <Form>
          <Item style={styles.inputGroup} fixedLabel last>
              <Label>Email</Label>
              <Input autoCorrect={false} autoCapitalize="none" style={styles.startRouteBtn} onChangeText={(email) => this.setState({ email: email })} />


          </Item>
          <Item style={styles.inputGroup} fixedLabel last>
               <Label>Full Name</Label>
                    <Input style={styles.startRouteBtn} onChangeText={this.setFullName} />
          </Item>

          <Item style={styles.inputGroup} fixedLabel last>
              <Label>Password</Label>
              <Input
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.startRouteBtn}
                  onChangeText={(password) => this.setState({ password:password })}
              />
          </Item>
          <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
              <Button iconLef style={{ backgroundColor: '#1B6951', padding: 10, margin: 5 }} onPress={this.pickImage}>
                <Icon name="md-image" />
                      <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Pick From Library</Text>
               </Button>
               
               <Button iconLef style={{ backgroundColor: '#2869F4', padding: 10, margin: 5 }} onPress={this._takePhoto}>
                <Icon name="md-camera" />
                      <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Take Photo</Text>
               </Button>
          </View>


        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
          
        <Item style={styles.inputGroup} fixedLabel last>
               <Label>About Us</Label>
               
            </Item>

            <Item fixedLabel last>
                 <Textarea rowSpan={5} style={styles.startRouteBtn} onChangeText={this.setDescription} />
            </Item>
 
          <View style={{ flex: 1,flexDirection:'column'}}>
             
            <Item style={styles.inputGroup} fixedLabel last>
                <View style={{flex: 1, flexDirection:'column'}}>
                <Label>Address</Label>
                <View style={{margin: 10}}><Text>{route.params.userAddress}</Text></View> 
              </View>

                         
                
            </Item>
            {/* <Button success style={{ marginTop: 10}} onPress={(address) => this.setDisplayCurrentAddress(address)}>
                                    <Text>Check Location</Text>
                                </Button> */}
          </View>
      



           <Item style={styles.inputGroup} fixedLabel last>
               <Label>Phone Number</Label>
                 <Input keyboardType="numeric" style={styles.startRouteBtn} onChangeText={this.setPhoneNum} />
            </Item>


          <Button full rounded success last style={{ marginTop: 50 }} onPress={this.saveData.bind(this)}>
                        <Text style={{ fontWeight: "bold" }}>Sign Up Now</Text>
           </Button>

      </Form>
      
      </Content>
      </ScrollView>
  </Container>
    
    );
  }
}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = storage
     .ref("employer_profile")
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }




const styles = StyleSheet.create({
    closeText: {
        fontSize: 25,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 10
    },
    startRouteBtn: {
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    startTextBtn: {
        backgroundColor: 'white',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
      },
})
