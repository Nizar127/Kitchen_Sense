import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight, 
} from 'react-native';
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
    Item,
    Left,
    Body,
    Icon,
    List,
    ListItem,
    Separator,
    Textarea,
    Button
} from 'native-base';
import {db, auth, storage, firestore} from '../config/Firebase';

import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class Account extends Component {


    constructor() {
        super();


        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            skills: [],
            experience: [],
            username: '',
            fullname: '',
            email: '',
            key: '',
            phoneNum:'',
            description: '',
            profileImage: '',
            keyplayer: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            imageType: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            address:'',
            show: true,
            newContact: "",
            mytext: '',
            data: this.initData,
            isModalVisible: false,
            inputText: '',
            editedItem: 0,

        };

    }

    componentDidMount() {
       /*  this.unsubscribe = firestore.collection('Employer').doc(auth.currentUser.uid).onSnapshot(doc => {
            console.log(doc);
            const { email, fullname, phoneNum, url, address, description, skills} = doc.data();
            this.setState({
                email,
                fullname,
                description,
                phoneNum,
                url,
                address,
                skills
            })
            console.log("doc", doc)
        }); */
      
        //this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
       // this.unsubscribe();
    }



    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }
    handleEditItem = (editedItem) => {
        const newData = this.state.data.map(item => {
            if (item.id === editedItem) {
                item.text = this.state.inputText
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
    //hide card example
    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };




    updateText = (value) => {
        this.setState({ myText: value })
    }

    


    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-person" style={{ color: tintColor }} />
        ),
        headerTitle: {
            title: 'GET-THE-JOB'
        },
        headerStyle: {
            backgroundColor: '#f45fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>

                    <Card style={{flex: 1, }}>
                        <Text style={{ margin: 20, flex:1,fontWeight: 'bold', fontSize: 20, fontFamily: 'Helvetica', textAlign: 'center' }}>Confirm Your Account</Text>
                    </Card>

                    <Card>
                                          
                        <CardItem header bordered >
                            <View style={{ flex: 1, marginStart: 10, marginBottom: 40 }}>
                              
                               
                                <Button success style={{ position: 'absolute', top: 2, right: 20, bottom: 10}} onPress={() => this.props.navigation.navigate('AddUserLocation')}>
                                    <Text>View User</Text>
                                </Button>
                            
                            </View>  
                        </CardItem>
                        <CardItem>
                            <Text>Please Enter Your Address To Confirm Your Account</Text>
                        </CardItem>
                        <CardItem style={{marginTop:30}}>
                            <Text>Address</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Body>

                        <Item>
                            <Textarea rowSpan={5} colSpan={5} onChangeText={this.setJobDesc} bordered style={styles.startTextBtn} placeholder="Tell something about the job Here" />
                        </Item>

                            </Body>

                           
                        </CardItem>
                        
                        <Button block primary last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.props.navigation.navigate('EditProfileJobCreator')}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'montserrat' }}>Confirm</Text>
                        </Button>
                    </Card>

                      


                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    keyplayer: {
        padding: 20,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 35,

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
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
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
})