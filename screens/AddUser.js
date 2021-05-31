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
import ActionSheet from 'react-native-actionsheet'

const dataArray = [
    { title: "Personal Bio", content: "Smart, Simple, Hardworking and Easy to adapt" },
    { title: "Skills", content: "Programming, Engineering, Mechanical, Design" },
    { title: "Experience", content: "Working with Creative World, Worked With Brandpacker Solution" },
    { title: "Personal Projects", content: "Develop app for ESports, Develop personal e-wallet app" },
    { title: "Education Background", content: "UITM, UIAM, Oracle Academy" },
    { title: "Interest", content: "Love to coding, loves science" },
    { title: "Achievement", content: "3 times Deans's list award" }
];



const quantity = [
    'Cancel',
    <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', fontFamily: 'montserrat' }}>Kilogram</Text>,
    <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', fontFamily: 'montserrat' }}>Gram</Text>,
    <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', fontFamily: 'montserrat' }}>Miligram</Text>,
]

const alert = [
    'Cancel',
    <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', fontFamily: 'montserrat' }}>Kilogram</Text>,
    <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', fontFamily: 'montserrat' }}>Gram</Text>,
    <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', fontFamily: 'montserrat' }}>Miligram</Text>,
]


const SIZE = 80;
//const storageRef = storage().ref('thumbnails_job').child(`${appendIDToImage}`);

// [anas]


export default class AddUser extends Component {
    constructor() {
        super();

        //const user = firebase.auth().currentUser;
        this.dbRef = firestore.collection('Job_list');
        this.state = {
            currentUser: null,
            userID: null,
            jobname: '',
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
            alert:'',
            experience:'',
            isLoading: false,
            uploading: false,
            DateDisplay:'',
            visibility: false
            //chosenDate: new Date(),
            //date_start: new Date().toString().substr(4, 12),
            //switchValue: false  
            //modalVisible: false
        };
        this.setDate_Start = this.setDate_Start.bind(this);

        //this.setDate = this.setDate.bind(this);
        this.selectWorkType = this.selectWorkType.bind(this);
        this.selectExperience = this.selectExperience.bind(this);
        this.pickImage = this.pickImage.bind(this);

        this.saveData = this.saveData.bind(this);
        // state = { ScaleAnimation: false };

        //this.state.date = this.state.chosenDate.toString().substr(4, 12);
        // this.setState({ userid: user })

    }
    componentDidMount() {
        //get data first
        var user = auth.currentUser;
        var name, uid;
        if (user != null) {
            name = user.displayName;
            uid = user.uid;
        }

        const { currentUser } = auth;
        this.setState({ currentUser });
        this.state.userID = currentUser.uid;
        this.setState({ jobCreaterName: currentUser.displayName })  
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


    showActionSheet = () => {
        this.ActionSheet.show()
    }

    showActionSheetalert = () => {
        this.ActionSheet.show()
    }

    handlePressquantity = buttonIndex => {
        this.setState({
          selected: buttonIndex,
          quantity: quantity[buttonIndex]
          
        });
        console.log('actionsheet:',buttonIndex);

      };
      

      handlePressalert = buttonIndex => {
        this.setState({
          selected: buttonIndex,
          alert: alert[buttonIndex]
          
        });
        console.log('actionsheet5',buttonIndex);

      };
 
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


    selectWorkType = (value) => {
        this.setState({
            worktype: value
        })
    }

    setQualification = (value) => {
        this.setState({ qualification: value })
        //console.log('job desc:',value);
    }

    selectExperience = (value) => {
        this.setState({
            experience: value
        })
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


    setSalary = (value) => {
        this.setState({ salary: value })
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
        if (this.state.userID && this.state.worktype && this.state.qualification && this.state.experience && this.state.email&& this.state.jobname && this.state.uniqueId && this.state.jobdesc && this.state.salary && this.state.peoplenum  && this.state.url) {
            if (isNaN(this.state.salary && this.state.peoplenum)) {
                Alert.alert('Status', 'Invalid Figure!');
            }
            else {
                //await auth.currentUser.uid.then(doc =>{
                    
                    this.dbRef.add({
                        uid: auth.currentUser.uid,
                        jobCreatorname: this.state.email,
                        jobname: this.state.jobname,
                        uniqueId: this.state.uniqueId,
                        jobdesc: this.state.jobdesc,
                        salary: this.state.salary,
                        url: this.state.url,
                        worktype: this.state.worktype,
                        experience: this.state.experience,
                        qualification: this.state.qualification,
                        peoplenum: this.state.peoplenum,
                        
                    }).then((res) => {
                        console.log("[saveData] Done add to firebase", res);

                        this.setState({
                            jobname: '',
                            uniqueId: '',
                            jobdesc: '',
                            salary: '',
                            url: '',
                            peoplenum: '',
                            time: 0,
                        
                        })
                    });
                    Alert.alert('Your Job Has Been Posted', 'Please Choose',
                        [
                            {
                                text: "Return To Main Screen",
                                onPress: () => this.props.navigation.navigate('Feed')
                            },
                            {
                                text: "View Current Job Posted",
                                onPress: () => this.props.navigation.navigate('MyJob')
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
                            <Input  keyboardType="numeric" style={styles.startRouteBtn} onChangeText={this.setSalary} />
                        </Item>

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
                            <Input keyboardType="numeric" style={styles.startRouteBtn} onChangeText={this.setPeopleNum} />
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
