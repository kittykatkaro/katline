import { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Platform,
	KeyboardAvoidingView,
} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
	const { name, color } = route.params;
	const [messages, setMessages] = useState([]);
	// Function to send messages
	const onSend = (newMessages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);
	};

	useEffect(() => {
		// Set the initial message
		setMessages([
			{
				_id: 1,
				text: 'Hello! Start Chatting!',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: 2,
				text: 'This is a system message',
				createdAt: new Date(),
				system: true,
			},
		]);

		// Set the user's name as the screen title
		navigation.setOptions({ title: name });
	}, [name, navigation]);

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
					_id: 1,
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
