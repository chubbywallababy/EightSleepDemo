// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   Text,
//   ActivityIndicator,
// } from 'react-native';
// import {useAppDispatch, useAppSelector} from '../redux/hooks';
// import {fetchAsync, selectData, selectStatus} from '../redux/sleeper/sleepSlice';
// import {SleepDataCell} from '../components/SleepDataCell';
// import {useNavigation} from './hooks/useNavigation';
// import {AnimatedNumber} from '../components/AnimatedNumber';
// import {Background} from '../components/common';

// export const SleepDataListView = () => {
//   const navigation = useNavigation();

//   const [didLoad, setDidLoad] = useState(false);
//   const data = useAppSelector(selectData);
//   const status = useAppSelector(selectStatus);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (!didLoad) {
//       dispatch(fetchAsync());
//       setDidLoad(true);
//     }
//   }, [dispatch, didLoad]);

//   return (
//     <Background style={styles.container}>
//       {status === 'loading' ? <ActivityIndicator size="large" /> : null}
//       {status === 'failed' ? <Text>Sorry, something went wrong...</Text> : null}
//       {data.length === 0 && status === 'idle' ? (
//         <Text>There are no nights available for analysis</Text>
//       ) : null}
//       {data.length > 0 && status === 'idle' ? (
//         <>
//           <View style={styles.heading}>
//             <AnimatedNumber n={data.length} duration={500} />
//             <Text style={styles.headingText}>nights tracked</Text>
//           </View>
//           <FlatList
//             style={styles.list}
//             keyExtractor={item => item.id}
//             data={data}
//             renderItem={({item}) => (
//               <SleepDataCell
//                 data={item}
//                 onPress={() => navigation?.navigate('Details', {data: item})}
//               />
//             )}
//           />
//         </>
//       ) : null}
//     </Background>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   paddedText: {
//     marginVertical: 100,
//   },
//   heading: {
//     paddingVertical: 20,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headingText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   list: {
//     flex: 1,
//     width: '100%',
//   },
// });
