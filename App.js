import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import Screens
import Start from './components/Start';
import Chat from './components/Chat';
// import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Create the navigator
const Stack = createStackNavigator();

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCxBUrORBGTT5FutkwjWFkQw1end4ua1ic',
	authDomain: 'katline-app.firebaseapp.com',
	projectId: 'katline-app',
	storageBucket: 'katline-app.firebasestorage.app',
	messagingSenderId: '83599672388',
	appId: '1:83599672388:web:b8d1fa38ae0f65abaf6811',
};

const App = () => {
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start" component={Start} />
				<Stack.Screen name="Chat">
					{(props) => <Chat db={db} {...props} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
