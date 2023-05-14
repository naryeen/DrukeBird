import React, { useState, useEffect, Component, useCallback } from 'react'
import { View,ActivityIndicator, FlatList, StyleSheet, Dimensions, ScrollView, Text } from 'react-native'
import ProductList from './ProductList'
import { Container, Icon, Input, Header, Item } from 'native-base'
import {useFocusEffect} from '@react-navigation/native'
import baseUrl from '../../assets/common/baseUrl'
import axios from 'axios'

import Banner from '../../Shared/Banner'
import CategoryFilter from './CategoryFilter'
import SearchProduct from './SearchedProducts'
// const data = require('../../assets/data/products.json')
// const productsCategories = require('../../assets/data/categories.json')
var { height } = Dimensions.get('window')

const ProductContainer = (props) => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([])
  const [productCtg, setProductCtg] = useState([])
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState([])
  const [loading, setLoading] = useState(true)

  useFocusEffect((
    useCallback(
      () => {
        
    // setProducts(data)
    //   setProductsFiltered(data)
    //   setProductCtg(data)
    //   setInitialState(data)
    setFocus(false)
    // setCategories(productsCategories)
    setActive(-1)
    //Products
    console.log(`${baseUrl}product`)
    axios
    .get(`${baseUrl}product`)
    .then((res) => {
      // console.log(res.data)
      setProducts(res.data.data)
      setProductsFiltered(res.data.data)
      setProductCtg(res.data.data)
      setInitialState(res.data.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      console.log('API call error')
     })

    // Categories
    axios
     .get(`${baseUrl}category`)
     .then((res) => {
      setCategories(res.data.data)
     })
     .catch((error) => {
      console.log('API call error')
     })
     return () => {
      setProducts([])
      setProductsFiltered([])
      setFocus()
      setCategories([])
      setActive()
      setInitialState()
      // setProductCtg([])
    }
      },
      [],
    )
  ) 
  
)

  //Categories
  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductCtg(initialState), setActive(true)]
        : [
            setProductCtg(
              // products.filter((i) => i.category.$oid === ctg),
              products.filter((i) => i.category._id === ctg),
              setActive(true),
            ),
          ]
    }
  }

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const openList = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  return ( 
    <>
     {loading == false ? (
        <Container>
        <Header searchBar rounded>
            <Item>
                <Icon name="ios-search" />
                <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
                />
                {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
            </Item>
        </Header>
        {focus == true ? (
          <SearchProduct
          navigation= {props.navigation}
           productsFiltered = {productsFiltered}
          />
        ):(
          <ScrollView>
            <View style={styles.container}>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productCtg={productCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productCtg.map((item) => {
                      return (
                        <ProductList 
                        navigation = {props.navigation}
                         key={item._id}
                         item={item}
                        />
                      )
                    })}
                </View>
                ): (
                  <View style={[styles.center, {height: height / 2}]}>
                    <Text>No products found</Text>
                  </View>
                )}
                
              </View>
          </ScrollView>
          
        )}
        
      </Container>
     ): (
      //loading
      <Container style={[styles.center, {backgroundColor: '#f2f2f2'}]}>
        <ActivityIndicator size="large" color="red" />

      </Container>
     )}
    </>
      
    
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductContainer



// import React,{useState,useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
// const [data,setData] = useState([]);
// const [loading,setLoading] = useState(true)

//  const url = "https://jsonplaceholder.typicode.com/posts"

//  useEffect(()=>{
//    fetch(url)
//    .then(response => response.json())
//    .then((json)=>setData(json))
//    .catch((error)=>console.log(error))
//    .finally(()=> setLoading(false))
//  },[])
//   return (
//     <View style={styles.container}>
//       {
//         loading ? <Text>Loading ...</Text>:
//         data.map((post)=>(
//           <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
//             <Text style={{fontSize:30, fontWeight: 'bold'}}>{post.title}</Text>
//             <Text style={{fontSize:15, color:'blue'}} >{post.body}</Text>
//           </View>
//         ))
//       }
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import { Searchbar, FAB } from 'react-native-paper';
// import {StyleSheet,View, FlatList, Text} from 'react-native';
// import Button from '../Components/Button';
// import StartBirdingHeader from '../Components/StartBridingHeader';
// import { useNavigation } from '@react-navigation/native';
// import axios from "axios";
// import StartBirdingCounter from '../Components/StartBirdingCounter';

// const StartBirdingone = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const onChangeSearch = query => setSearchQuery(query);
//   const [data, setData] = useState([]);
//   const [loading,setLoading] = useState(true)


//   useEffect(() => {
//     axios.get('https://druk-ebird.onrender.com/api/v1/species')
//       .then(res => res.json())
//       .then((json)=>setData(json))
//       .catch(error => {
//         console.log(error);
//         console.log('API call error')
//       })
//       .finally(()=> setLoading(false))
//   }, []);


  // const renderItem = (res) => {
  //   return (
  //     <View>
  //       <StartBirdingCounter > <Text>{res.data}</Text></StartBirdingCounter>
  //     </View>
  //   );
  // };
//   return (
//     <View style={styles.container}>
//     <StartBirdingHeader stylings={styles.header} />
//     <Searchbar
//       placeholder="Search any birds"
//       onChangeText={onChangeSearch}
//       inputStyle={{ paddingBottom:19}}
//       placeholderTextColor="gray"
//       value={searchQuery}
//       style={styles.searchbar}
//     />

//     <FlatList style={{height:"70%"}}
//         data={data}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
          

//     <FAB
//     style={styles.fab}
//     small
//     color='white'
//     icon="plus"
//     onPress={() => navigation.navigate('UnknownBirds')}
//   />
//     <View style={styles.buttonContianer}>
//     <Button styling={styles.submitbutton}>Submit</Button>
//     <Button styling={styles.stopbutton}>Stop</Button>
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding:10
//     },
//     searchbar:{
//         marginTop:5,
//         height:40,
//         borderRadius:10,
//         backgroundColor:"white",
//         borderColor:"black",
//         borderWidth:1
//     },
//     header:{
//         width:370,
//         height:50,
//         marginTop:30
        
//     },
//     buttonContianer:{
//       flexDirection:"row",
//       marginTop:10
//     },
//     submitbutton:{
//       width:163,
//       marginRight:10,
//       height:50,
//       borderRadius:7,
//     },
//     stopbutton:{
//       width:163,
//       marginLeft:10,
//       height:50,
//       borderRadius:7,
//     },
//     fab: {
//       marginLeft:330,
//       marginTop:10,
//       right: 0,
//       bottom: 0,
//       backgroundColor:"#136D66"
//     }
//   });

// return (
//   <View style={styles.container}>
//     {
//       loading ? <Text>Loading ...</Text>:
//       data.map((post)=>(
//         <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
//           <Text style={{fontSize:30, fontWeight: 'bold'}}>{post.englishName}</Text>
//         </View>
//       ))
//     }
//   </View>
// );
// }

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   backgroundColor: '#fff',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// });

// export default StartBirdingone;



// ///Drawer content// For custom section in hamberger menus
// import React from 'react';
// import { View, StyleSheet, Alert } from 'react-native';
// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';

// import { TouchableOpacity, Text } from 'react-native';


// export function DrawerContent(props) {
//   const navigation = useNavigation();

//   const handleSignOut = () => {
//     // Handle sign out logic here
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', onPress: () => navigation.navigate('SignOut') },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <DrawerContentScrollView {...props} scrollEnabled={false}>
//         <View style={styles.drawerContent}>
//           <View style={{ flexDirection: 'row', marginTop: 50 }}>
//             <View style={styles.userInfoSection}>
//               <Avatar.Image
//                 source={{
//                   uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
//                 }}
//                 size={90}
//               />
//               <View style={{ marginLeft: 1, flexDirection: 'column' }}>
//                 <Title style={styles.title}>Profile Name</Title>
//                 <Caption style={styles.caption}>View Profile</Caption>
//               </View>
//             </View>
//           </View>

//           <Drawer.Section style={styles.drawerSection}>
//             <DrawerItem
//               icon={({ color, size }) => (
//                 <MaterialCommunityIcons name="bird" size={24} color="white" />
//               )}
//               label="About"
//               labelStyle={{ color: 'white' }}
//               onPress={() => navigation.navigate('About')}
//             />
//           </Drawer.Section>
//           <Drawer.Section style={styles.drawerSection}>
//             <DrawerItem
//               icon={({ color, size }) => (
//                 <Feather name="settings" size={24} color="white" />
//               )}
//               label="Setting"
//               labelStyle={{ color: 'white' }}
//               onPress={() => navigation.navigate('Setting')}
//             />
//           </Drawer.Section>
//           <Drawer.Section style={styles.drawerSection}>
//             <DrawerItem
//               icon={({ color, size }) => (
//                 <MaterialIcons name="quick-contacts-dialer" size={24} color="white" />
//               )}
//               label="Contact US"
//               labelStyle={{ color: 'white' }}
//               onPress={() => navigation.navigate('ContactUs')}
//             />
//           </Drawer.Section>
//           <Drawer.Section style={styles.drawerSection}>
//             <DrawerItem
//               icon={({ color, size }) => (
//                 <Octicons name="checklist" size={24} color="#fff" />
//               )}
//               label="Help"
//               labelStyle={{ color: 'white' }}
//               onPress={() => navigation.navigate('Help')}
//             />
//           </Drawer.Section>
//           <Drawer.Section style={styles.drawerSection}>
//             <TouchableOpacity onPress={handleSignOut}>
//               <Text style={{ color: 'white' }}>Sign Out</Text>
//             </TouchableOpacity>
//           </Drawer.Section>
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#184e4a",

//     },
//     drawerContent: {
//         flex: 1,
//         backgroundColor: '#184e4a',

//     },
//     userInfoSection: {
//         paddingLeft: 10,
//         marginLeft: 40,
//         fontWeight: 'bold',
//         backgroundColor: '#184e4a'},
//     title: {
//         fontSize: 16,
//         marginTop: 3,
//         fontWeight: 'bold',
//         color: "white",
//     },
//     caption: {
//         fontSize: 14,
//         lineHeight: 14,
//         color: "white",
//         textDecorationLine: 'underline',
//     },
//     row: {
//         marginTop: 5,
//         flexDirection: 'row',
//         alignItems: 'center',},
//     section: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 5},
//     drawerSection: {
//         marginTop: 35}
//     });




////Searching Items
import React, { useState } from 'react';
import { Searchbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';

const SearchSpecies = ({setData}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onChangeSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(`https://druk-ebird.onrender.com/api/v1/species?search=${query}`);
      setData(response.data.species);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search any birds"
        onChangeText={onChangeSearch}
        inputStyle={{ paddingBottom: 19 }}
        placeholderTextColor="gray"
        value={searchQuery}
        style={styles.searchbar}
      />
      {/* Render the search results */}
      {/* {searchResults.map((result) => (
        <Text key={result._id}>{result.englishName}</Text>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  searchbar: {
    marginTop: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default SearchSpecies;


