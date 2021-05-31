import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight
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
    Button,
} from 'native-base';
import {db, auth, storage, firestore} from '../config/Firebase';

import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class ListAccount extends Component {


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
        });
       */
        //this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        //this.unsubscribe();
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


    handleLongPress = ( )=> {
        Alert.alert(
            'Status',
            'Are you sure you want to delete this student?',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => this.deleteUser(address) }
            ],
            { cancelable: false }
          );
    }

    updateText = (value) => {
        this.setState({ myText: value })
    }


    componentDidMount() {
        //this.unsubscribe = this.applicationRef.onSnapshot(this.getCollection);
        //let DataRef = firestore().collection('Hiring').doc(auth().currentUser.uid).get().then(documentSnapshot => this.getDataOfJob(documentSnapshot));


    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((res) => {
            const {
                userID,
                address,
                fullname,
                email,
                url,
                phoneNum,
                description,
            } = res.data();
            users.push({
                key: res.id,
                res,
                userID,
                address,
                fullname,
                email,
                url,
                phoneNum,
                description,
            });
        });
        this.setState({
            users,
            isLoading: false
        })
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Container>
                        <Content>

                        
                    <Card>
                    <Content>
                        <View>
                            <Text style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>Manage Your Household</Text>
                        </View>
                        <View>
                            <Text style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>List of People on This House</Text>
                            <Text note style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>You can add or remove user</Text>
                        </View>

                    <View style={{ flex: 1, /* backgroundColor: '#292D5C' */ shadowColor: 'white', backgroundColor: '#242836' }}>
                        <FlatList
                            data={this.state.users}
                            contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <SafeAreaView>
                                        <ScrollView>
                                            <Card key={index} style={styles.card} >
                                            <List longPress={this.handleLongPress}>
                                                <ListItem avatar>
                                                <Left>
                                                    <Thumbnail source={{ uri: this.state.url ? this.state.url : auth.currentUser.photoURL }} style={{ height: 200, width: null, flex: 1 }} />
                                                </Left>
                                                <Body>
                                                    <Text>{item.fullname}</Text>
                                                    <Icon name="md-location"/><Text note>Household</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="arrow-forward" onPress={() => {
                                                    this.props.navigation.navigate('Profile', {
                                                        userkey: item.key
                                                    });
                                                }}/>
                                                </Right>
                                                </ListItem>
                                            </List>

                                            </Card>
                                        </ScrollView>
                                    </SafeAreaView>
                                )
                            }}
                        />
                    </View>
                       
                        </Content>

                    </Card>
                   

                    </Content>

                    <Card>

                        <Button block primary last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.props.navigation.navigate('EditProfileJobCreator')}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'montserrat' }}>Edit Profile</Text>
                        </Button>

                    </Card>

                    </Container>
                    

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
    card: {
        flex: 1,
        elevation: 15,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
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