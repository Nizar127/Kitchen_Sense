import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight,
     ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {

    Container,
    Header,
    Content,
    View,
    Card,
    Right,
    auto,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    List,
    ListItem,
    Separator,
    Item,
    Label,
    Button,
    Textarea
} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';
import {db, auth, storage, firestore} from '../config/Firebase';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class EditProfileJobCreator extends Component {


    constructor() {
        super();

        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            //textInput: [],
            //inputData: [],
            username: '',
            fullname: '',
            phonenumber: '',
            profileImage: '',
            description: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            imageType: '',
            worktype: '',
            show: true,
            address:'',
            //listViewData: data,


        };
        this.pickImage = this.pickImage.bind(this);
        this.updateUser = this.updateUser.bind(this);

    }

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
              width: 350,
              height: 250,
              borderRadius: 3,
              elevation: 2,
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: '#8d8f92',
                borderColor: '#8d8f92',
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


    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }


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




    updateUser = () => {

/*         let skills = [this.state.skills];
        for (let index = 0; index < this.state.inputData.length; index++) {
            const element = this.state.inputData[index];
            skills.push(element.text);

        }
        console.log('skills', skills); */

        const updateDBRef = firestore.collection('Users').doc(auth.currentUser.uid);

            updateDBRef.update({
                fullname: this.state.username,
                description: this.state.description,
                //skills: skills,
                phoneNum:this.state.phonenum,
                address: this.state.address,
                url: this.state.url
            }).then((docRef) => {

                this.props.navigation.navigate('Profile');
            })
    

    }

    render() {
        return (

            // this.props.users.map((item, index) => {

            <View style={{ flex: 1 }} /* key={index} */  >
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>

                </Header>
                <ScrollView>
                    <Card>
                        <CardItem cardBody>
{/*                           <Image source={{ uri: this.state.url ? this.state.url : auth.currentUser.photoURL }} style={{ height: 200, width: null, flex: 1 }} />
 */}
                            {this._maybeRenderImage()}
                            {this._maybeRenderUploadingOverlay()}
                        </CardItem>
                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                            <Button iconLef style={{ backgroundColor: '#1B6951', padding: 10, margin: 5 }} onPress={this.pickImage}>
                                <Icon name="md-image" />
                                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Pick From Library</Text>
                            </Button>
                            
                            <Button iconLef style={{ backgroundColor: '#2869F4', padding: 10, margin: 5 }}
                                                onPress={this._takePhoto}>
                                <Icon name="md-camera" />
                                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Take Photo</Text>
                            </Button>
                        </View>

                        <CardItem header bordered>
                            <Text style={styles.MainText}>Username</Text>
                        </CardItem>
                        <CardItem cardBody bordered>
                            <Body>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Username'}
                                        value={this.state.username}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'username')}
                                    />
                                </View>
                            </Body>
                        </CardItem>

                    </Card>



                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.MainText}>About Us</Text>
                        </CardItem>
                        <CardItem cardBody bordered button
                        // onPress={() => { this.setModalVisible(true); this.setInputText(item.text), this.setEditedItem(item.id) }}
                        >
                            <Body>
                                <View style={styles.inputGroup}>
                                    <Textarea
                                        rowSpan={5}
                                        placeholder={'Description'}
                                        value={this.state.description}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                                    />
                                </View>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.MainText}>Phone Number</Text>
                        </CardItem>
                        <CardItem cardBody bordered button
                        // onPress={() => { this.setModalVisible(true); this.setInputText(item.text), this.setEditedItem(item.id) }}
                        >
                            <Body>
                                <View style={styles.inputGroup}>
                                    <Textarea
                                        rowSpan={5}
                                        placeholder={'Phone Number'}
                                        value={this.state.phonenumber}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'phonenumber')}
                                    />
                                </View>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.MainText}>Address</Text>
                        </CardItem>
                        <CardItem cardBody bordered button
                        // onPress={() => { this.setModalVisible(true); this.setInputText(item.text), this.setEditedItem(item.id) }}
                        >
                            <Body>
                                <View style={styles.inputGroup}>
                                    <Textarea
                                        rowSpan={5}
                                        placeholder={'Address'}
                                        value={this.state.address}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'address')}
                                    />
                                </View>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{ height: auto }}>
                        <CardItem header bordered>

                            <Text style={styles.MainText}>Skills</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Content>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Skills'}
                                        value={this.state.skills}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'skill')}
                                    />
                                    <Icon android name="md-add" size={30} onPress={() => this.addTextInput(this.state.textInput.length)} />
                                    {this.state.textInput.map((value) => {
                                        return value
                                    })}

                                </View>

                            </Content>
                        </CardItem>
                      </Card>
                    <Card>

                        <Button block success last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.updateUser()}>
                            <Text style={{ fontWeight: "bold", fontSize: 17, padding: 10 }}>Update</Text>
                        </Button>
                    </Card>
                </ScrollView>

            </View>


            //})
        )
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
    container: {
        flex: 1,
        paddingBottom: 22
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
    // startRouteBtn: {
    //   backgroundColor: 'white',
    //   height: 70,
    //   borderRadius: 35,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginHorizontal: 20
    // },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 100,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    MainText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
        elevation: 5,
        padding: 5,
        margin: 7,
        color: 'red'
    },
    AddNewBtn: {
        backgroundColor: 'green',
        height: 70,
        width: 200,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginLeft: 100
    },
    startRouteBtn: {
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    buttonView: {
        flexDirection: 'row'
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        margin: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },
    button: {
        backgroundColor: "#4EB151",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 3,
        marginVertical: 50
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "300"
    },
    header: {
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    button: {
        marginBottom: 7
    },
    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    }
})


