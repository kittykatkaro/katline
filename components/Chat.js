import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
	const { name, color } = route.params;

	useEffect(() => {
		// Set the user's name as the screen title
		navigation.setOptions({ title: name });
	}, [name, navigation]);

	return (
		<View style={[styles.container, { backgroundColor: color }]}>
			<Text style={styles.text}>Welcome to the chat, {name}!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 16,
		color: '#000',
	},
});

export default Chat;
