// Certainly! Let's enhance the GitHub API homework assignment to make it even more engaging:
//
// Homework Assignment: GitHub User Explorer
//
// Task Description:
//
//     In this assignment, you will create a dynamic web application that allows users to explore GitHub users' profiles by entering their usernames. The application will fetch data from the GitHub API and display essential information about the user.
//
// Requirements:
//
//     Set up a visually appealing webpage with an input field to enter a GitHub username and a "Search" button.
//     Write JavaScript code to handle user interactions:
//     When the user enters a GitHub username and clicks the "Search" button, fetch data from the GitHub API using the provided username.
//     Handle the response and display the user's avatar, username, bio, location, and number of followers.
// If the user does not exist or there is an error, display a friendly message indicating that the user was not found.
//     Utilize the Fetch API to make the API request and handle asynchronous operations.
//     Apply CSS to style the elements, making the webpage visually appealing and user-friendly.
//     Implement a "Random User" button that, when clicked, fetches data for a random GitHub user and displays it.
//     Bonus Points:
//
//     Implement real-time data validation for the input field to guide users on valid username formats.
//     Use animations or transitions to enhance the user experience when displaying fetched data.
//     Display the user's repositories with basic information, such as the repository name and description, as cards or a list.
// Implement responsive design to ensure the application works well on different screen sizes.

const input = document.querySelector('.page__input');
const buttonSearch = document.querySelector('.page__button--search');
const buttonRandom = document.querySelector('.page__button--random');
const pageContainer = document.querySelector('.page__result');

const users = [
    'maksvatrenko', '1', '2', 'q', 'kusochek'
]

async function fetchGitHubUser(username) {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

function createUserWrapper() {
    const userWrapper = document.createElement('div');
    userWrapper.classList.add('page__user');
    userWrapper.classList.add('user');
    return userWrapper;
}

function renderAvatar(user) {
    const avatar = document.createElement('img');
    avatar.src = user.avatar_url;
    avatar.alt = `${user.login} avatar`;
    avatar.classList.add('user__avatar');
    return avatar;
}

function renderUserName(user) {
    const username = document.createElement('p');
    username.textContent = `Name: ${user.login}`;
    username.classList.add('user__name');
    return username;
}

function renderBio(user) {
    if (!user.bio) {
        const bio = document.createElement('p');
        bio.textContent = 'Bio: -';
        return bio;
    }
    const bio = document.createElement('p');
    bio.textContent = `Bio: ${user.bio}`;
    bio.classList.add('user__bio');
    return bio;
}

function renderLocation(user) {
    if (!user.location) {
        const location = document.createElement('p');
        location.textContent = 'Location: -';
        return location;
    }
    const location = document.createElement('p');
    location.textContent = `Location: ${user.location}`;
    location.classList.add('user__location');
    return location;
}

function renderFollowers(user) {
    if (!user.followers) {
        const followers = document.createElement('p');
        followers.textContent = 'Followers: -';
        return followers;
    }
    const followers = document.createElement('p');
    followers.textContent = `Followers: ${user.followers}`;
    followers.classList.add('user__followers');
    return followers;
}

function renderUser(user) {
    const userWrapper = createUserWrapper();
    const avatar = renderAvatar(user);
    const username = renderUserName(user);
    const bio = renderBio(user);
    const location = renderLocation(user);
    const followers = renderFollowers(user);
    userWrapper.append(avatar);
    userWrapper.append(username);
    userWrapper.append(bio);
    userWrapper.append(location);
    userWrapper.append(followers);
    pageContainer.append(userWrapper);
}

function renderError() {
    const userWrapper = createUserWrapper();
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'User not found';
    errorMessage.classList.add('user__error');
    userWrapper.append(errorMessage);
    pageContainer.append(userWrapper);
}

buttonSearch.addEventListener('click', async () => {
    pageContainer.innerHTML = '';
    try {
        let user = await fetchGitHubUser(input.value);
        renderUser(user);
    } catch (e) {
        renderError();
    }
});

buttonRandom.addEventListener('click', async () => {
    pageContainer.innerHTML = '';
    let randomUsername = users[Math.floor(Math.random() * users.length)];
    try {
        let user = await fetchGitHubUser(randomUsername);
        renderUser(user);
    } catch (e) {
        renderError();
    }
});