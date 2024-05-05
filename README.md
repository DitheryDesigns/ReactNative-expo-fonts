# Steps for Setting up Fonts in Expo

## Install Dependencies

1. **Install Required Packages**:
   Run the following command in your terminal:
   ```bash
   expo install expo-splash-screen expo-font
   ```

3. **Copy Font Files**:
   Place your font file into the project directory:
   ```
   project-directory/assets/fonts/font-file.ttf
   ```

4. **Pre-load Fonts**:
   Modify `App.js` in your repository to pre-load fonts before showing the app. Make sure to replace the directory with the correct location of your font file.

   ```javascript
   import React, { useState, useEffect } from 'react';
   import { Text, View, StyleSheet } from 'react-native';
   import * as Font from 'expo-font';
   import * as SplashScreen from 'expo-splash-screen';

   export default function App() {
     const [fontsLoaded, setFontsLoaded] = useState(false);

     useEffect(() => {
       async function loadFonts() {
         try {
           await SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from hiding
           await Font.loadAsync({
             'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
             // You can load multiple fonts here
           });
           setFontsLoaded(true);
         } catch (e) {
           console.warn(e);
         } finally {
           await SplashScreen.hideAsync(); // Hide the splash screen after fonts are loaded
         }
       }

       loadFonts();
     }, []);

     if (!fontsLoaded) {
       return null; // Return null or a loading component until fonts are loaded
     }

     return (
       <View style={styles.container}>
         <Text style={{ fontFamily: 'Lobster-Regular', fontSize: 24 }}>Hello, custom font!</Text>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
     },
   });
   ```

5. **Setup for Web Applications**:
   If creating a web app in React Native, you will need to use polyfills for some functionality to work as expected.
   - **Install Polyfill**:
     ```bash
     expo install crypto-browserify
     ```
        - Note: This is the only polyfill required for my setup. If more are needed, additional information on polyfills can be found in the relevant section below.

   - **Create webpack config file with fallback**:
    If you don't already have a `webpack.config.js` in your project directory, create one.
    Import Expo's default Webpack config and modify it to include your polyfills.
    Here’s an example of how you might set this up:
    ```javascript
    const createExpoWebpackConfigAsync = require('@expo/webpack-config');

    module.exports = async function(env, argv) {
      const config = await createExpoWebpackConfigAsync(env, argv);

      // Add a fallback for the crypto module
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback.crypto = require.resolve('crypto-browserify');

      return config;
    };
    ```

    This configuration ensures that whenever something requires crypto, crypto-browserify is used if crypto is not found in list of dependencies (A fallback).

6. **Run Your Project**:
   ```bash
   npm run web
   ```

7. **Check the Display**:
   Your custom font should now be displayed correctly across your application in Web/Android/iOS

---

# Polyfill Information

## What is a Polyfill?

In the context of React Native, polyfills serve a slightly different purpose. React Native is a framework for building native apps using JavaScript and React. Unlike web browsers, React Native does not have a global standard for what features are available in its JavaScript runtime. React Native's runtime is built on top of JavaScriptCore (for iOS) and has different implementations for Android, which may lead to discrepancies in JavaScript API support between these platforms.

For instance, React Native does not natively include all Node.js modules and APIs that might be used in a typical Node.js application or in a web environment using similar technologies. If a developer wants to use certain Node.js features, like the crypto module or other specific APIs that are not supported out of the box in React Native, they would need to use polyfills or alternative packages that simulate these features.

Polyfills in React Native might involve:

- Shimming Node.js modules: Using third-party libraries that replicate Node.js functionality, such as crypto-browserify for cryptographic functions.
- Adding missing APIs: For example, if certain newer JavaScript APIs are not supported by default in React Native's environment, developers can introduce polyfills to add these APIs, ensuring their apps can use modern JavaScript conveniences regardless of the native support from the JavaScript engine.

## Managing Polyfills
Considerations for using polyfills:
- Performance considerations: While polyfills are incredibly useful, they do add additional code to your project. This can impact performance, especially if many polyfills are used. It’s important for developers to include only necessary polyfills and test the performance impact.
- Maintenance: As browsers and the React Native environment evolve, the need for certain polyfills may diminish as features become natively supported. Developers need to keep their polyfill usage up-to-date and phase out unnecessary polyfills to keep the codebase clean and efficient.


## Polyfill Sources:

### 1. Browserify
Browserify is a development tool that allows developers to use Node.js-style modules in the browser. It includes a number of shims for Node.js core modules, which are often used as polyfills.

- **GitHub Repositories**: Many of the Browserify-compatible versions of Node modules can be found on GitHub. For example, [crypto-browserify](https://github.com/crypto-browserify/crypto-browserify) is a version of Node's `crypto` module that works in browsers.
- **Browserify Website**: Visit [Browserify](http://browserify.org/) for more information and links to the various shims that are available.

### 2. Node.js Polyfills for Webpack
For those using Webpack, there are specific configurations and plugins that automatically include polyfills for Node.js core modules when needed.

- **Webpack's Documentation**: Check the [Webpack documentation](https://webpack.js.org/) on node polyfills for how to set up your Webpack configuration to automatically polyfill Node.js modules in your project.
- **npm**: Search for packages with names like `*-browserify` or `*-webpack`. These are typically polyfills or shims intended to replace Node modules in web environments.

### 3. GitHub and npm
Searching directly on GitHub or npm can yield a variety of polyfills. For example, searching for “crypto polyfill” or “stream polyfill” on npm

 returns libraries designed to mimic these Node.js modules in non-Node environments.

- **npm Website**: Use the search bar on [npm's website](https://www.npmjs.com/) to find packages like `stream-browserify`, `crypto-browserify`, and others.
- **GitHub Search**: Use GitHub's search feature to find repositories providing polyfills by searching for "node polyfills" or "browserify [module name]".

### 4. Polyfill.io
Polyfill.io is a service that automatically serves over the internet the polyfills and code that browsers need to keep websites functioning across all browsers. While it's mostly for web APIs, it's a useful reference for understanding what can be polyfilled.

- **Polyfill.io**: Visit [Polyfill.io](https://polyfill.io/v3/) to explore available polyfills.
