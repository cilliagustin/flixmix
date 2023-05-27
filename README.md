![Logo Image](./src/assets/flixmix_purple.png)
# FlixMix

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