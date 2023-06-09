![Logo Image](./src/assets/flixmix_purple.png)
# FlixMix

[Live Link](https://agustin-cilli-flixmix.herokuapp.com/)

This code repository hosts the FlixMix application's user interface. To view the Django REST Framework back end repository click [here](https://github.com/cilliagustin/flixmix_rest_api) or click [here](https://agustin-cilli-flixmix-api.herokuapp.com/) for the deployed back end site.

![Live site preview image](./documentation/amiresponsive/amiresponsive.png)


FlixMix is a comprehensive movie database created for passionate film enthusiasts. This user-friendly platform offers a seamless experience for users to explore and discover a vast collection of movies. Whether you're searching for a specific film or looking for inspiration, FlixMix has you covered. With intuitive search options such as title, cast, release, and directors, users can quickly find the movies they're interested in. The database provides detailed information on each film, including plot summaries, genres, and more, ensuring that users have access to comprehensive movie details.

One of the key features of FlixMix is the ability for users to actively engage with the platform. Users can share their thoughts and insights by writing reviews and assigning ratings to the movies they've watched, helping others make informed decisions. Additionally, users can curate personalized lists of movies, allowing them to create collections based on their preferences and share them with the community. By marking movies as seen or adding them to their watchlist, users can keep track of their movie-watching journey.

FlixMix fosters a sense of community and interaction among users. It enables users to comment on other users' lists and reviews, facilitating discussions and the exchange of opinions. Furthermore, users can follow other users and stay updated on their activity, promoting the discovery of new movies and the formation of connections with like-minded individuals.

Experience the captivating world of movies with FlixMix. Join today to explore an extensive movie database, engage with the community, and enhance your cinematic journey.

## UX


FlixMix boasts a sleek and modern design that enhances the user experience. The website adopts a light color palette, creating a clean and visually pleasing interface. Color accents are strategically used to highlight important elements, providing visual cues to guide users' attention. This ensures that key features and actions stand out when needed, making the navigation intuitive and user-friendly.

Given that FlixMix primarily revolves around lists of movies, comments, reviews, and user-created lists, the design utilizes a card-based layout. Each card presents essential information about the element, allowing users to preview basic details before delving into the dedicated page. This approach enables users to quickly assess the content and make informed decisions about what they want to explore further.

To enhance the dynamic nature of the website, FlixMix implements infinite scroll functionality. This feature allows users to seamlessly fetch additional content as they scroll vertically or horizontally, ensuring a fluid and continuous browsing experience. It eliminates the need for manual pagination and enables users to effortlessly access an extensive collection of movies and related information.

The design also incorporates informative tooltips and hover effects on various buttons. For instance, when users search for movies and apply filters, the buttons dynamically display relevant information, giving users visibility into the applied filters. This feature provides an interactive and informative element, helping users better understand the current context and their ongoing actions.

### Colour Scheme

![screenshot](documentation/colors/colors.png)

The color palette of the FlixMix website features a harmonious combination of shades to create an engaging and visually appealing experience. The background is set in a light gray tone, represented by rgb(238, 238, 238), which provides a clean and neutral foundation for the content.

For the majority of the cards, purple gradients are utilized as the background color as well as in the sidebar. These purple hues contribute to a consistent theme throughout the website, creating a cohesive and visually pleasing design.

To ensure optimal legibility, the text within the cards is typically presented in either white or a translucent white. When the background color of the card is predominantly white, the text is often displayed in rgb(116, 116, 116) or rgb(50, 49, 49), depending on the level of emphasis required. This contrast between the background and text colors helps to enhance readability and maintain a visually pleasing balance.

In cases where error alerts are displayed, shades of yellow are employed. These include rgb(148, 114, 49) and rgb(60, 46, 20). The use of these warm yellow tones helps to draw attention to important notifications or error messages, ensuring they stand out from the rest of the interface.

Additionally, certain icons that indicate active status are presented in white or rgb(145, 246, 148), which is a light green shade. These icons serve as visual indicators to inform users about the current state or functionality, contributing to a more intuitive and interactive user experience.

I've used CSS `:root` variables to easily update the global colour scheme by changing only one value, instead of everywhere in the CSS file.

```css
:root{
    --purple-1: rgb(102, 99, 255);
    --purple-2: rgb(143, 141, 255);
    --purple-3: rgb(148, 145, 246);
    --purple-4: rgb(152, 149, 237);
    --purple-5: rgb(187, 186, 243);
    --white-1: rgb(245, 245, 245);
    --white-2: rgb(238, 238, 238);
    --translucid-white: rgba(238, 238, 238, 0.8);
    --black: rgb(18,18,18);
    --grey-1: rgb(116,116,116);
    --grey-2:rgb(50, 49, 49);
    --gradient: 
        linear-gradient(to right bottom, rgba(141, 177, 255, 0.7), rgba(217, 141, 255, 0.29)),
        linear-gradient(to right top, rgba(255, 141, 255, 0.4), rgba(255, 141, 145, 0.1) 40%),
        linear-gradient(to right, var(--purple-3), var(--purple-3));
    --gradient-2: 
        linear-gradient(to bottom, var(--purple-3) 70px, rgba(148, 145, 246, 0) 150px),
        var(--gradient);
    --gradient-3: 
        radial-gradient(at bottom left , rgba(158, 255, 141, 0.2), rgba(141, 255, 236, 0.1) 50%, rgba(141, 255, 236, 0) 80%),
        linear-gradient(to right bottom, rgba(141, 177, 255, 0.7), rgba(217, 141, 255, 0.29)),
        radial-gradient(at top right , rgba(255, 141, 255, 0.4), rgba(255, 141, 145, 0.1) 40%),
        linear-gradient(to right, var(--purple-2), var(--purple-2));
    --gradient-4: 
        linear-gradient(to bottom, var(--purple-3) 25%, rgba(148, 145, 246, 0) ),
        radial-gradient(at bottom left , rgba(158, 255, 141, 0.2), rgba(141, 255, 236, 0.1) 50%, rgba(141, 255, 236, 0) 80%),
        linear-gradient(to right bottom, rgba(141, 177, 255, 0.7), rgba(217, 141, 255, 0.29)),
        radial-gradient(at top right , rgba(255, 141, 255, 0.4), rgba(255, 141, 145, 0.1) 40%),
        linear-gradient(to right, var(--purple-2), var(--purple-2));
}
```

### Typography

The site uses a mix of fonts to create a unique and modern look. These are provided by [Google Fonts](https://fonts.google.com/). The default font is [Open Sans](https://fonts.google.com/specimen/Open+Sans), which provides a clean and versatile base. [Poppins](https://fonts.google.com/specimen/Poppins) is mainly used in titles or links. The bold version (font weight of 700) pops in contrast with Open Sans, really emphasizing these texts. [Work Sans](https://fonts.google.com/specimen/Work+Sans) is used for the sidebar as well as for certain titles that are not as prominent as the main ones on a page and as the main font in the Custom Alert component. These font choices work together to create a cohesive and visually appealing design.
These deliberate font choices contribute to creating a visually appealing and consistent design.

[Font Awesome](https://fontawesome.com/) is also used to add different icons throughout the website

## User Stories

The user stories were broken down with 3 types of users in mind: "users" (non-registered users who can access the website), "Registered Users," and "Site Admins."

### Regular users (non registered)
- As a User I can always see a navbar so that I can navigate though the website
- As a User I can navigate without refreshing so that have a quicker and better experience
- As a User I can create an accound and log in so that access all the website features
- As a User I can see the movie information so that get the synopsis, title and basic information of the film
- As a User I can view all posts so that see all movies in the database
- As a User I can search a movie by title so that easily find the movie im looking for
- As a User I can filter the movies based on the cast, director, genre or release decade so that I can find movies based on specific parameters
- As a User I can keep scrolling when looking for a movie so that I dont need to use pagination to get more movies
- As a User I can see how many Registered users marked this movie as seen or added it to a watchlist so that i can tell how popular is the movie
- As a User I can read Reviews of other users so that I can hear other people opinions and how they rank a specific movie
- As a user, I can see lists created by other users so that I can discover new movie suggestions and see how other users have grouped movies
- As a user, I can search for a list by name so that I can quickly find a list that matches my interests.
- As a user, I can view other users' activity to see their new lists, reviews, and comments

### Registered Users
- As a Registed User I can see some indication that I am curretly logged in so that easily tell my logged status
- As a Registered User I can maintain my logged in status until i log out so that control this status myself
- As a Registed User I can have links to log in/log out according to my status so that I am not redirected no an unnecesary link
- As a Registered User I can view my avatar in the navbar so that easily identify my account
- As a Registered User I can add a movie to the database so that other users can see the movie information
- As a Registered User I can mark a movie as seen or add it to my future watchlistt so that keep a log of what movies i have and haven´t seen yet
- As a registered user, I can write a review of a movie to share my thoughts and impressions with others
- As a registered user, I can update a review I wrote so that i can correct it if I made a mistake or want to add more details
- As a registered user, I can delete a review I wrote if I change my mind about my opinion or want to remove it from the website
- As a registered user, I can comment on other users' movie reviews to share my thoughts and opinions
- As a registered user, I can create a list so that I can group movies according to a specific theme and share them with other users
- As a registered user, I can update a list I created so that I can correct mistakes or add new movies
- As a registered user, I can delete a list I created so that I can remove the list and its associated movies from the website
- As a registered user, I can comment on a list to share my opinion about the list's movie choices or theme
- As a registered user, I can follow another user to receive updates about their activity and new lists or reviews
- As a registered user, I can edit my comments to correct mistakes or add more information
- As a registered user, I can delete my comments so that if I change my mind about what I wrote or made a mistake, can remove it
- As a registered user, I can edit my username and password to update my account information or to increase my account security


### Site Admin
- As an Administrator of the site I can have a link to the admin panel so that easily access the admin functions
- As an Administrator of the site I can see a label that indicates this status so that easily differentiate that the logged account has special permissions
- As an admin, I can delete a movie from the database if there was a mistake or if the movie violates the website's rules
- As an admin, I can update movie information so that I can correct errors or adding missing details
- As an admin, I can access a specific panel to view users reports about movies and fix them

## Wireframes

To follow best practice, wireframes were developed for mobile, tablet, and desktop sizes.
I've used [Balsamiq](https://balsamiq.com/wireframes) to design my site wireframes.

### Index Wireframes
<details>
<summary>View Index Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-home.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-home.png) |

</details>

### Search Movies Wireframes
<details>
<summary>View Search Movies Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-search-movie.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-search-movie.png) |
</details>

### Search Reviews Wireframes
<details>
<summary>View Search Reviews Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-search-reviews.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-search-reviews.png) |
</details>

### Search Reviews Wireframes
<details>
<summary>View Search Reviews Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-search-lists.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-search-lists.png) |
</details>

### Search Reviews Wireframes
<details>
<summary>View Search Reviews Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-search-profiles.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-search-profiles.png) |
</details>

### Search Profiles Wireframes
<details>
<summary>View Search Profiles Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-search-profiles.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-search-profiles.png) |
</details>

### Create Edit Movie Wireframes
<details>
<summary>View Create Edit Movie Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-create-edit-movie.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-create-edit-movie.png) |
</details>

### Create List Wireframes
<details>
<summary>View Create List Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-create-list.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-create-list.png) |
</details>

### Movie Details Wireframes
<details>
<summary>View Movie Details Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-movie-detail.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-movie-detail.png) |
</details>

### Review Details Wireframes
<details>
<summary>View Review Details Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-review-detail.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-review-detail.png) |
</details>

### List Details Wireframes
<details>
<summary>View List Details Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-list-detail.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-list-detail.png) |
</details>

### Profile Page Wireframes
<details>
<summary>View Profile Page Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-profile.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-profile.png) |
</details>

### Log Page Wireframes
<details>
<summary>View Log Page Wireframes</summary>

| Size | Screenshot |
| --- | --- |
| Mobile | ![screenshot](documentation/wireframes/mobile-wireframe-log.png) |
| Desktop | ![screenshot](documentation/wireframes/desktop-wireframe-log.png) |
</details>


## Technologies Used

### Languages

- JSX
- CSS
- Javascript
  - React (16.18.0)

  ### Libraries, frameworks and dependencies

- [Axios:](https://axios-http.com/docs/intro) I use Axios in my code to fetch data from APIs, leveraging its simplicity and efficiency for handling HTTP requests and responses in React.
- [JWT](https://jwt.io/) I used the JWT library to decode JSON Web tokens in my application. By using JWT, I ensured that only authenticated users could access certain resources and prevented unauthorized users from making unnecessary network requests to refresh their access tokens. Additionally, I used JWT to handle scenarios where the token expired or the user logged out, ensuring a seamless and secure user experience by removing the token's timestamp from the browser.
- [React 16.18.0](https://17.reactjs.org/) I used the JavaScript library for building the interface
- [React-Bootstrap 4.6](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html) I used the react bootstrap mainy to use the Form, Row, Col, Conteiner, Tooltip coponents as well as some Bootstrap classes for spacing.
- [React Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component) I used the library to automatically fetch more data as the user scrolls (movies, reviews, lists, profiles). I modify certain rules on css to be able to implement horizontal scroll as well as displaying in a grid system certain information.
- [React Router](https://v5.reactrouter.com/web/guides/quick-start) I used this library to nable navegation across different pages without the need to refresh the page.

### Tools & Programs

### Frameworks, Libraries & Programs Used
*   [Google Fonts](https://fonts.google.com/)
    * Used to import fonts.
*   [Font Awesome](https://fontawesome.com/)
    * Used to add all icons on the website.
*   [Balsamiq](https://balsamiq.com/)
    * Used to create the wireframes.
*   [Git](https://git-scm.com/)
    * Used to deploy through the Gitpod terminal.
*   [GitHub](https://github.com/)
    * Used the GitHub pages to deploy the website.
*   [Microsoft Paint](https://apps.microsoft.com/store/detail/paint/9PCFS5B6T72H?hl=en-us&gl=US)
    * Used to edit the screenshots provided in the README and TESTING files.
*   [Coolors](https://coolors.co/)
      * Used to display palettes used for README file.
*   [Am I Responsive?](https://ui.dev/amiresponsive)
      * Used to provide responsive screenshots used at the beggining of the README file.
*   [Cloudinary](https://cloudinary.com/)
      * Used to store static files.

## Features

### Global components

#### Sidebar
- Located on the left side of the page
- Has a collapsed or open versions. This are toggeled by a button.
- On mobile the collapsed button hides then the user scrolls down and is shown when the user scrolls up.
- On mobile the collapsed version is completely closed and when is open shows the icons and texts for the links .
- On desktop the collapsed version is shows the icons and when is open shows also the texts for the links.
- The create (Movie, list) dropdown button is conditionally rendered only when the user is logged in.
- The admin panel link is conditionally rendered only when the user is logged ad an admin profile.
- The log in/register and log out buttons are rendered conditionally according to the user logged status.
- The profile avatar and username are rendered only when the user is logged in.

<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/sidebar.png) |
</details>

### Pages

#### Home Page
- Beggins displaying an image and the website logo
- Uses the MoviesPreview component to show the latest movies added to the database
- Users are able here to mark any of this movies as seen or to add them to their watchlist
- Uses the RatingsPreview component to show the latest reviews added to the database
- Uses the ListsPreview component to show the latest lists added to the database

<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/home-desktop.png) |
</details>

#### Search Movies
- The component fist has a search bar and a set of radio buttons and checkboxes. Clicking this alter states in the component and help to create a specific endpoint to look for a movie with very specific parameters
- Movies can be searched by movie title, director, cast or release decade and filtered by previously seen movies, movies in the watchlist or movies uploaded by followed users.
- The search bar can also be replaced by a dropdown option input to select a specific release decade.
- The page uses the MoviesPreview component to display all movies based on the search the user makes. if the user does not specify parameters all movies will be fetched.

<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/search-movie-desktop.png) |
</details>

#### Movie Page
- Displays information of a specific movie: title, release year, genre, synopsis, director, main cast, movie poster and average rating as well as how many people have seen, add this movie to the watchlist, reviewed them or how many times this movie appears on lists.
- A registered user can mark a movie as seen or add them to its watchlist.
- A registered user can report a movie if they find an error so the admin can fix it (using the ReportMovie component)
- A registered user can add a review of a movie.
- all the reviews of the movie are displayed here.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/movie-page-desktop.png) |
</details>

#### Movie Create Form
- In this form the user enters the movie information: title, release year, synopsis, director, main cast, genre and poster.
- If the form is not submited correctly the handleErrors helper function and the Alert component display the error.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/movie-create-desktop.png) |
</details>

#### Movie Edit Form
- In this form the admin can edit the movie information: title, release year, synopsis, director, main cast, genre and poster.
- The Component first fetches the movie information and displays it in the form.
- If the form is not submited correctly the handleErrors helper function and the Alert component display the error.

#### Search Reviews
- Originally named SearchRatingsPage to keep consistency with how the model was named on the API
- The component fist has a search bar and a set of radio buttons and a checkbox. Clicking this alter states in the component and help to create a specific endpoint to look for a review with very specific parameters.
- Reviews can  be searched by movie title and review author and filtered by profiles the user follows
- The page uses the RatingsPreview component to display all reviews based on the search the user makes. If the user does not specify parameters all reviews will be fetched.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/searchReview.png) |
</details>

#### Review Page
- Originally named RatingPage to keep consistency with how the model was named on the API
- Displays information of a specific Review: title, content, value, as well as the movie title, poster and release year.
- If the user is the owner of the review they can modify it here or delete it.
- A registered user can comment the review.
- All comments for this review are displayed here
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/reviewPage.png) |
</details>

#### Search Lists
- The component fist has a search bar and a set of radio buttons and checkboxes. Clicking this alter states in the component and help to create a specific endpoint to look for a list with very specific parameters
- Lists can be searched by list title, movie title or list author and filtered by profiles the user follows.
- The page uses the ListsPreview component to display all lists based on the search the user makes. If the user does not specify parameters all lists will be fetched.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/searchList.png) |
</details>

#### List Page
- Displays information of a specific List: title, content as well as the movies posters.
- If the user is the owner of the review they can modify it or delete it.
- A registered user can comment the list.
- All comments for this lists are displayed here
<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/list-page-desktop.png) |
</details>

#### List Create Form
- In this form the user enters the list information: title, and content.
- An input lets you search a movie by its title and display them here. clicking on one of this movies will diplay them in a previous container (encapsulating all selected movies)
- Clicking on one of the movies added to the selected movies container will remove them from the list.
- If the form is not submited correctly the handleErrors helper function and the Alert component display the error.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/list-create-desktop.png) |
</details>

#### List Edit Form
- In this form the admin or the owner can edit the list information: title and content.
- The Component first fetches the list information and displays it in the form.
- the same search input and component displays all movies for the user to select them and de select them.
- If the form is not submited correctly the handleErrors helper function and the Alert component display the error.

#### Search Profiles
- The component fist has a search bar and a set of checkboxes. Clicking this alter states in the component and help to create a specific endpoint to look for a list with very specific parameters.
- Pofiles can be searched by username and filtered by profiles the user follows or that follow them.
- The page uses the ProfilesPreview component to display all profiles based on the search the user makes. If the user does not specify parameters all profiles will be fetched.
- A registed user will see a button thet allows them to follow or unfollow the user. This are rendered conditionally and will not appear on the same users profile card.

<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/searchProfile.png)
</details>

#### Profile Page
- Displays information of the profile: username, full name and bio as well as ammount of following profiles, followers, movies they have seen or added them to the watchlist, created movies, rated movies and lists created.
- A registed user will see a button thet allows them to follow or unfollow the user. This are rendered conditionally and will not appear on the same users profile card.
- All movies the user added, reviews the user wrote and lists the user created are displayed using infinite scroll and diaplyed horizontally.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/profile-page-desktop.png)
</details>


#### Profile Edit (information) Form
- This page can only be accessed by that profile
- In this form the user edits its information: profile image, full name or bio.
- If the form is not submited correctly the handleErrors helper function and the Alert component display the error.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/editprofile.png)
</details>

#### Profile Edit (username) Form
- This page can only be accessed by that profile
- In this form the user edits its username
- If the form is not submited correctly the handleErrors helper function and the Alert component display the error.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/editprofileusername.png)
</details>

#### Profile Edit (password) Form
- This page can only be accessed by that profile
- In this form the user edits its password
- If the form is not submited correctly the handleErrors helper function and the Alert component display the error.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/editprofilepassword.png)
</details>

#### Search Reports Page
- This page can only be accessed by the admin.
- Here all movie reports are created, linking the movie and displaying the message the user made. 
- If the Admin fixed the issue or decides there is no issue to solve they can close it from here
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/adminPanel.png)
</details>

#### Log Page
- This page can only be accessed by an unnergistered user.
- Here two forms are displayed
- A register form that allows to create a username or password.
- A Log in form that allows to access to the user using theirr credentials.
- If any form is not submited correctly the handleErrors helper function and the Alert component display the error.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/responsiveness/log-desktop.png)
</details>

#### Error Page
- Is displayed the user enters an invalid url.
- Allows the user to go back to the previous page
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/errorPage.png)
</details>

### Helper functions and components

#### Reports
- Allows a registered user to report a movie.
- If already reported it displays a text displaying this

#### Seen
- Allows registered users to mark a movie as seen.
- If the movie is marked as in the watchlist it deleted this (since a movie can be seen and in the wathlist at the same time)
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/seen.png)
</details>

#### Watchlist
- Allows registered users to mark a movie as watchlist.
- If the movie is marked as seen it deleted this (since a movie can be seen and in the wathlist at the same time)
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/watchlist.png)
</details>

#### Comments
- Allows registered users to comment either lists or reviews.
- A user can delete or edit the comments they wrote.
- The admin can also delete or edit any comment.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/comment.png)
</details>

#### Follow/Unfollow
- Allows registered users to follow or unfollow other registered users.
- This allows the users when looking for a  review or list to see only the ones created by users they follow. 
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/follow.png)
</details>

#### HandleErrors.js
- Here different function manipulate the erros and changes the state of activeAlert Allowing the page to display the data in an aler module.

#### Alert
- Takes the data from the handleErrors and display it in a modal.
- The modal closes itself in 5 seconds.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/alert.png)
</details>

#### Asset
- Displays a spinner or a image and a message.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/asset.png)
</details>

#### Avatar
- Displays the profile image with a link to that profile page.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/avatar.png)
</details>

#### HandleFullScreen.js
- Here different function manipulate the clicked image to get their src and alt and displays them in a full screen container so the user when clicking a poster can open it in full screen.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/browsers/edge-full-screen-modal.png)
</details>

#### RateButtons.js
- Allows a registered user to set the rating by clicking some star buttons.
- This component is used when the user need to reaview a movie. 
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/starButton.png)
</details>

#### DisplayRating.js
- Takes as parameter the average rating and displays it
- The rating can be a float number and will diplay the star percentage. If the average rating is 4.5 and fifth star will be filled in half.
<details>
<summary>Screenshot</summary>

![screenshot](documentation/screenshots/starDisplay.png)
</details>

#### UseScrollDirection.js
- Used in the sidebar.
- Tracks the croll direction to change the state when the user scroll up or down


## Future Features

Here are some features i was not able to implement yet but work well on the website:
- View all movies the user has seen or added to the watchlist on the profile page.
- When clicking a cast member or a director will link to the search movie and filter movies based on that data
- Users can modify the list movies order. Right now they are always ordered by the and cannot be changed yet.

## Agile Development Process

### GitHub Projects

[GitHub Projects](https://github.com/cilliagustin/flixmix/projects) served as a versatile Agile tool for this project, though it may not be specifically designed for this purpose. However, with proper tagging and project management, it was effectively utilized.

This platform allowed for effective planning and tracking of user stories, tasks, and project milestones through the use of a simple Kanban board, updated on a weekly basis.

![Kanban Board](./documentation/agile/board.png)

### GitHub Issues

[GitHub Issues](https://github.com/cilliagustin/flixmix/issues) served as an another Agile tool.
There, I used my own **User Story Template** to manage user stories.

It also helped with milestone iterations on a weekly basis.


- [Open Issues](https://github.com/cilliagustin/flixmix/issues)

    ![Open Issues](./documentation/agile/open-issues.png)

- [Closed Issues](https://github.com/cilliagustin/flixmix/issues?q=is%3Aissue+is%3Aclosed)

    ![Closed Issues](./documentation/agile/closed-issues.png)

## Testing

For all testing, please refer to the [TESTING.md](TESTING.md) file.

## Deployment

The live deployed application can be found deployed on [Heroku](https://agustin-cilli-flixmix.herokuapp.com/).

#### Deployment Instructions
The site was deployed to Heroku. The steps to deploy are as follows:
1. Launch the gitpod workspace.
2. Install ReactJS:
```
npx create-react-app . --use-npm
npm start
```
2. Install the following packages using the command `npm install`:
```
react-bootstrap@1.6.3 bootstrap@4.6.0
react-router-dom@5.3.0
axios
react-infinite-scroll-component
msw --save-dev
jwt-decode
```
3. Git add, commit, and push changes to gitpod.
4. Create the project app on Heroku, and link the GitHub repository by navigating to the 'Deploy' tab.

#### Connecting to the API:
1. Navigated to the Heroku app of the project DRF-API, and under the Settings tab, added the following configvars:
- Key: CLIENT_ORIGIN | Value: https://react-app-name.herokuapp.com
- Key: CLIENT_ORIGIN_DEV | Value: https://gitpod-browser-link.ws-eu54.gitpod.io
2. Check that the trailing slash `\` at the end of both links has been removed, and save the configvar pairs.
3. Install the Axios package, & create supporting `axiosDefaults.js` as shown in [Moments Walkthrough](https://learn.codeinstitute.net/courses/course-v1:CodeInstitute+RA101+2021_T3/courseware/70a8c55db0504bbdb5bcc3bfcf580080/b398c39fcbef44ca8b23dbac5e7f6067/?child=first).

#### Deploy to Heroku:
1. In the `scripts` section of `package.json` in gitpod, added the following command:
```
"heroku-prebuild": "npm install -g serve",
```
2. Add Procfile to project root & populate with the following:
```
web: serve -s build
```
3. Repeat the steps of git add/commit/push.
4. Deploy the project via the deploy button on Heroku.


### Cloning

You can clone the repository by following these steps:

1. Go to the [GitHub repository](https://github.com/cilliagustin/flixmix) 
2. Locate the Code button above the list of files and click it 
3. Select if you prefer to clone using HTTPS, SSH, or GitHub CLI and click the copy button to copy the URL to your clipboard
4. Open Git Bash or Terminal
5. Change the current working directory to the one where you want the cloned directory
6. In your IDE Terminal, type the following command to clone my repository:
	- `git clone https://github.com/cilliagustin/flixmix.git`
7. Press Enter to create your local clone.

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/cilliagustin/flixmix)

Please note that in order to directly open the project in Gitpod, you need to have the browser extension installed.
A tutorial on how to do that can be found [here](https://www.gitpod.io/docs/configure/user-settings/browser-extension).

### Forking

By forking the GitHub Repository, we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original owner's repository.
You can fork this repository by using the following steps:

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/cilliagustin/flixmix)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. Once clicked, you should now have a copy of the original repository in your own GitHub account!

## Credits

* [Letterboxd](https://letterboxd.com/) was the main influence to the concept of the website.

### Media

The images used in this project were all produced by Florencia Venditto

### Acknowledgements

- I extend my gratitude to my Code Institute mentor, [Lauren-Nicole](https://github.com/CluelessBiker), for their unwavering support during the entire project development process.

- I would like to express my appreciation to the [Code Institute](https://codeinstitute.net) tutoring team for helping me resolve some project-related issues.


