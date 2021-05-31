import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem } from 'native-base';
import {auth, firestore, storage} from '../config/Firebase';
const { width, height } = Dimensions.get('window')


export default class JobCreatorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            uniqueId: null,
            jobCreatorID: null,
            jobCreatorName: null,
            jobDescription: null,
            jobName: null,
            jobWorkType: null,
            job_seekerImage: null,
            job_seeker_name: null,
            job_seekerSalary: null,
            jobExperience: null,
            job_qualification: null,
            ref_skills: null,
            ref_selfDescribe: null,
            item: {},
            items: [],
        
        }

    }

    componentDidMount() {
        const detailRef = firestore.collection('Hiring').doc(this.props.route.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,
                    userID: job.userID,
                    jobCreatorID: job.jobCreatorID,
                    jobCreatorName: job.jobCreatorName,
                    jobDescription: job.jobDescription,
                    jobName: job.jobName,
                    jobWorkType: job.jobWorkType,
                    job_seekerImage: job.job_seekerImage,
                    job_seeker_name: job.job_seeker_name,
                    job_seekerSalary: job.job_seekerSalary,
                    jobExperience: job.jobExperience,
                    job_qualification: job.job_qualification,
                    ref_skills: job.ref_skills,
                    ref_selfDescribe: job.ref_selfDescribe,
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })



    }


    setUniqueId = (value) => {
        this.setState({ uniqueId: value });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </Header>

                <Content padder>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobName}</Text>

                        </CardItem>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.jobWorkType}</Text>

                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobDescription}</Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card style={{ height: 400 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Requirement</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.jobExperience}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                  <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.job_qualification}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                     </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>RM {this.state.job_seekerSalary}</Text></Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Date</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text>{this.state.chosenDate}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>




            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        height: 300,
        // disabledwidth: 100,
        width: 370,
        //...StyleSheet.absoluteFillObject
    },
});

