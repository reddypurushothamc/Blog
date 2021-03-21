import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather} from  '@expo/vector-icons';

const ShowScreen = ({navigation}) => {
 
    const { state } = useContext(Context);

    //navigation.getParam('id') -- id of the tapped blogPost in IndexScreen which is passed from IndexScreen to ShowScreen
    //blogPost.id -- id of the blogs in state
    const blogPost = state.find( (blogPost) => blogPost.id === navigation.getParam('id') );

    return (
      <View>
        <Text>{ blogPost.title }</Text>
        <Text>{ blogPost.content }</Text>
      </View>
  );  
};

ShowScreen.navigationOptions = ({navigation}) =>{
  return {
      headerRight: () => (
          <TouchableOpacity 
          onPress = { () => 
              navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
          >
           <Feather name = "edit" size = {35} color = "black" />
        </TouchableOpacity>
      ),
    };
};


const styles = StyleSheet.create({});

export default ShowScreen;