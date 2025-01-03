import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({
	wrapperStyle,
	iconTextStyle,
	onSend,
	storage,
	userID,
	userName,
}) => {
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
				onSend([{
					user: { _id: userID, name: userName},
					createdAt: new Date(),
					location: {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					},
				}]);
			} else Alert.alert('Error occured while getting location');
		} else Alert.alert('Location permission required');
	};

	const generateReference = (uri) => {
		const timeStamp = new Date().getTime();
		const imageName = uri.split('/').pop(); // Get the last part of the URI
		return `${userID}-${timeStamp}-${imageName}`;
	};

	// Function to upload an image to Firebase Storage and send its URL
	const uploadAndSendImage = async (imageURI) => {
		const uniqueRefString = generateReference(imageURI);
		const newUploadRef = ref(storage, uniqueRefString);
		const response = await fetch(imageURI);
		// Convert the image data into a Blob
		const blob = await response.blob();
		uploadBytes(newUploadRef, blob).then(async (snapshot) => {
			const imageURL = await getDownloadURL(snapshot.ref);
			onSend([{ 
				user: { _id: userID, name: userName},
				createdAt: new Date(),
				image: imageURL 
			}]);
		});
	};

	// Function to pick an image from the device's media library
	const pickImage = async () => {
		let permissions =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissions?.granted) {
			let result = await ImagePicker.launchImageLibraryAsync();
			if (!result.canceled)
				await uploadAndSendImage(result.assets[0].uri);
		} else Alert.alert("Permissions haven't been granted.");
	};

	// Function to take a photo using the device's camera
	const takePhoto = async () => {
		let permissions = await ImagePicker.requestCameraPermissionsAsync();
		if (permissions?.granted) {
			let result = await ImagePicker.launchCameraAsync();
			if (!result.canceled)
				await uploadAndSendImage(result.assets[0].uri);
		} else Alert.alert("Permissions haven't been granted.");
	};

	return (
		<TouchableOpacity style={styles.container} onPress={onActionPress}>
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
