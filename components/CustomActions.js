import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
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
