# Memory Keeper

Memory Keeper a daily journal built on Rails and PostgreSQL with a React.js front end that allows
users to answer daily questions, look back on previous answers, and add memories, links, and photos.

### Features

- 365 daily questions to answer
- The ability to add, edit, and delete memories, links, and photos
- Create accounts using Devise or log in with a Fitbit account (uses the [Fitgem_OAuth2](https://github.com/gupta-ankit/fitgem_oauth2))
- View daily Fitbit data pulled from the Fitbit API
- View bestsellers pulled from the New York Times API
- Uses [React Router](https://github.com/ReactTraining/react-router) to navigate between pages
- Calendar uses [React-DatePicker](https://github.com/Hacker0x01/react-datepicker)
- Photo uploads use [React-Dropzone](https://github.com/okonet/react-dropzone) and [SuperAgent](https://github.com/visionmedia/superagent) to save images to Cloudinary

### Future Development

I have a lot of ideas for what I could do with this app. Here's what's next on my list:
- Create index pages for memories, links, and photos, so you can see everything you added without looking at individual days
- Add more tests, specifically tests for the React components
- Add buttons for next day and previous day
- Optimize the display for use on mobile devices
- Explore other social media APIs to incorporate

## Deployment

This app can be viewed at https://wwww.memory-keeper.herokuapp.com

![Build Status](https://codeship.com/projects/80975840-c931-0134-9c9f-3a0fd8dae151/status?branch=master)
![Code Climate](https://codeclimate.com/github/marjielam/memory-keeper.png)
<!-- ![Coverage Status](https://coveralls.io/repos/marjielam/memory-keeper/badge.png) -->
![Coverage Status](https://coveralls.io/repos/github/marjielam/memory-keeper/badge.svg?branch=master)
