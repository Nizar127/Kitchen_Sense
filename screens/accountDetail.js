import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem } from 'native-base';
import {auth, firestore, storage} from '../config/Firebase';
const { width, height } = Dimensions.get('window')


export default class AccountDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            uniqueId: null,
            address: null,
            fullname:null,
            email:null,
            url:null,
            phoneNum: null,
            description: null,
            item: {},
            items: [],
        
        }

    }

    componentDidMount() {
        const detailRef = firestore.collection('Users').doc(this.props.route.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const usrHoushold = res.data();
                this.setState({
                    key: res.id,
                    userID: usrHoushold.userID,
                    address: usrHoushold.address,
                    fullname: usrHoushold.fullname,
                    email: usrHoushold.email,
                    url: usrHoushold.url,
                    phoneNum: usrHoushold.phoneNum,
                    description: usrHoushold.description,
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

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.email}</Text>

                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>About Me</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.description}</Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card style={{ height: 400 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Address</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>   
                                <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.address}</Text>                              
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 400 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Phone Number</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>   
                                <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.phoneNum}</Text>                              
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

