REACT NATIVE TEMPLATE

This project is made to start easily a new React Native EXPO app.
This app is an EXPO MANAGED WORKFLOW app

---

## Here is the list of IMPLEMENTED features :

- Architecture
- Navigation (bottom tab navigator)
- Connected / Disconnected redirection
- API connection
- Context example for user
- prettier + eslint
- translations with I18n.js
- Expo push notifications
- deep linking and redirection in app
- Forms management with Formik (for example in "LoginPage.js" with "login" function) => Formik handles input values, fields error, loading states, ...

---

## Here is what you have TO DO when you start new app :

<!-- initalization -->

- install Expo (https://docs.expo.io/get-started/installation/)
- run "yarn install"
- run "expo install" to install node_modules
- run "expo start" to run app

<!-- Customization -->

- Change app name. (in app.json > edit "name")
- Change app slug. (in app.json > edit "slug")
- Change app scheme. (in app.json > edit "scheme")
- Change app icon. (in app.json > edit "icon" + android.adaptiveIcon)
- Change splash screen. (in app.json > edit "splash")
- You can change bottom tab style, header style, paper theme, and all view styles in AppStyle.js
- Use and edit Fonts.js to customize text components
- All view and components alignments are in "Alignments.js"

<!-- API -->

- Edit API_URL in .env files
- Edit the "loginUser" function to call your login WS. (in file "UserApi.js" ) ("loginUser" is an example)

<!-- Navigation -->

- Edit existing pages
- New pages have to be added in AppNavigator.js return

<!-- Notifications -->

- Add api WS to associate push notification token to user (in notifications.js)
- Edit color and icon for push notifications (in app.json in "notification" add "color" and "icon")
- Handle notification redirection with path => add path in "RoutesNames.js" inside "APP_PATH_URL" (if you want to pass params to navigation you can get it from notification's data and pass it in function NavigationService.navigate() in "notifications.js")
  To test push notification with redirection to Page4: get push token in log where "==EXPO PUSH TOKEN==>" > go to "https://expo.io/notifications" > complete your Expo push token > in Data (JSON), write "{"path":"app-stack/page4"}" > then click on "Send a Notification" and it will appear on your device (Does not work on emulator)

<!-- Forms -->

- Edit style of forms components if needed. You can access all form components in folder src/components/formik

---

## TODO list to improve this template :

- add Formik (https://formik.org/docs/guides/react-native) for forms management
