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

export default class Profile extends Component {


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
            address:'',
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
        const detailRef = firestore.collection('User').doc(this.props.route.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    userID: job.userID,
                    address: user.address,
                    description: user.description,
                    email:user.email,
                    fullname:user.fullname,
                    phoneNum:user.phoneNum,
                    url:user.url,
                   
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })
    }

    RemoveUser=()=>{
        Alert.alert(
          'Delete User',
          'Are you sure?',
          [
            {text: 'Yes', onPress: () => this.deleteUser()},
            {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
      }

    deleteUser() {
        const dbRef = firebase.firestore().collection('Users').doc(this.props.route.params.userkey)
          dbRef.delete().then((res) => {
              console.log('Item removed from database')
              this.props.navigation.navigate('UserScreen');
          })
      }

/*     componentDidMount() {
        this.unsubscribe = firestore.collection('Employer').doc(auth.currentUser.uid).onSnapshot(doc => {
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
        });
      
        //this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    } */

    componentWillUnmount() {
        this.unsubscribe();
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.url  }} style={{ height: 200, width: null, flex: 1 }} />

                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', justifyContent: 'center' }}>{this.state.fullname ? this.state.fullname : auth.currentUser.email}</Text>
                            </Body>
                        </CardItem>


                    </Card>

                    <Card style={{ height: 80 }}>
                    <CardItem header bordered>
                            <Text>Email</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Text style={{ margin: 30, fontWeight: 'bold'}}>{this.state.email}</Text>
                        </CardItem>
                    </Card> 

                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text>About Us</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Body>
                                <Text style={{ margin: 30 }}>{this.state.description}</Text>

                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text>Phone Number</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Body>
                                <Text style={{ margin: 30,}}>{this.state.phoneNum}</Text>

                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text>Address</Text>
                        </CardItem>
                        <CardItem cardBody bordered button>
                            <Body>

                        <Item>
                            <Textarea rowSpan={5} colSpan={5} onChangeText={this.setJobDesc} bordered style={styles.startTextBtn} placeholder="Tell something about the job Here" />
                        </Item>

                            </Body>
                        </CardItem>
                    </Card>

                
                     <Card>
                        <CardItem header bordered>

                            <Text>Skills</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Content>
                                {
                                     this.state.skills &&                      
                                    this.state.skills.map((p, i) => (
                                        <ListItem key={i}>
                                            <Text>
                                                {p}
                                            </Text>
                                        </ListItem>
                                    )) 
                                }

                            </Content>
                        </CardItem>
                    </Card>
                   
                    <Card>
                        <CardItem>
                            <View style={{flex:1, flexDirection:'row'}}>
                            <Button primary last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.props.navigation.navigate('EditProfileJobCreator')}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'montserrat' }}>Edit Profile</Text>
                            </Button>
                            <Button danger last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.RemoveUser}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'montserrat' }}>Delete User</Text>
                            </Button>
                            </View>
                        </CardItem>
                    </Card>


             {/*        <Card>

                        <Button block primary last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.props.navigation.navigate('EditProfileJobCreator')}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'montserrat' }}>Edit Profile</Text>
                        </Button>

                    </Card> */}

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