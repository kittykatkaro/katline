import { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
	collection,
	orderBy,
	addDoc,
	onSnapshot,
	query,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
	const { name, color, userID: UserID } = route.params;
	const [messages, setMessages] = useState([]);

	// Function to send messages
	const onSend = async (newMessages) => {
		addDoc(collection(db, 'messages'), newMessages[0]);
	};

	let unsubMessages;
	useEffect(() => {
		// Set the header options
		navigation.setOptions({
			title: name,
			headerStyle: {
				backgroundColor: '#fff',
			},
			headerTintColor: '#000',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		});

		//Check if the user is connected to the internet
		if (isConnected === true) {
			if (unsubMessages) unsubMessages();
			unsubMessages = null;

			// Get the messages from Firestore
			const q = query(
				collection(db, 'messages'),
				orderBy('createdAt', 'desc')
			);

			unsubMessages = onSnapshot(q, async (docSnapshots) => {
				let newMessages = [];
				docSnapshots.forEach((doc) => {
					newMessages.push({
						id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis()),
					});
				});
				cacheMessages(newMessages);
				setMessages(newMessages);
			});
		} else loadCachedMessages();

		// Clean up code
		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, []);

	// Load cached messages from AsyncStorage
	const loadCachedMessages = async () => {
		const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
		setMessages(JSON.parse(cachedMessages));
	};

	// cache messages in AsyncStorage
	const cacheMessages = async (newMessages) => {
		try {
			AsyncStorage.setItem('messages', JSON.stringify(newMessages));
		} catch (error) {
			console.log(
				'Error saving messages to AsyncStorage: ',
				error.message
			);
		}
	};

	// Function to render the chat bubble
	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#000',
					},
					left: {
						backgroundColor: '#FFF',
					},
				}}
			/>
		);
	};

	// prevent the user from typing messages when offline
	const renderInputToolbar = (props) => {
		if (isConnected) return <InputToolbar {...props} />;
		else return null;
	};

	// Function to render the custom actions
	const renderCustomActions = (props) => {
		return <CustomActions onSend={onSend} userID={UserID} userName={name} storage={storage} {...props} />;
	};

	// Function to render the custom view
	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{
						width: 150,
						height: 100,
						borderRadius: 13,
						margin: 3,
					}}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	return (
		<View style={[styles.chatContainer, { backgroundColor: color }]}>
			{/* Render the GiftedChat component */}
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				onSend={(newMessages) => onSend(newMessages)}
				user={{
					_id: UserID,
					name: name,
				}}
			/>
			{/* Prevents keyboard from overlapping the input field */}
			{Platform.OS === "ios" || Platform.OS === "android" ? (
        		<KeyboardAvoidingView
          			behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
          			keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0} // Adjust offset to prevent overlap
        		/>
      		) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	chatContainer: {
		flex: 1,
	},
	text: {
		fontSize: 16,
		color: '#000',
	},
});

export default Chat;
