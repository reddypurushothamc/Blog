import React, {useContext, useEffect} from 'react';
import { Text, StyleSheet, View, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {

  const { state, deleteBlogPost, getBlogPosts} = useContext(Context); 

  useEffect(() => {
    //on start of app we are fetching
    getBlogPosts();

    //again after adding post, coming back to indexscreen to fetch posts automatically
    const listener = navigation.addListener('didFocus',() => {
      getBlogPosts();
    });

    //whenever we move out of indexscreen we are removing listener to handle dangling pointer
    return () => {
      listener.remove();
    };

  }, []);

  return (
      <View>
        <FlatList
          data = {state}
          keyExtractor = { (blogPost) => blogPost.title }
          renderItem = {({item}) => {
            return ( 
              <TouchableOpacity onPress = { ( ) => navigation.navigate('Show', {id: item.id}) }>
                <View style = {styles.row}  >
                    <Text style = {styles.title}>{item.title} - {item.id}</Text>
                    <TouchableOpacity onPress = {() => deleteBlogPost(item.id) }>
                      <Feather style = {styles.icon} name = "trash" />
                    </TouchableOpacity>  
                </View>
              </TouchableOpacity>
            )
          }}
        ></FlatList>
      </View>
    );

};

IndexScreen.navigationOptions = ({navigation}) =>{
  return {
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Feather name="plus" size={30} />
        </TouchableOpacity>
      ),
    };
};


const styles = StyleSheet.create({
  row:{
    flexDirection : 'row',
    justifyContent: 'space-between',
    paddingVertical : 20,
    paddingHorizontal : 10,
    borderTopWidth : 1,
    borderColor : 'gray' 
  },
  title:{
    fontSize: 18
  },
  icon:{
    fontSize : 24
  }
});

export default IndexScreen;