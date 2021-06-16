import React, { Component } from 'react';
import { TouchableHighlight, Switch, Animated, Layouts, View, StyleSheet, ScrollView, Image, TextInput, Alert, Toast, ActivityIndicator } from 'react-native';
import {
    Container,
    Header,
    Content,
    Modal,
    Form,
    Item,
    Input,
    Label,
    Card,
    Right,
    auto,
    CardItem,
    CardBody,
    Thumbnail,
    Text,
    Icon,
    Picker,    
    DatePicker,
    Footer,
    FooterTab,
    Button,
    Textarea
} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {db, auth, storage, firestore} from '../config/Firebase';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { useRoute } from '@react-navigation/native';



const SIZE = 80;
//const storageRef = storage().ref('thumbnails_job').child(`${appendIDToImage}`);
export default function(props) {
    const route = useRoute();
  
    return <Planner {...props} route={route} />;
  }  
  

 class Planner extends Component {
    constructor() {
        super();

        //const user = firebase.auth().currentUser;
        this.plannerRef = firestore.collection('Planner');
        this.state = {
            currentUser: null,
            userID: null,
            username:'',
            itemname: '',
            email:'',
            uniqueId: '',
            jobdesc: '',
            url: '',
            worktype: '',
            salary: '',
            peoplenum: '',    
            qualification:'',
            ingredientname:'',
            quantity:'',
            buyPeople:[],
            People:'',
            alert:'',
            experience:'',
            isLoading: false,
            uploading: false,
            DateDisplay:'',
            visibility: false,

        };
        this.setDate_Start = this.setDate_Start.bind(this);

;
        this.pickImage = this.pickImage.bind(this);
        this.onUserSelected = this.onUserSelected.bind(this);
        this.saveData = this.saveData.bind(this);



    }

    componentDidMount() {
        const {route} = this.props;
        this.peopleRef = firestore.collection('Users').where('address', '==', route.params.planLocate);;
        this.unsubscribe = this.peopleRef.onSnapshot(this.getCollection);
        console.log("testing data:", this.peopleRef);
    
        var user = auth.currentUser;
        var name, uid;
        if (user != null) {
            name = user.displayName;
            uid = user.uid;
        }

        const { currentUser } = auth;
        this.setState({ currentUser });
        this.state.userID = currentUser.uid;
        //this.setState({ jobCreaterName: currentUser.displayName })  
    
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const buyPeople = [];
        querySnapshot.forEach((res) => {
            const {
                userID,
                email,
                fullname,
                address,
                description,
                url,
                phoneNum,
            } = res.data();
            buyPeople.push({
                key: res.id,
                res,
                userID,
                email,
                fullname,
                address,
                description,
                url,
                phoneNum,
            });
        });
        this.setState({
            buyPeople,
            isLoading: false
        })
        console.log("flatlist",this.state.buyPeople)
    }

    
/*     onMetricSelected(value) {
        this.setState({
          selectedMetric: value
        });
      } */

    onUserSelected(value) {
        this.setState({
          People: value
        });
        console.log('value_people', value)
      }


    handleConfirm=(date)=>{
        this.setState({DateDisplay:date.toUTCString()})
    }

    onPressCancel = () => {
        this.setState({visibility:false})
    }

    onPressButtonClick = () => {
        this.setState({visibility:true})
    }


 
    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };


    setUserID = (value) => {
        this.setState({ userID: value });

    }

    setEmail = (value) => {
        this.setState({ email: value });

    }

    setItemName = (value) => {
        this.setState({itemname: value});
    }



    setIngredientName = (value) =>{
        this.setState({ ingredientname: value})
    }

    setJobName = (value) => {
        this.setState({ jobname: value })
    }

    setUniqueId = (value) => {
        this.setState({ uniqueId: value })
    }

    setJobDesc = (value) => {
        this.setState({ jobdesc: value })
        //console.log('job desc:',value);
    }


    setPeopleNum = (value) => {
        this.setState({ peoplenum: value })
    }

    setDate_Start(newDate) {
        this.setState({ date_start: newDate.toString().substr(4, 12) });
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

    //Pick Image from camera or library
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

    saveData = async() => {
        console.log("state", this.state)
        console.log("usedID", this.state.userID)
        console.log("itemname", this.state.itemname)
        console.log("date", this.state.DateDisplay)
        console.log("people", this.state.People)
        console.log("url", this.state.url)

        if (this.state.userID && this.state.itemname && this.state.DateDisplay && this.state.People && this.state.url) {
            if (isNaN(this.state.salary && this.state.peoplenum)) {
                Alert.alert('Status', 'Invalid Figure!');
            }
            else {
                //await auth.currentUser.uid.then(doc =>{
                    
                    this.plannerRef.add({
                        uid: auth.currentUser.uid,
                        itemname: this.state.itemname,
                        date_to_buy: this.state.DateDisplay,
                        //people_inCharge: this.state.buyPeople,
                        people_inCharge: this.state.People,
                        //people: this.state.selectedMetric,
                        url: this.state.url,
                        
                    }).then((res) => {
                        console.log("[saveData] Done add to firebase", res);

                        this.setState({
                            itemname,
                            date_to_buy,
                            people_inCharge,
                            url 
                        })
                    });
                    Alert.alert('Your Job Has Been Posted', 'Please Choose',
                        [
                            {
                                text: "Return To Main Screen",
                                onPress: () => this.props.navigation.navigate('Home')
                            },
                            {
                                text: "View Current Job Posted",
                                onPress: () => this.props.navigation.navigate('Profile')
                            }
                        ], { cancelable: false }
                    );
           // })
        }
        } else {
            Alert.alert('Status', 'Empty Field(s)!');
        }
    }

    render() {
        //const { modalVisible } = this.state;
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <Container>
                <Content padder>
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Details</Text>
                    <Form>

                    <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Things to Buy</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setItemName} />
                        </Item>

                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center' }}>
                                <Button iconLef style={{ backgroundColor: '#1B6951', padding: 2, margin: 3, width: 150}} onPress={this.pickImage}>
                                    <Icon name="md-image" />
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Library</Text>
                                </Button>
                                
                                <Button iconLef style={{ backgroundColor: '#2869F4', padding: 2, margin: 3 }}
                                                    onPress={this._takePhoto}>
                                    <Icon name="md-camera" />
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Take Photo</Text>
                                </Button>
                            </View>


                            {this._maybeRenderImage()}
                            {this._maybeRenderUploadingOverlay()}


                    <Item style={styles.inputGroup} fixedLabel last onPress={this.onPressButtonClick}>
                    <DateTimePickerModal
                        isVisible={this.state.visibility}
                        onConfirm={this.handleConfirm}
                        onCancel={this.onPressCancel}
                        mode="datetime"
                    />
                    <View style={{flex:1, flexDirection:'column'}}>
                       <View style={{flex:1, flexDirection:'row'}}>
                         <Text style={{fontWeight: "bold", fontSize: 15}}>
                               When To Buy:                
                         </Text>
                                    <Icon name="md-calendar" />
                        </View>
                        <Text style={{padding: 2, margin:5}}>{this.state.DateDisplay} </Text>
                    </View>

                    </Item>


                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Who Will Buy</Label>
                            <Form>
                                <Picker
                                    style={{ width: 200, height: 40 }}
                                    iosHeader="Branch"
                                    Header="User"
                                    mode="dropdown"
                                    textStyle={{ color: 'grey' }}
                                    placeholder='Select User'
                                    headerBackButtonText='Geri'
                                    selectedValue={this.state.buyPeople}
                                  /*   onValueChange ={(itemValue, itemIndex) =>  
                                     {
                                         return(
                                            <Picker.Item label={itemValue.fullname} value={itemValue.fullname} key={itemIndex} />

                                         )
                                     }} */
                                    onValueChange={(value) => this.onUserSelected(value)}
                                    >
                                  {this.state.buyPeople.map((buyPeople, i) => {
                                        return (
                                        <Picker.Item label={buyPeople.fullname} value={buyPeople.fullname} key={i} />
                                        );
                                    }
                                )} 
                                    </Picker>
                                    
                         </Form> 
                         
                  
                        </Item>

                    

                    </Form>

                    <Button block success last style={{ marginTop: 50 }} onPress={this.saveData.bind(this)}>
                        <Text style={{ fontWeight: "bold" }}>Done</Text>
                    </Button>
                </Content>

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
     .ref("job_post")
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
    description: {
        backgroundColor: 'white',
        width: 400,
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
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
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
        marginBottom: 25,
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
    }
})
