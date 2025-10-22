// trach the searches made by user

import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWITE_DATABASE!;

const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWITE_COLLECTION!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT!)
  
const database = new Databases(client);

// export const updateSearchCount = async (query: string, movie: Movie) => {
//   const result  = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//     Query.equal('searchTerm',query)
//   ])
//   console.log('updateSearchCount called', query);

//   console.log(result);
  
// }

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    console.log('Fetching searchTerm:', query);
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ]);

    if(result.documents.length > 0){
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      )
    }else{
      await  database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(),{
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        tittle:movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      })
    }

  } catch (error) {
    console.error('Appwrite error:', error);
  }
};
