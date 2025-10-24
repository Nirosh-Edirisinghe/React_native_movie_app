import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovie } from '@/servises/api';
import { updateSearchCount } from '@/servises/appWrite';
import useFetch from '@/servises/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const search = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: movies, loading, error, refetch: loadMovies, reset } = useFetch(() => fetchMovie({
    query: searchQuery
  }), false)

  // useEffect(() => {

  //   const timeoutId = setTimeout( async () => {
  //     if (searchQuery.trim()) {
  //       await loadMovies();
  //     } else {
  //       reset()
  //     }
  //   },500);
  //   return ()=> clearTimeout(timeoutId);
  // }, [searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    // Only update count after movies are fetched successfully
    if (movies && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies])



  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard{...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5'>
              <SearchBar placeholder='Search movies...'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {
              loading && (
                <ActivityIndicator size='large' color='#0000ff' />
              )
            }
            {
              error && (
                <Text className='text-red-500 px-5 py-3'>Error: {error.message}</Text>
              )
            }
            {
              !loading && !error && searchQuery.trim() && movies?.length > 0 && (
                <Text className='text-xl text-white font-bold'>Search Result for {' '}
                  <Text className='text-cyan-400'>{searchQuery}</Text>
                </Text>
              )
            }
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>{searchQuery ? 'No movies found' : 'Search for a movies'}</Text>
            </View>
          ) : null
        }
      />

    </View>
  )
}

export default search

const styles = StyleSheet.create({})