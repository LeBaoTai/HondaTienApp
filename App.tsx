import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider } from './app-context/app.context';
import AppNavigation from './components/navigation/app.navigation';
import { GUERRILLA_REGULAR, INTER_REGULAR, LOBSTER_REGULAR } from './utils/const';
import * as Network from 'expo-network';
import { Alert, BackHandler, Platform } from 'react-native';
import LoadingModal from './components/review/modal/loading';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);

export default function App() {
	const [networkInfo, setNetworkInfo] = useState(null);
	const [loaded, error] = useFonts({
		[INTER_REGULAR]: require('./assets/fonts/Inter-Regular.ttf'),
		[GUERRILLA_REGULAR]: require('./assets/fonts/ProtestGuerrilla-Regular.ttf'),
		[LOBSTER_REGULAR]: require('./assets/fonts/Lobster-Regular.ttf'),
	});

	useEffect(() => {
		const checkNetwork = async () => {
			try {
				const networkState = await Network.getNetworkStateAsync();
				setNetworkInfo(networkState);

				// If no network connection, show an alert and exit the app
				if (!networkState.isConnected) {
					Alert.alert(
						'Không có kết nói mạng',
						'Bật wifi hay 4g sau đó mở lại ứng dụng!',
						[
							{ text: 'OK', onPress: () => exitApp() }
						],
						{ cancelable: false }
					);
				}
			} catch (error) {
				console.error('Error fetching network state:', error);
			}
		};

		checkNetwork();
	}, []);

	// Function to exit the app
	const exitApp = () => {
		if (Platform.OS === 'android') {
			BackHandler.exitApp(); // Exits the app on Android
		} else {
			// For iOS, there's no API to exit the app programmatically
			console.log('Exiting app not supported on iOS.');
		}
	};

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
			<AppProvider>
				<LoadingModal />
				<NavigationContainer>
					<AppNavigation />
				</NavigationContainer>
			</AppProvider>
		</SafeAreaView>
	);
}