# Savey

Savey is the lightest and simplest cloud storage app out there! It is built using Ionic 4 with Angular and Firebase.

## Installation

You can install the dependencies with Yarn or NPM. It's up to you, really!

```bash
yarn install
```
OR
```bash
npm install
```

## Running

There are plenty of ways to run an Ionic application. However, since Savey uses native specific plugins, you will need to run it on a mobile device with USB Debugging enabled, or in a emulator, like:
```bash
ionic cordova run android -l
```

## Building on Android

First, run `ionic cordova build android --release`. This will generate a release apk.

After the build, go inside the android folder and run `./gradlew bundle`. Ensure you have the Android Home defined in your PATH.

Then, run `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name`, inside the correct folder, changing the key and apk name to the desired ones.

Finally, run the `zipalign` tool like this `zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

There are some things that I want to implement, and I would definitely appreciate help with them. Here are some:

- Unit tests everywhere
- Possibility to share a file with another person, maybe with a shareable link
- Organize file by folders
- Filter files by name, extension, or date of creation

Savey aims to be very lightweight, so please be careful when installing dependencies.

## License
[MIT](https://choosealicense.com/licenses/mit/)
