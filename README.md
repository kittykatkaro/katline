# Katline - Mobile Chat App

**Katline** is a mobile chat application built with **React Native** and **Expo**. It provides users with a seamless chat experience where they can send messages, share images, and their location. The app uses **Google Firebase** for real-time data storage and authentication.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Running the App](#running-the-app)
5. [Project Screens](#project-screens)

---

## Features

- **Chat Functionality**: Send real-time text messages.
- **Image Sharing**: Share images from your device's gallery or capture new ones.
- **Location Sharing**: Send your current location displayed in a map view.
- **Offline Support**: Messages are available locally even without an internet connection.
- **Anonymous Authentication**: Users are authenticated via Firebase anonymously.
- **Accessibility**: Compatible with screen readers for enhanced usability.

---

## Technologies Used

- **React Native**
- **Expo**
- **Gifted Chat** (Chat UI library)
- **Google Firebase** (Firestore Database, Cloud Storage, Authentication)
- **AsyncStorage** (Local storage)

---

## Setup and Installation

Follow the steps below to set up the development environment and run the app locally:

### 1. Prerequisites

- Node.js (v14 or later)
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for Android Emulator) or Xcode (for iOS Simulator)
- Firebase account with project created

### 2. Clone the Repository

```
git clone https://github.com/kittykatkaro/katline.git
cd katline
```

### 3. Install Dependencies

Run the following command to install necessary libraries: `npm install`

   Install Expo Go (on your mobile device)

   - [iOS: Expo Go on the App Store](https://apps.apple.com/us/app/expo-go/id982107779)
   - [Android: Expo Go on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Running the App

Start the Expo development server: `npm start`

Use one of the following options to test the app:
 - Android: Scan the QR code using the Expo Go app.
 - iOS: Scan the QR code with the Camera app (Expo Go must be installed).
 - Simulator: Use an emulator (Android Studio or Xcode).

## Project Screens

![Start Screen](assets/start-screen)
![Chat Screen](assets/chat-screen)
