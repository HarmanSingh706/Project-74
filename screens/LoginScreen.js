import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import firebase from 'firebase';
import { KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  constructor(){
    super()
    this.state={
      email : "",
      password : ""
    }
  }

  showAlert(errorCode){
    switch(errorCode){
      case 'auth/too-many-requests':
        Alert.alert('To many requests\nTry again later')
        this.setState({
          email:"",
          password : ""
        })
        break
      case 'auth/wrong-password':
        Alert.alert('Enter Correct password')
        this.setState({
          password : ""
        })
        break
      default:
        this.setState({
          email:"",
          password : ""
        })
        return Alert.alert('Invalid email and password')
    }
  }

  render(){
    return(
      <View style={styles.container}>
<KeyboardAvoidingView>
<Header
          backgroundColor={'#0000FF'}
          centerComponent={{
            text: 'StoryHub',
            style: { color: '#00FF00', fontSize: 30, fontFamily:'Felix Titling' },
          }}
        />
          <Image source = { require("../assets/icon.jpg")} style={styles.image} />
          <TextInput
              placeholder="Type Email Here....."
              onChangeText= {(emailText)=>{
                  this.setState({
                      email: emailText
                  })
              }}
              value={this.state.email}
              style={styles.loginBox}
              />
          <TextInput
              placeholder="Type Password Here....."
              onChangeText= {(passwordText)=>{
                  this.setState({
                      password: passwordText
                  })
              }}
              value={this.state.password}
              style={styles.loginBox}
              secureTextEntry = {true}
              />
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress = {async()=>{
              var email  = await this.state.email;
              var password = await this.state.password
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text>Login</Text>
          </TouchableOpacity>

        </View>
        </KeyboardAvoidingView>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft:10,
        alignSelf:'center',
        backgroundColor:'#ff0000',
        borderRadius: 10
    },
   
    loginButton: {
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7,
        alignSelf:'center',
        backgroundColor:'#0000FF'
    },

    container: {
        backgroundColor:'#FFA500',
        width:'100%',
        height:'100%',
        flex:1
    },
    image:{
        width: 300,
        height: 200,
        alignSelf: 'center',
        borderColor:'#ffff'
      }
})