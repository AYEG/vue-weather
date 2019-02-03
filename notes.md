# Weather App
Built in VueJS with Quasar-Framework 0.17.23

# Run Instructions 
- download the project
- cd into vue_weather
- sign up for an api key https://openweathermap.org/current 

Open a terminal and run the following command
$ export API_KEY=<your-openweathermap-api-key>

Check if the key is correct and available to the environment by running
$ echo $API_KEY

Start the app
$ quasar dev

- quasar.conf.js has been configured to import API_KEY, 
Example:https://quasar-framework.org/guide/app-quasar.conf.js.html#Example-setting-env-for-dev-build

# Notes: 

#  NPM Packages that were used
eslint
vuevalidate
dotenv
ts-loader (enable webpack to import .ts files)

# Typescript Config 
example used: https://github.com/kevinmarrec/quasar-typescript/blob/master/quasar.conf.js

# Icons
quasar default material icons can be found here: https://material.io/tools/icons/?style=round 

- Loading weather icons into quasar https://quasar-framework.org/components/icons.html 
1. Create a new project at https://icomoon.io and add 'meteocons' from the available libraries
2. Open/Load the project, select all and generate fonts. 
3.  Download the project 
4. Unpacked icomoon folder 
5. Rename style.css to icomoon.css
6. Add icomoon in quasar.conf
7. Navigate to node_modules/quasar-extras and copy the icomoon folder to that location 
8. Use the icons in your component <q-icon name="ICON"> 

# Looking up icon names based on day/night + their short-code
1.  using a json file to find the icon names from their associated short-codes i.e. https://gist.github.com/tbranyen/62d974681dea8ee0caa1
2.  imported the json file into the project i.e. 
import * as icons from '../../assets/icons.json' 
const weatherIcons = (<any>icons).default;' 
( note : set   "resolveJsonModule": true and "esModuleInterop": true in tsconfig to enable json imports in TS)

# Other 
- Typescript compiler and sfc.d.ts
support for .vue and .json file type was declared in sfc.d.ts by using vuetype
