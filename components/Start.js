import { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Start = ({ navigation }) => {
	const [name, setName] = useState('');
	const [selectedColor, setSelectedColor] = useState('');

	const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/Background.png')}
				style={styles.background}
			>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>Welcome to KatLine</Text>
					<TextInput
						style={styles.textInput}
						value={name}
						onChangeText={setName}
						placeholder="Enter your username"
						placeholderTextColor="#eee"
					/>
					<Text style={styles.backgroundText}>
						Choose Background Color:
					</Text>
					<View style={styles.colorContainer}>
						{colors.map((color) => (
							<TouchableOpacity
								key={color}
								style={[
									styles.colorOption,
									{ backgroundColor: color },
								]}
								onPress={() => setSelectedColor(color)}
							/>
						))}
					</View>
					<TouchableOpacity
						style={styles.startButton}
						onPress={() =>
							navigation.navigate('Chat', {
								name: name,
								color: selectedColor,
							})
						}
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
		justifyContent: 'center',
	},

	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
	},

	title: {
		fontSize: 45,
		fontWeight: '600',
		color: '#FFFFFF',
		marginBottom: 20,
	},

	textInput: {
		width: '88%',
		padding: 15,
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 20,
		color: '#eee',
		fontSize: 16,
		fontWeight: '300',
	},

	backgroundText: {
		fontSize: 16,
		fontWeight: '300',
		color: '#eee',
		marginBottom: 10,
	},

	colorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		marginBottom: 20,
	},

	colorOption: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginHorizontal: 5,
	},

	startButton: {
		backgroundColor: '#757083',
		borderRadius: 5,
		padding: 15,
		width: '88%',
		alignItems: 'center',
	},

	startButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
	},
});

export default Start;
