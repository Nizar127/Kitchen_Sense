import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight, SafeAreaView
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
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

console.disableYellowBox = true;
 /* export default function(props) {
    const route = useRoute();
  
    return <ListAccount {...props} route={route} />;
  }  */
  
 export default class ListAccount extends Component {

    constructor() {
        super();
        //const {route} = this.props;

        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.accountRef = firestore.collection('Users')/* .where('address', '==', route.params.items) */;
        this.state = {
            users: [],
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
        this.unsubscribe = this.accountRef.onSnapshot(this.getCollection);
      
    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const users = [];
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
            users.push({
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
            users,
            isLoading: false
        })
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





    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const usersNow = [];
       
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
            usersNow.push({
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
            console.log('user',usersNow);
        });
        this.setState({
            usersNow,
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
                                <View style={{margin: 10}}>
                                    <Text style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>List of People on This House</Text>
                                    <Text note style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>You can add or remove user</Text>
                                </View>
                            </Content>
                            </Card>
                            <Container>
                                <Content>
                           
                                <View style={{ height: 400,backgroundColor: '#242836', margin:5, padding: 7 }}>
                                 
                                  <FlatList
                                        data={this.state.users}
                                        //contentContainerStyle={{ flexGrow: 1 }}
                                        renderItem={({ item, index }) => {
                                            return (
                                                 <SafeAreaView>
                                                    <ScrollView>
                                                        <Card key={index} style={styles.card} onPress={() => {
                                                          this.props.navigation.navigate('AccountDetail', {
                                                                userkey: item.key
                                                          });
                                                        }}>
                                                        <List>
                                                            <ListItem avatar>
                                                            <Left>
                                                                <Thumbnail source={{ uri: this.state.url  }} style={{ height: 200, width: 200, flex: 1 }} />
                                                            </Left>
                                                            <Body>
                                                                <Text>{item.fullname}</Text>
                                                                <Icon name="md-location"/><Text note>Household</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="arrow-forward"/>
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
                                <View style={{flex: 1, flexDirection:'row', margin: 10, alignItems: 'center', justifyContent:'space-around'}}>
                                    <Button light>
                                        <Text>Cancel</Text>
                                    </Button>
                                    <Button danger iconRight>
                                        <Text>Delete</Text>
                                        <Icon name="md-trash-outline"/>
                                    </Button>
                                </View>
                                
                                    </Content>
                                    </Container>
                                
                            

                                </Content>

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