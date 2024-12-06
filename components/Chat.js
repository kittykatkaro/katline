import { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Platform,
	KeyboardAvoidingView,
} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import {
	collection,
	orderBy,
	addDoc,
	onSnapshot,
	query,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
	const { name, color, userID: UserID } = route.params;

	const [messages, setMessages] = useState([]);

	// Function to send messages
	const onSend = (newMessages) => {
		addDoc(collection(db, 'messages'), newMessages[0]);
	};

	useEffect(() => {
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

		const q = query(
			collection(db, 'messages'),
			orderBy('createdAt', 'desc')
		);
		const unsubMessages = onSnapshot(q, (docSnapshots) => {
			let newMessages = [];
			docSnapshots.forEach((doc) => {
				console.log('doc', doc.data());
				newMessages.push({
					id: doc.id,
					...doc.data(),
					createdAt: new Date(doc.data().createdAt.toMillis()),
				});
			});
			setMessages(newMessages);
		});

		// Clean up code
		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, []);

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

	return (
		<View style={[styles.chatContainer, { backgroundColor: color }]}>
			{/* Render the GiftedChat component */}
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				onSend={(newMessages) => onSend(newMessages)}
				user={{
					_id: UserID,
					name: name,
				}}
			/>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior="height" />
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
