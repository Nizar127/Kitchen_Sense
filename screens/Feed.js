import React, { Component } from 'react';
import { KeyboardAvoidingView, FlatList, Modal, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import {
    Container,
    Header,
    Content,
    Right,
    View,
    Fab,
    Card,
    H1,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    //Icon,
    Item,
    Label,
    Input,
    Separator,
    Button,
    DatePicker,
    Picker,
    Textarea
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import {auth, firestore, storage} from '../config/Firebase';
import { KeyboardAvoidingViewBase } from 'react-native';


export default class Home extends Component {

    constructor() {
        super();
        //const network = React.useContext(NetworkContext);
        //this.applicationRef = firestore.collection('Hiring').where('jobCreatorID', '==', auth.currentUser.uid);
      /* .doc(auth().currentUser.uid).get().where('jobCreatorID', '==', auth().currentUser.uid); */
        //this.hiringRef = firestore.collection('Job_Hired');

        this.state = {
            food: [],
            isLoading: true,
            show: true,
            username: null,
            jobname: null,
            url: '',
            ingredientDesc:'',
            ingredientname:'',
            quantity:'',
            alert:'',
            date_bought:'',
            ExpiryReceived: '',
            //uid:'',
            jobposition: null,
            isVisible: false,
            userID: '',
            lat: '',
            lng: '',
            startDate: '',
            workingLocation: '',
            period: '',
            task: '',
            time: '',
            worktime: '',
            fabActive:false,
            
        };
       // this.selectWorkTime = this.selectWorkTime.bind(this);
        //this.setDate_Start = this.setDate_Start.bind(this);
        //this.setDate_End = this.setDate_End.bind(this);

    }




    componentDidMount() {
        this.feedRef = firestore.collection('IngredientList');
        this.unsubscribe = this.feedRef.onSnapshot(this.getCollection);


    } 
/*     componentDidMount() {
        this.unsubscribe = firestore.collection('IngredientList').doc(auth.currentUser.uid).onSnapshot(doc => {
            console.log(doc);
            const { url, date_bought, ingredientname, ingredientDesc, ExpiryReceived, alert, quantity} = doc.data();
            this.setState({
                email,
                fullname,
                description,
                phoneNum,
                url,
                address,
            })
            console.log("doc", doc)
        });
      
        //this.unsubscribe = firebase.firestore().collection('Users').onSnapshot(this.getCollection);
    } */

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const food = [];
        querySnapshot.forEach((res) => {
            const {
                uid,
                ingredientname,
                ingredientDesc,
                quantity,
                date_bought,
                ExpiryReceived,
                alert,
                url
            } = res.data();
            food.push({
                key: res.id,
                res,
                uid,
                ingredientname,
                ingredientDesc,
                quantity,
                date_bought,
                ExpiryReceived,
                alert,
                url
            });
        });
        this.setState({
            food,
            isLoading: false
        })
    }
    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }

    displayModal(show) {
        this.setState({ isVisible: show })
        
    }


    setTask = (value) => {
        this.setState({ ...this.state, task: value })
    }


    static navigationOptions = {
        title: 'Hire',

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-briefcase" style={{ color: tintColor, fontSize: 20 }} />
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
            <Container>

                <Content >
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>List of Ingredient</Text>
                    <View style={{ flex: 1, /* backgroundColor: '#292D5C' */ shadowColor: 'white', backgroundColor: '#242836' }}>
                    <FlatList
                            data={this.state.food}                            
                            contentContainerStyle={{ justifyContent:'space-around' }}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                                return (
                                    <SafeAreaView>
                                        <ScrollView>
                                            <View>
                                            <Card key={index} style={Style.card} >
                                                <CardItem header bordered style={{ flexDirection: 'row' }}>
                                                    <Text>{item.ingredientname}</Text>
                                                </CardItem>
                                                <CardItem>
                                                    <Thumbnail source={{uri: item.url}}/>
                                                </CardItem>
                                                <CardItem>
                                                    <Body>
                                                        <View style={{ flexDirection:'row', alignItems: 'center'}}>
                                                            <Text style={{paddingEnd:10}}>{item.quantity}</Text>
                                                            <Text>gram</Text>
                                                        </View>
                                                    </Body>
                                                </CardItem>
                                                <CardItem style={{margin: 7,  flexDirection: 'column'}}>
                                                    <Body>
                                                        <Right>
                                                            <Text>
                                                                {item.date_bought}
                                                            </Text>
                                                        </Right>
                                                    </Body>
                                                    <Body>
                                                        <Text>
                                                            {item.alert}
                                                        </Text>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                            </View>

                                        </ScrollView>
                                    </SafeAreaView>
                                )
                            }}
                        />
                    </View>

                </Content>

                <Fab 
                style={{ backgroundColor: '#031CDD', borderRadius: 50, }} 
                direction="up"
                position="bottomRight"
                onPress={() => this.setState({ active: !this.state.fabActive })}>
                <Icon name="md-add-outline" />
                     <Button style={{ width:60, height: 50,  backgroundColor: '#34A34F' }}   onPress={() => this.props.navigation.navigate('PostFood')}>
                        <Icon name="ios-add-circle-outline" style={{ color: '#ffffff', fontSize: 30}} />
                      </Button>
                      <Button style={{ width:60, height: 50, backgroundColor: '#3B5998', marginBottom: 30, marginEnd: 30}} onPress={() => this.props.navigation.navigate('PlanLocation')}>
                        <Icon name="person-add" style={{ color: '#ffffff', fontSize: 30}}/>
                      </Button>
                    

                </Fab>

            </Container >
        );
    }
}

const Style = StyleSheet.create({
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 220,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    closeText: {
        fontSize: 25,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 10
    },
    buttonText: {
        color: "#10BA01",
        fontSize: 22,
        shadowColor: 'black',
        elevation: 20,
        fontWeight: 'bold',
        fontFamily: "CerealMedium",
        justifyContent: 'center',
        alignItems: 'center',



    },
    card: {
        alignItems:'center',
        elevation: 15,
        margin: 10,
        padding:10, 
        maxWidth:200, 
        
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },

    hireBtn: {
        marginLeft: 150,
        width: 75,
        textAlign: 'center',
    },

    text_title: {
        fontFamily: "CerealMedium",
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: '#0A0E4D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    listText: {
        fontFamily: "CerealMedium",
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    startRouteBtn: {
        backgroundColor: 'blue',
        height: 30,
        width: 80,
        borderRadius: 35,

    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    image: {
        marginTop: 50,
        marginBottom: 10,
        width: '100%',
        height: 190,
    },
    logo: {
        width: '100%',
        height: 90
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 40
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3974',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonHireText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: "CerealMedium",
        fontWeight: 'bold',

    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
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
        margin: 35,
        elevation: 10
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text_header: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 18,
        padding: 7
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    text_price: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 20,
        padding: 7,
        elevation: 6
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column'
    },
    listing: {
        marginBottom: 25,
        elevation: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: 20,
        padding: 3,
        marginRight: 6,
        marginLeft: 6
    },
    startBtn: {
        backgroundColor: 'white',
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    roundedBtn: {
        height: 31,
        marginEnd: 50,
        width: 200
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
    },
})
