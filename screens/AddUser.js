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
import {useRoute} from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {db, auth, storage, firestore} from '../config/Firebase';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import ActionSheet from 'react-native-actionsheet'
import Autocomplete from 'react-native-autocomplete-input';

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

export default function(props) {
    const route = useRoute();
  
    return <AddUser {...props} route={route} />;
  }

const SIZE = 80;
//const storageRef = storage().ref('thumbnails_job').child(`${appendIDToImage}`);

// [anas]

 class AddUser extends Component {
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
            userAddress:'',
            isLoading: false,
            uploading: false,
            DateDisplay:'',
            searchText: '',
            searchList: [],
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

    saveData = async() => {
        console.log("state", this.state)
        const {route} = this.props;
        if (this.state.description && route.params.userAddress && this.state.fullname && this.state.email && this.state.password  && this.state.phoneNum  && this.state.url) {
            if (this.state.password.length < 6){
                Alert.alert('Status', 'Invalid Figure!');
                
            }
            else {
                    return firestore.collection("Household").doc(doc.user.uid).set({
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
                                text: "User Has Been Added Into Current Household",
                                onPress: () => this.props.navigation.navigate('Account')
                            },
                        ], { cancelable: false }
                    );
                    })

    
            }
        } else {
            Alert.alert('Status', 'Empty Field(s)!');
        }
    }


    onClickSearch = () => {
        console.log('state.searchText', this.state.searchText);


        firestore.collection('Household').where('address', '==', this.state.searchText).get().then(querySnapshot => {
            var searchList = [];
            var text = this.state.searchText;
            var lowercase = text.toLowerCase();
            this.setState({ searchText: lowercase })
            querySnapshot.forEach(doc => {
                searchList.push({
                    key: doc.id,
                    job_seeker_name: doc.get('job_seeker_name'),
                    ref_skills: doc.get('ref_skills'),
                    jobName: doc.get('jobName'),
                    job_seekerImage: doc.get('job_seekerImage'),
                    job_qualification: doc.get('job_qualification'),
                    jobExperience: doc.get('jobExperience'),
                    jobDescription: doc.get('jobDescription'),
                    ref_selfDescribe: doc.get('ref_selfDescribe')

                });
            });

            console.log('[onClickSearch] searchList:', searchList);
            this.setState({ searchList });
        });
    }








    saveData = async() => {
        console.log("state", this.state)
        if (this.state.userID && this.state.worktype && this.state.user.address && this.state.email&& this.state.jobname && this.state.uniqueId && this.state.jobdesc && this.state.salary && this.state.peoplenum  && this.state.url) {
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
        const {route} = this.props;
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

                    <View style={{flex:1, flexDirection: 'column', margin:20}}>
                    <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Add Username</Label>
                            <Input placeholder="Search" onChangeText={value => this.setState({ searchText: value })} />
                           <View><Text>{this.state.searchList}</Text></View>
                        </Item>

                        <Button primary style={{ position: 'absolute', top: 2, right: 20, bottom: 10}} onPress={this.onClickSearch}>
                            <Text>Check User</Text>
                        </Button>
                    </View>
                   

                        <View style={{flex:1, flexDirection: 'column'}}>
                            <View><Text>Address</Text></View>
                            <View style={{margin:10}}>
                                <Text>{route.params.userAddress}</Text>
                            </View>
                                
                            <View style={{ flex: 1, marginStart: 10, marginBottom: 40 }}>
                                  
                            <FlatList
                            data={this.state.searchList}
                            //contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item, index }) => {
                                console.log('item', item);
                                return (
                                    
                                    <View>
                                        
                                    <Header searchBar rounded style={Style.searchBar}>
                                    <Item>
                                        <Icon name="ios-search" />
                                        <Input placeholder="Search" onChangeText={value => this.setState({ searchText: value })} />
                                        <Button rounded onPress={this.onClickSearch}>
                                            <Text>Search</Text>
                                        </Button>
                                    </Item>
        
        
                                </Header>
                                
                                <Card key={index} style={{flex: 1, flexDirection:'column'}}>
                                                
                                                <CardItem style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: item.url }} style={{ height: 200, width: 200 }} />

                                                    <Body>
                                                        <Text style={Style.text_header}>{item.name}</Text>
                                                    </Body>
                                                    <Button style={Style.startRouteBtn} onPress={this.onShare}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Share</Text>
                                                    </Button>
                                                </CardItem>

                                                <CardItem>
                                                    <Text style={{color:'#0D79F2'}}>{item.job_seeker_name}</Text>
                                                </CardItem>
                                                <CardItem style={Style.jobDesc}>
                                                    <Text style={{fontWeight: 'bold', fontSize:13}}>About Myself:</Text>
                                                   
                                                </CardItem>
                                                <View>
                                            
                                                        <Text>{item.ref_selfDescribe}</Text>
                                                    
                                                </View>
                                                <CardItem style={Style.jobDesc}>
                                                    <Text style={{fontWeight: 'bold', fontSize:13}}>Experience:</Text>
                                                   
                                                </CardItem>
                                                <View>
                                            
                                                        <Text>{item.jobExperience}</Text>
                                                    
                                                </View>
                                                <CardItem style={Style.jobDesc}>
                                                    <Text style={{fontWeight: 'bold', fontSize:13}}>Qualification:</Text>
                                                   
                                                </CardItem>
                                                <View>
                                                    <Text>{item.job_qualification}</Text>
                                                </View>
                                                <CardItem style={Style.jobDesc}>
                                                    <Text style={{fontWeight: 'bold', fontSize:13}}>Skills:</Text>
                                                   
                                                </CardItem>
                                                <View>
                                            
                                                        <Text>{item.ref_skills}</Text>
                                                    
                                                </View>
     
                                                <CardItem style={{ justifyContent: 'center' }}>

                                                    <Button rounded primary onPress={() => { this.setState({ key: item.key }), this.displayModal(true) }}>
                                                        <Text style={{ fontWeight: 'bold', fontFamily: "CerealMedium" }}>Hire Now</Text>
                                                    </Button>
                                                </CardItem>
                                            </Card>
                                    </View>
                                )
                            }}
                        />
                                   
                                    
                                
                            </View>  
                        </View>
                


{/*     <View style={styles.autocompleteContainer}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteView}
          // Data to show in suggestion
          data={filteredUser}
          // Default value if you want to set something in input
          defaultValue={
            JSON.stringify(selectedValue) === '{}' ?
            '' :
            selectedValue.title
          }
          // Onchange of the text changing the state of the query
          // Which will trigger the findFilm method
          // To show the suggestions
          onChangeText={(text) => findUser(text)}
          placeholder="Enter the User"
          renderItem={({item}) => (
            // For the suggestion view
            <TouchableOpacity
              onPress={() => {
                setSelectedValue(item);
                setFilteredUser([]);
              }}>
              <Text style={styles.itemText}>
                  {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {user.length > 0 ? (
            <>
              <Text style={styles.infoText}>
                   Selected Data
              </Text>
              <Text style={styles.infoText}>
                {JSON.stringify(selectedValue)}
              </Text>
            </>
          ) : (
            <Text style={styles.infoText}>
                Enter The Data
            </Text>
          )}
        </View>
      </View> */}

                    </Form>

                    <Button block success last style={{ marginTop: 50 }} onPress={this.saveData.bind(this)}>
                        <Text style={{ fontWeight: "bold" }}>Done</Text>
                    </Button>
                </Content>

            </Container>


        );
    }
}


const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
      },
      autocompleteView: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
      },
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
