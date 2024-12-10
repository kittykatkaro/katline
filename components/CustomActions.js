import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
	const actionSheet = useActionSheet();

	// initialize and show the action sheet
	const onActionPress = () => {
		const options = [
			'Choose From Library',
			'Take Picture',
			'Send Location',
			'Cancel',
		];
		const cancelButtonIndex = options.length - 1;
		actionSheet.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			async (buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						pickImage();
						return;
					case 1:
						takePhoto();
						return;
					case 2:
						getLocation();
						return;
					default:
				}
			}
		);
	};

	// get location
	const getLocation = async () => {
		let permissions = await Location.requestForegroundPermissionsAsync();
		if (permissions?.granted) {
			const location = await Location.getCurrentPositionAsync({});
			if (location) {
				onSend({
					location: {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					},
				});
			} else Alert.alert('Error occured while getting location');
		} else Alert.alert('Location permission required');
	};

	// pick image from library
	const pickImage = async () => {
		let permissions =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissions?.granted) {
			let result = await ImagePicker.launchImageLibraryAsync();
			if (!result.canceled) {
				const imageURI = result.assets[0].uri;
				const response = await fetch(imageURI);
				const blob = await response.blob();
			}
		} else Alert.alert('Image library permission required');
	};

	return (
		<TouchableOpacity style={[styles.container]} onPress={onActionPress}>
			<View style={[styles.wrapper, wrapperStyle]}>
				<Text style={[styles.iconText, iconTextStyle]}>+</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		flex: 1,
		borderRadius: 13,
		borderWidth: 2,
		borderColor: '#b2b2b2',
	},
	iconText: {
		color: '#b2b2b2',
		fontSize: 16,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
});

export default CustomActions;
