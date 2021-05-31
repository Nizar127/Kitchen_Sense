import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Image
} from 'react-native';
import { firebase } from '@react-native-firebase/auth'
import { Button, Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Onboarding from 'react-native-onboarding-swiper';
console.disableYellowBox = true;



export default class Loading extends Component {

    addNewUserToFirestore = (user) => {
        const collection = firestore().collection('users');
        //const { display } = user.additionalUserInfo;
        const details = {
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            userType: 'job_seeker',
            createdDtm: firestore.FieldValue.serverTimestamp(),
            lastLoginTime: firestore.FieldValue.serverTimestamp(),
        };
        console.log(userType, 'user_created');
        collection.doc(user.uid).set(details);
        return { user, details };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {

            setTimeout(() => {
                if (user) {

                    Alert.alert('Status', 'You are logged in.')

                    firestore().collection('users').doc(user.uid).get().then(doc => {
                        if (!doc.exists) {
                            addNewUserToFirestore(user);
                            console.log("onAuthStateChanged:User created::uid=" + user.uid)
                        }
                    });

                    this.props.navigation.navigate('Home');
                }
                else {
                    this.props.navigation.navigate('GoogleLogin');
                }
            }, 1000);

        })
    }

    render() {
        return (
            <View>
                
            </View>
        )

    }

}


//export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

