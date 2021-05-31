import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem, ListItem } from 'native-base';
import {auth, firestore} from '../config/Firebase'
//import JobList from '../../components/chat/JobList';

const { width, height } = Dimensions.get('window')


export default class MyOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            uniqueId: null,
            jobname: null,
            jobdesc: null,
            salary: null,
            peoplenum: null,
            chosenDate: null,
            lat: 0,
            lng: 0,
            worktype: null,
            location: { description: '' },
            url: null,
            dynamicAddress: [],
            item: {},
            items: [],
        }

    }

    componentDidMount() {
        const detailRef = firestore.collection('Job_list').doc(this.props.route.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,
                    jobname: job.jobname,
                    jobCreatorName: job.jobCreatorName,
                    jobdesc: job.jobdesc,
                    salary: job.salary,
                    peoplenum: job.peoplenum,
                    worktype: job.worktype,
                    experience: job.experience,
                    uniqueId: job.uniqueId,
                    qualification: job.qualification,
                    url: job.url
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
                    <Card>
                       <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobname}</Text>

                        </CardItem>
                    </Card>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >Employer Email</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobCreatorName}</Text>
                            </Body>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>Unique Id</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.uniqueId}</Text>
                            </Body>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobdesc}</Text>
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
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                  <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.qualification}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.experience}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                     </Card>
                     <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Number of People Required:</Text>

                         </CardItem>
                        <CardItem cardBody style={{ marginTop: 20 }}>
                            
                            <Body>
                                <Text> {this.state.peoplenum}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>$ {this.state.salary}</Text></Body>
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
/*     map: {
        height: 300,
        // disabledwidth: 100,
        width: 370,
        //...StyleSheet.absoluteFillObject
    }, */
});

