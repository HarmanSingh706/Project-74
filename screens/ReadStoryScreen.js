import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Header} from 'react-native-elements';
import db from '../config'




export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.retrieveStories()
  }

  updateSearch = search => {
    this.setState({ search });
  };


  retrieveStories=()=>{
    try {
      var allStories= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              
              allStories.push(doc.data())
              console.log('this are the stories',allStories)
          })
          this.setState({allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item)=> {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View style ={styles.container}>
           <Header 
                backgroundColor = {'pink'}
                centerComponent = {{
                    text : 'StoryHub',
                    style : { color: 'white', fontSize: 20, width: 250, alignItems:'center'}
                }}
            />
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
            />
          </View>
          
          <ScrollView>
              <View>
                {
                  this.state.search === "" ? 
                    this.state.allStories.map((item)=>(
                      <View style={{borderColor:'pink',borderWidth:2,padding:10,width:1540}}>
                        <Text>
                          Title : {item.title}
                        </Text>
                        <Text>
                          Author : {item.author}
                        </Text>
                      </View>
                    ))
                  :
                  this.state.dataSource.map((item)=>(
                    <View style={{borderColor:'pink',borderWidth:2,padding:10}}>
                      <Text>
                       Title : {item.title}
                      </Text>
                      <Text>
                       Author : {item.author}
                      </Text>
                    </View>
                  ))
                }
              </View>
          </ScrollView> 
          
          
          
        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },item: {
    backgroundColor: 'pink',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
   itemContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    borderColor: 'pink',
    justifyContent: 'center',
    alignSelf: 'center',
  }
});