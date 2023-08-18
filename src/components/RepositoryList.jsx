import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { Button, Menu, PaperProvider } from 'react-native-paper';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1dfda'
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const FilterSelector = ({ sorting, setSorting }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  let menuText;

  if (sorting.orderBy == "CREATED_AT") {
    menuText = "Latest repositories";
  } else if (sorting.orderBy === "RATING_AVERAGE" && sorting.orderDirection === "DESC") {
    menuText = "Higest rated repositories";
  } else {
    menuText = "Lowest rated repositories";
  }

  return (
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          zIndex: 1,
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} icon="chevron-down" contentStyle={{flexDirection: 'row-reverse'}}>{menuText}</Button>}>
          <Menu.Item title="Select an item..." disabled/>
          <Menu.Item onPress={() => {
            setSorting(
              {
                "orderBy": "CREATED_AT",
                "orderDirection": "DESC"
              }
            )
          }} title="Latest repositories" />
            
          <Menu.Item onPress={() => {
            setSorting(
              {
                "orderBy": "RATING_AVERAGE",
                "orderDirection": "DESC"
              }
            )
          }} title="Higest rated repositories" />

          <Menu.Item onPress={() => {
            setSorting(
              {
                "orderBy": "RATING_AVERAGE",
                "orderDirection": "ASC"
              }
            )
          }} title="Lowest rated repositories" />
        </Menu>
      </View>
  )
}

export const RepositoryListContainer = ({ repositories, sortBy, setSorting }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <PaperProvider>
      <FlatList
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        data={repositoryNodes}
        renderItem={({item}) => (
          <RepositoryItem item={item} singleItem={false}/>
        )}
        ListHeaderComponent={() => <FilterSelector sorting={sortBy} setSorting={setSorting} />}
      />
    </PaperProvider>
  );
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState({
    "orderBy": "CREATED_AT",
    "orderDirection": "DESC"
  });
  
  const setSorting = (item) => {
    setSortBy(item)
  }

  const{ repositories, loading } = useRepositories(sortBy);

  if (loading) {
    return (<Text>Loading...</Text>)
  }

  return ( 
    <RepositoryListContainer repositories={repositories} sortBy={sortBy} setSorting={setSorting} />
  )
};

export default RepositoryList;