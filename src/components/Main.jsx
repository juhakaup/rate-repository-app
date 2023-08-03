import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path='/signin' element={<SignIn />} exact />
        <Route path=':repositoryId' element={<SingleRepository />} exact />
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='*' element={<Navigate to='/' replace />}  />
      </Routes>
      
    </View>
  );
};

export default Main;