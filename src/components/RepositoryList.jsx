import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1dfda'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      data={repositoryNodes}
      renderItem={({item}) => (
        <RepositoryItem item={item} singleItem={false}/>
      )}
    />
  );
}

const RepositoryList = () => {
  const{ repositories, loading } = useRepositories();

  if (loading) {
    return (<Text>Loading...</Text>)
  }

  return (
    <RepositoryListContainer repositories={repositories} />
  )
};

export default RepositoryList;