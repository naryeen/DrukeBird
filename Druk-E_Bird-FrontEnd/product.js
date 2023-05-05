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