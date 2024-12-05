import { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
	const [name, setName] = useState('');
	const [selectedColor, setSelectedColor] = useState('');

	const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
	const auth = getAuth();

	const signInUser = () => {
		signInAnonymously(auth)
			.then((result) => {
				navigation.navigate('Chat', {
					name: name,
					color: selectedColor,
					userID: result.user.uid, // User id from Firebase
				});
				Alert.alert('Signed in Successfully!');
			})
			.catch((error) => {
				Alert.alert('Unable to sign in, try later again.');
			});
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/Background.png')}
				style={styles.background}
			>
				<View style={styles.contentContainer}>
					{/* App Title */}
					<Text style={styles.title}>KatLine</Text>

					{/* Input for User's Name */}
					<TextInput
						style={styles.textInput}
						value={name}
						onChangeText={setName}
						placeholder="Your Name"
						placeholderTextColor="#757083"
					/>

					{/* Background Color Options */}
					<Text style={styles.backgroundText}>
						Choose Background Color:
					</Text>
					<View style={styles.colorContainer}>
						{colors.map((color) => (
							<TouchableOpacity
								accessible={true}
								accessibilityLabel="Pick your background color"
								accessibilityHint="Lets you choose the background color for the chat screen"
								key={color}
								style={[
									styles.colorOption,
									{ backgroundColor: color },
									selectedColor === color &&
										styles.selectedColor,
								]}
								onPress={() => setSelectedColor(color)}
							/>
						))}
					</View>

					{/* Start Chatting Button */}
					<TouchableOpacity
						accessible={true}
						accessibilityLabel="Start Chatting"
						accessibilityHint="Navigates to the chat screen"
						style={styles.startButton}
						onPress={signInUser}
					>
						<Text style={styles.startButtonText}>
							Start Chatting
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	background: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	},

	contentContainer: {
		width: '88%',
		height: '44%',
		alignSelf: 'center',
		backgroundColor: '#FFF',
		opacity: 0.9,
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},

	title: {
		fontSize: 40,
		fontWeight: '600',
		color: '#757083',
		marginBottom: 20,
		textAlign: 'center',
	},

	textInput: {
		width: '100%',
		height: 50,
		borderWidth: 1,
		borderColor: '#757083',
		borderRadius: 5,
		paddingHorizontal: 10,
		fontSize: 16,
		marginBottom: 20,
	},

	backgroundText: {
		fontSize: 16,
		fontWeight: '300',
		color: '#757083',
		marginBottom: 10,
	},

	colorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},

	colorOption: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: 'transparent',
	},

	selectedColor: {
		borderColor: '#757083',
	},

	startButton: {
		backgroundColor: '#757083',
		borderRadius: 5,
		paddingVertical: 15,
		width: '100%',
		alignItems: 'center',
	},

	startButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
	},
});

export default Start;
