import { View, Image, StyleSheet, Pressable } from 'react-native'
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    margin: 15,
    width: '100%'
  },
  logo: {
    width: theme.logo.width,
    height: theme.logo.height,
    borderRadius: theme.logo.borderRadius,
    margin: 5,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  description: {
    color: theme.colors.gray,
    paddingTop: 8,
  },
  button: {
    alignSelf: 'start', 
    padding: 5, 
    borderRadius:5,  
    backgroundColor: theme.colors.primary,
    marginTop:10,
  },
  gitHubButton: {
    padding: 15, 
    borderRadius:5,  
    backgroundColor: theme.colors.primary,
    marginLeft:15,
    marginRight:15,
    marginBottom:15,
    alignItems: 'center'
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 5,
  },
  statDesc: {
    color: theme.colors.gray,
  }
});

const readableNumber = (num) => {
  if (num > 999) {
    return Math.ceil(num / 100) / 10 + "k"
  }
  return num;
}

const onPress = (url) => {
  Linking.openURL(url)
}

const RepositoryItem = ({ item, singleItem }) => {
  const navigate = useNavigate();
  

  return (
    <View style={{ flex: 1}} testID="repositoryItem">
      <Pressable disabled={singleItem} onPress={() => navigate(`${item.id}`)}>
        <View style={ styles.info }>
          <Image style={styles.logo} source={{uri: item.ownerAvatarUrl }}/>
          <View style={{ flex: 1, paddingLeft:10, paddingTop:5}}>
            <Text fontWeight={'bold'}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Pressable style={ styles.button }>
              <Text fontWeight={'bold'} style={{ color: 'white' }} >{item.language}</Text>
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={ styles.stat }>
            <Text fontWeight={'bold'} style={{ marginBottom: 5}}>
              {readableNumber(item.stargazersCount)}
            </Text>
            <Text style={ styles.statDesc }>Stars</Text>
          </View>
          <View style={ styles.stat }>
            <Text fontWeight={'bold'} style={{ marginBottom: 5}}>
              {readableNumber(item.forksCount)}
            </Text>
            <Text style={ styles.statDesc }>Forks</Text>
          </View>
          <View style={ styles.stat }>
            <Text fontWeight={'bold'} style={{ marginBottom: 5}}>
              {readableNumber(item.reviewCount)}
            </Text>
            <Text style={ styles.statDesc }>Reviews</Text>
          </View>
          <View style={ styles.stat }>
            <Text fontWeight={'bold'} style={{ marginBottom: 5}}>
              {readableNumber(item.ratingAverage)}
            </Text>
            <Text style={ styles.statDesc }>Rating</Text>
          </View>
        </View>
        {singleItem ?
        <View>
        <Pressable style={ styles.gitHubButton } onPress={()=> onPress(item.url)}>
          <Text fontWeight={'bold'} style={{ color: 'white' }} >Open in GitHub</Text>
        </Pressable>
        </View>
        : null
        } 
      </Pressable>
    </View>
  )
}

export default RepositoryItem