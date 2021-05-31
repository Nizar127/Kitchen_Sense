import React, { Component } from 'react';
import { StyleSheet, Share, BackHandler, LayoutAnimation, Image, Animated, Alert, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, TabHeading, View, Card, Tab, Form, Item, Input, CardItem, Label, Thumbnail, Text, Left, Body, Button, Right, Fab, Separator, Content, Footer, FooterTab, Textarea } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {auth, firestore, storage} from '../config/Firebase';
//import { SharedElement } from "react-navigation-shared-element";


//what we going to do in this home.js is
//first: get the collection from job_list n display within card with button available
//then: once user click book now, we collect the user information and add into hiring collections
//then we send notification to job_creator regarding the application

export default class Search extends Component {

    constructor() {
        super();

        this.hireRef = firestore().collection('Hiring');
        //this.userRef = firestore.collection('Users');
        //this.applyRef = firestore().collection('Job_list').orderBy('chosenDate', 'asc');


        this.state = {
            show: true,
            jobs: [],
            job_id: '',
            userID: '',
            username: '',
            displayName: '',
            email: '',
            description: '',
            mainskills: '',
            photoURL: '',
            applyID: '',
            jobname: '',
            ///userId: '',
            isVisible: false,
            ref_skills: '',
            experience: '',
            profileImage: '',
            selfdescription: '',
            key: '',
            url: '',
            job_seeker_name: '',
            jobCreatorID: '',
            jobCreatorName: '',
            jobDescription: '',
            job_seekerImage: '',
            jobWorkType: '',
            job_qualification:'',
            job_seeker_salary: '',
            jobExperience: '',
            ref_selfDescribe: '',
            jobName: '',
            searchText: '',
            searchList: []

        };

    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'This temporary job is incredible! Check out other tons more of similar job here at TempJob. Share it with your family and friends',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };



    //show modal
    displayModal(show) {
        this.setState({ isVisible: show })
    }


    componentDidMount() {

        //this.unsubscribe = this.applyRef.onSnapshot(this.getCollection);
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    componentWillUnmount() {
        // this.unsubscribe();
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    handleBackButtonPressAndroid = () => {
        if (!this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }

        if (this.isSelectionModeEnabled()) {
            this.disableSelectionMode();

            // We have handled the back button
            // Return `true` to prevent react-navigation from handling it
            return true;
        } else {
            return false;
        }
    };

    HireWorking = (id) => {
        console.log("text_id", id);
        let dbref = firestore.collection('Hiring').doc(id).get();
        dbref.then(doc => {
            this.setState({
                ...this.state,
                uid: doc.get('uid'),
                //job_seeker_name: doc.get('username'),
                jobSeekerName: doc.get('job_seeker_name'),
                jobseekerID: doc.get('userID'),
                jobDescription: doc.get('jobDescription'),
                job_seekerImage: doc.get('job_seekerImage'),
                jobname: doc.get('jobName'),
                jobWorktype: doc.get('jobWorkType'),
                job_seeker_salary: doc.get('job_seekerSalary'),
                skills: doc.get('ref_skills'),
                experience: doc.get('jobExperience'),
                qualification: doc.get('job_qualification'),
                selfDescribe: doc.get('ref_selfDescribe')
            }, () => {

                console.log("state", this.state)
                console.log("auth.currentUser", auth.currentUser)



                if (this.state.task) {

                    this.hiringRef.add({
                        jobCreatorID: auth.currentUser.uid,
                        job_creator_name: auth.currentUser.displayName,
                        job_creator_Image: auth.currentUser.photoURL,
                        jobSeekerName: this.state.jobSeekerName,
                        jobSeekerID: this.state.jobseekerID,
                        jobDescription: this.state.jobDescription,
                        job_seekerImage: this.state.job_seekerImage,
                        jobName: this.state.jobname,
                        job_seekerSalary: this.state.job_seeker_salary,
                        type_of_Job: this.state.jobWorktype,
                        task: this.state.task,

                    }).then((res) => {
                        this.setState({
                            task: '',

                        });
                        Alert.alert('Congrats!', 'Your Application Has Been Send To The Job Seeker');
                        this.displayModal(!this.state.isVisible);

                    })

                        .catch((err) => {
                            console.error("Error found: ", err);
                            // this.setState({
                            //   isLoading: false,
                            // });
                        });
                }
            });

        });

    }


    onClickSearch = () => {
        console.log('state.searchText', this.state.searchText);


        firestore.collection('Hiring').where('jobWorkType', '==', this.state.searchText).get().then(querySnapshot => {
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


    render() {

        return (
            <>{!!this.state.searchList && this.state.searchList.length > 0 ?
                (

                    <View style={{ flex: 1, padding: 10, marginBottom: 10, backgroundColor: '#242836' }}>
                        <Header style={{ backgroundColor: 'white', padding: 5 }}>
                            {/* <View style={{ marginTop: 13, marginEnd: 350 }}> */}
                            <Left>
                            </Left>
                            {/* </View> */}
                        </Header>
                        <FlatList
                            data={this.state.searchList}
                            //contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item, index }) => {
                                console.log('item', item);
                                return (
                                    
                                    <View>
                                        
                                        <Modal
                                        animationType={"slide"}
                                        transparent={false}
                                        visible={this.state.isVisible}
                                        onRequestClose={() => {
                                            Alert.alert('Modal has now been closed.');
                                        }}>
                                        <ScrollView>
                                            <KeyboardAvoidingView
                                                behavior={Platform.OS === "ios" ? "padding" : null}
                                                style={{ flex: 1 }}>
                                                <View style={Style.inner}>


                                                    <Item style={Style.inputGroup} fixedLabel last>
                                                        <Label>Task To Do</Label>
                                                        <Textarea rowSpan={3} bordered onChangeText={this.setTask} style={Style.startTextBtn} placeholder="Tell something about the job Here" />
                                                    </Item>


                                                    <Text
                                                        style={Style.closeText}
                                                        onPress={() => {
                                                            this.displayModal(!this.state.isVisible);
                                                        }}><Icon name="md-close" size={20} />
                                                    </Text>

                                                    <Button success style={Style.addButton} onPress={() => this.HireWorking(this.state.key)}>
                                                        <Text>Submit</Text>
                                                    </Button>
                                                    <View style={{ flex: 1 }}></View>
                                                </View>

                                            </KeyboardAvoidingView>
                                        </ScrollView>
                                    </Modal>
                                    <Header searchBar rounded style={Style.searchBar}>
                                    <Item>
                                        <Icon name="ios-search" />
                                        <Input placeholder="Search" onChangeText={value => this.setState({ searchText: value })} />
                                        <Button rounded onPress={this.onClickSearch}>
                                            <Text>Search</Text>
                                        </Button>
                                    </Item>
        
        
                                </Header>
                                
                                <Card key={index} style={Style.listing}>
                                                <CardItem><Text style={Style.text_title}>{item.worktype}</Text></CardItem>
                                                <CardItem cardBody bordered button onPress={() => this.props.navigation.navigate('JobCreatorDetail', {
                                                    userkey: item.key
                                                })}>
                                                    <Image source={{ uri: item.job_seekerImage }} style={{ height: 200, width: null, flex: 1 }} />
                                                </CardItem>
                                                <CardItem style={{ flexDirection: 'row' }}>
                                                    <Body>
                                                        <Text style={Style.text_header}>{item.jobName}</Text>
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

                )
                : (

                    <View style={{ flex: 1, }}>


                        <Header style={{ backgroundColor: 'white' }}>
                            <View style={{ marginTop: 13, marginEnd: 350 }}>
                                <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                            </View>

                        </Header>
                        <Header searchBar rounded style={Style.searchBar}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Search" onChangeText={value => this.setState({ searchText: value })} />
                                <Button rounded onPress={this.onClickSearch}>
                                    <Text>Search</Text>
                                </Button>
                            </Item>


                        </Header>

                    </View>
                )}</>
        );

    }
}

const Style = StyleSheet.create({

    card: {
        elevation: 10,
        //borderColour: 'black',
        borderWidth: 1,
        marginHorizontal: 20,

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
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 235,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    thumbnailOverlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 16,

    },
    startRouteBtn: {
        backgroundColor: 'blue',
        height: 30,
        width: 80,
        borderRadius: 35,

    },
    inputText: {

        backgroundColor: 'white',
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        margin: 20,
        elevation: 10,
        margin: 10

    },
    searchBar: {
        justifyContent: 'center',
        padding: 5,
        opacity: 5.0,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        margin: 13,
        height: 47,

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
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
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
    text_header: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 18,
        padding: 9
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
        marginTop: 5
    },
    // image: {
    //     height: 150,
    //     width: width - 32,
    //     marginVertical: 8,
    // },
    text_title: {
        fontFamily: "CerealMedium",
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: 'green',
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
    jobDesc: {
        padding: 2,
        margin: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'grey',
        fontFamily: "CerealMedium",
        color: 'black',
        fontSize: 15,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    jobCreator: {
        borderColor: 'black',
        // borderColor: "black",
        borderRadius: 5,
        borderWidth: 1,
        padding: 6,
        marginTop: 10,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: "CerealMedium",
        backgroundColor: '#00FB83',
        color: 'black',
        opacity: 1.0
    },

    superhostLabel: {
        fontSize: 10,
        fontFamily: "CerealMedium",
    },

})

