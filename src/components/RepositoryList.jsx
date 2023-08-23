import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Button, Menu, PaperProvider, TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1dfda'
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const SearchField = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <TextInput 
    label="Search term"
    value={searchKeyword}
    onChangeText={text => setSearchKeyword(text)}
    />
  )
}

const FilterSelector = ({ orderBy, setOrderBy, orderDirection, setOrderDirection }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  let menuText;

  if (orderBy == "CREATED_AT") {
    menuText = "Latest repositories";
  } else if (orderBy === "RATING_AVERAGE" && orderDirection === "DESC") {
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
            setOrderBy("CREATED_AT");
            setOrderDirection("DESC");
          }} title="Latest repositories" />
            
          <Menu.Item onPress={() => {
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("DESC");
          }} title="Higest rated repositories" />

          <Menu.Item onPress={() => {
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("ASC");
          }} title="Lowest rated repositories" />
        </Menu>
      </View>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    const { searchKeyword, setSearchKeyword, setOrderBy, orderBy, setOrderDirection, orderDirection } = props;
    return (
      <>
        <SearchField searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
        <FilterSelector 
          setOrderBy={setOrderBy}
          orderBy={orderBy}
          setOrderDirection={setOrderDirection}
          orderDirection={orderDirection}
          setSearchKeyword={setSearchKeyword}
        />
      </>
    );
  }

  render() {
    const props = this.props;
    const repositories = props.repositories;
    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return(
      <PaperProvider>
      <FlatList
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        data={repositoryNodes}
        renderItem={({item}) => (<RepositoryItem item={item} singleItem={false} userView={false}/>)}
        ListHeaderComponent={this.renderHeader}
      />
    </PaperProvider>
    )
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [value] = useDebounce(searchKeyword, 500);
  const{ repositories } = useRepositories({ orderBy, orderDirection, searchKeyword: value });

  return ( 
    <RepositoryListContainer 
      repositories={repositories} 
      setOrderBy={setOrderBy}
      orderBy={orderBy}
      setOrderDirection={setOrderDirection}
      orderDirection={orderDirection}
      setSearchKeyword={setSearchKeyword}
      searchKeyword={searchKeyword}
    />
  )
};

export default RepositoryList;