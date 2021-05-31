import React, { Component } from 'react';
import { StyleSheet, Image, Animated, Alert, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Container,
    Header,
    TabHeading,
    View,
    Card,
    Tab,
    Tabs,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    Right,
    Fab,
    Separator,
    Content
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
//import { db } from '../../config/firebase';
//import { addApplicant } from '../../config/firebase';
import storage from 'firebase';
import firestore from 'firebase';
import auth from 'firebase';
// import Progress from '../job_post/Progress';
//import Icon from 'react-native-vector-icons/Ionicons';


//let job = db.ref('/Job');


export default class JobProgress extends Component {

    constructor() {
        super();
        this.jobAcceptRef = firestore.collection('Job_Hired')/* .where('jobSeekerID', '==', auth().currentUser.uid) */;
        this.startJobRef = firestore.collection('Ongoing_Job');
        this.state = {
            show: true,
            jobs: [],
            jobId: '',
            userID: '',
            applyID: '',
            jobName: '',
            jobCreatorID: '',
            jobDescription: '',
            jobSeekerID: '',
            jobSeekerName: '',
            job_creator_Image: '',
            job_creator_name: '',
            job_seekerImage: '',
            lat: '',
            lng: '',
            job_seekerSalary: '',
            location: '',
            period: '',
            task: '',
            time: '',
            type_of_Job: '',
            startDate: '',
            endDate: '',
            time: ''

        };
    }



    componentDidMount() {
        //SplashScreen.hide();
        this.unsubscribe = this.jobAcceptRef.onSnapshot(this.getCollection);


    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    getCollection = (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((res) => {
            const { jobName, jobCreatorID, jobDescription, jobSeekerID, jobSeekerName, job_creator_Image, job_creator_name,
                job_seekerImage,
                lat,
                lng,
                job_seekerSalary,
                location,
                period,
                task,
                time,
                type_of_Job,
                startDate,
                endDate } = res.data();
            jobs.push({
                key: res.id,
                res,
                jobName,
                jobCreatorID,
                jobDescription,
                jobSeekerID,
                jobSeekerName,
                job_creator_Image,
                job_creator_name,
                job_seekerImage,
                lat,
                lng,
                job_seekerSalary,
                location,
                period,
                task,
                time,
                type_of_Job,
                startDate,
                endDate

            });
        });
        this.setState({
            jobs,
            isLoading: false
        })
    }



    static navigationOptions = {
        title: 'Job List',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-briefcase" style={{ color: tintColor }} size={20} />
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




    startJob = (id) => {



        let dbref = firestore.collection('Job_Hired').doc(id).get();
        dbref.then(doc => {
            this.setState({
                ...this.state,
                uid: doc.get('uid'),
                //job_seeker_name: doc.get('username'),
                job_id: doc.get('id'),
                jobCreatorID: doc.get('jobCreatorID'),
                jobCreatorName: doc.get('job_creator_name'),
                workImage: doc.get('job_creator_Image'),
                jobDescription: doc.get('jobDescription'),
                job_SeekerImage: doc.get('job_seekerImage'),
                jobname: doc.get('jobName'),
                task: doc.get('task'),
                time: doc.get('time'),
                jobWorkType: doc.get('type_of_Job'),
                workingLocation: doc.get('location'),
                lat: doc.get('lat'),
                lng: doc.get('lng'),
                job_seeker_salary: doc.get('job_seekerSalary'),
                startingDate: doc.get('startDate'),
                enddingDate: doc.get('endDate'),
            }, () => {

                console.log("state", this.state)
                console.log("auth.currentUser", auth.currentUser)



                // if (this.state.experience && this.state.skills && this.state.selfdescription) {

                this.startJobRef.add({

                    uid: auth.currentUser.uid,

                    //job_seeker_name: doc.get('username'),

                    jobCreatorID: this.state.jobCreatorID,
                    jobCreatorName: this.state.job_creator_name,
                    workImage: this.state.job_creator_Image,
                    jobDescription: this.state.jobDescription,
                    job_SeekerImage: this.state.job_seekerImage,
                    jobname: this.state.jobName,
                    task: this.state.task,
                    time: this.state.time,
                    jobWorkType: this.state.type_of_Job,
                    workingLocation: this.state.location,
                    lat: this.state.lat,
                    lng: this.state.lng,
                    job_seeker_salary: this.state.job_seekerSalary,
                    startingDate: this.state.startDate,
                    enddingDate: this.state.endDate,



                }).then((res) => {

                    Alert.alert('Lets get to work ');
                })

                    .catch((err) => {
                        console.error("Error found: ", err);

                    });

            });

        });

    }


    render() {

        return (
            <View style={{ flex: 1, padding: 10, marginBottom: 10, backgroundColor: '#242836' }}>
                <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20, color: 'white', fontSize: 20 }}>List of Available Task and Job</Text>

                <Container>

                    <View style={{ flex: 1, padding: 13, marginBottom: 40, backgroundColor: '#DCDCDD' }}>
                        <FlatList
                            data={this.state.jobs}

                            renderItem={({ item, index }) => {
                                return (

                                    <Card style={{ marginBottom: 30 }} key={index} onPress={() => this.props.navigation.navigate('FeedDetail', {
                                        userkey: item.key
                                    })}>
                                        <CardItem header bordered>
                                            {/* <Progress /> */}
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text style={{ fontStyle: 'bold', margin: 2, textAlign: 'center', color: 'blue', fontSize: 17, fontFamily: "montserrat" }}>{item.type_of_Job}</Text>
                                                <Text style={{ fontStyle: 'bold', margin: 2, textAlign: 'center', color: '#964F07', fontSize: 17 }}>{item.job_creator_name}</Text>
                                            </Body>

                                        </CardItem>
                                        <CardItem cardBody bordered button style={{ paddingTop: 20, paddingBottom: 30 }}>
                                            <Image source={{ uri: item.job_creator_Image }} style={{ height: 250, width: '100%', padding: 10 }} />
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Body style={{ flex: 1, padding: 10 }}>
                                                <View style={{ flexDirection: 'row', marginTop: 3, marginBottom: 3, padding: 10, borderColor: 'grey', borderBottomWidth: 1 }}>
                                                    <Icon name="md-briefcase" style={{ color: 'blue', marginRight: 8 }} size={20} />

                                                    <Text style={{ fontColor: 'black', fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 16 }}>{item.task}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 3, marginBottom: 3, padding: 10 }}>
                                                    <Icon name="md-calendar-outline" style={{ color: 'blue', marginRight: 8 }} size={20} />

                                                    <Text style={{ fontColor: 'black', fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 16 }}>{item.startDate}</Text>

                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 3, marginBottom: 3, padding: 10 }}>
                                                    <Icon name="md-calendar-outline" style={{ color: 'blue', marginRight: 8 }} size={20} />

                                                    <Text style={{ fontColor: 'black', fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 16 }}>{item.endDate}</Text>

                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 3, marginBottom: 3, padding: 10 }}>
                                                    <Icon name="md-time-outline" style={{ color: 'blue', marginRight: 8 }} size={20} />

                                                    <Text style={{ fontColor: 'Blue', fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 16 }}>Time: {item.time}</Text>

                                                </View>

                                            </Body>
                                        </CardItem>
                                        <CardItem style={{ justifyContent: 'center' }}>
                                            <Text style={{ fontColor: 'black', fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 25 }}>RM  {item.job_seekerSalary}/job</Text>
                                        </CardItem>

                                    </Card>

                                )
                            }}
                        />
                    </View>
                </Container>
            </View>

        );

    }
}


const Style = StyleSheet.create({

    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 150,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
})  