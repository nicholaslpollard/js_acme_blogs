//Nicholas POllard
//INF 651 VB
//Final Project

/* 
  Function #1, recieves 3 parameters (HTML Element with default value p, 
  test content of element + empty string, and class name)
*/
function createElemWithText(elem = 'p', textContent = '', className) {
	// Create HTML element
	const element = document.createElement(elem);

	// Set text content 
	element.textContent = textContent;

	// Assign class name to the element
	if (className) {
		element.className = className;
	}

	// Return the created element
	return element;
}

// Function #2, recieves users JSON data as parameter and assigns them to variables
function createSelectOptions(users) {
	// If no user data is available, return undefined
	if (!users) {
		return undefined;
	}

	// Create an array to hold option elements
	const optionsArray = [];

	// Loop through user data and create a new option element for each user
	users.forEach(user => {
		const option = document.createElement('option');

		// Assign user.id to the option.value
		option.value = user.id;

		// Assign user.name to the option.textContent
		option.textContent = user.name;

		// Create array of user data
		optionsArray.push(option);
	});

	// Return array of options elements
	return optionsArray;
}

// Function #3, toggle the visibility of the comment section, recieves postId as parameter
function toggleCommentSection(postId) {
	// Check if postId is provided
	if (!postId) {
		return undefined;
	}

	// Select the section element with the data-post-id attribute equal to the postId received
	const section = document.querySelector(`section[data-post-id='${postId}']`);

	// Verify the section exists before attempting to access the classList property
	if (section) {
		// Toggles the class 'hide' on the section element
		section.classList.toggle('hide');
	}

	// Return the section element
	return section;
}

// Function #4, toggle the text of the comment button, recieves postId as parameter
function toggleCommentButton(postId) {
	// Check if postId is provided
	if (!postId) {
		return undefined;
	}

	// Select the button element with the data-post-id attribute matching the provided postId
	const button = document.querySelector(`button[data-post-id='${postId}']`);

	if (button) {
		// If button is "Show Comments", switch to "Hide", and vice versa (ternary statement)
		button.textContent = button.textContent === 'Show Comments' ? 'Hide Comments' : 'Show Comments';
	}

	// Return the button element
	return button;
}


// Function #5, delete child elements, recieves a parent element as parameter
function deleteChildElements(parentElement) {
	// Check if parentElement is provided and is a valid HTML element
	if (!parentElement || !(parentElement instanceof HTMLElement)) {
		return undefined;
	}

	// Define a child variable as parentElement.lastElementChild
	let child = parentElement.lastElementChild;

	// While the child exists
	while (child) {
		// Use parentElement.removeChild to remove the child in the loop
		parentElement.removeChild(child);
		// Reassign child to parentElement.lastElementChild in the loop
		child = parentElement.lastElementChild;
	}

	// Return the parentElement
	return parentElement;
}


// Function #6, add event listeners to buttons
function addButtonListeners() {
	// Select all buttons nested inside the main element
	const buttons = document.querySelectorAll('main button');

	// If buttons exist, loop through the NodeList of buttons
	if (buttons) {
		buttons.forEach(button => {
			// Get the postId from the button.dataset.postId
			const postId = button.dataset.postId;

			// If a postId exists, add a click event listener to the button
			if (postId) {
				button.addEventListener('click', (event) => {
					toggleComments(event, postId);
				});
			}
		});
	}

	// Return the buttons elements which were selected
	return buttons;
}

// Function #7, remove event listeners from all buttons nest inside the main element
function removeButtonListeners() {
	const buttons = document.querySelectorAll('main button');

	// Loop through the NodeList of buttons
	buttons.forEach(button => {
		// Get the postId button.dataset.postId
		const postId = button.dataset.postId;

		// If a postId exists, remove the click event listener from the button
		if (postId) {
			button.removeEventListener('click', (event) => {
				toggleComments(event, postId);
			});
		}
	});

	// Return the buttons selected
	return buttons;
}

// Function #8, using createElemWithText function, recieves JSON comments data as parameter
function createComments(comments) {
	// Check if comments parameter is provided
	if (!comments) {
		return undefined;
	}

	// Create a document fragment to hold the comments
	const fragment = document.createDocumentFragment();

	// Loop through the comments
	comments.forEach(comment => {
		// Create an article element
		const article = document.createElement('article');

		// Create an h3 element with comment name
		const h3 = createElemWithText('h3', comment.name);

		// Create a paragraph element with comment body
		const body = createElemWithText('p', comment.body);

		// Create a paragraph element with "From: email"
		const email = createElemWithText('p', `From: ${comment.email}`);

		// Append the h3 and paragraphs to the article element
		article.appendChild(h3);
		article.appendChild(body);
		article.appendChild(email);

		// Append the article element to the fragment
		fragment.appendChild(article);
	});

	// Return the fragment element
	return fragment;
}


// Function #9, Depends on the createSelectOptions function, recieves users JSON data as parameter
function populateSelectMenu(users) {
	// Check if users data is provided
	if (!users) {
		return undefined;
	}

	// Select the #selectMenu element by id
	const selectMenu = document.getElementById('selectMenu');

	// Passes the users JSON data to createSelectOptions and receives an array of option elements from createSelectOptions
	const options = createSelectOptions(users);

	// Loop through the options elements and append each option element to the select menu
	if (options) {
		options.forEach(option => {
			selectMenu.appendChild(option);
		});
	}

	// Return the selectMenu element
	return selectMenu;
}


// Function #10, fetch users data from https://jsonplaceholder.typicode.com/ with async function and try/catch
async function getUsers() {
	try {
		//  Uses the fetch API to request all users
		const response = await fetch('https://jsonplaceholder.typicode.com/users');

		// Await the users data response and returns the JSON data
		return await response.json();
	} catch (e) {
		console.error('Error fetching users:', e);
	}
}

// Function #11, fetch posts data for a specific user id from https://jsonplaceholder.typicode.com/
// Using async and try/catch
async function getUserPosts(userId) {
	// Check if userId is provided
	if (!userId) {
		return undefined;
	}

	try {
		// Await and fetch API for posts by userId
		const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

		// Await the response and return the JSON data
		return await response.json();
	} catch (e) {
		console.error('Error fetching posts:', e);
	}
}


// Function #12, fetch specific user id, recieves user id as parameter
async function getUser(userId) {
	// Check if userId is provided
	if (!userId) {
		return undefined;
	}

	try {
		// Await and fetch API for a specific user by userId
		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

		// Await the response and return the JSON data
		return await response.json();
	} catch (e) {
		console.error('Error fetching user data:', e);
	}
}


// Function #13, fetch comments for a specific post id, recieves post id as parameter
async function getPostComments(postId) {
	// Check if postId is provided
	if (!postId) {
		return undefined;
	}

	try {
		// Fetch comments for the specific post id from https://jsonplaceholder.typicode.com/
		const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

		// Await the response and return the JSON data
		return await response.json();
	} catch (e) {
		console.error('Error fetching comments:', e);
	}
}


// Function #14, async function that receives postId as a parameter
async function displayComments(postId) {
	// Check if postId is provided
	if (!postId) {
		return undefined;
	}

	// Creates a section element with document.createElement()
	const section = document.createElement('section');

	// Sets an attribute on the section element with section.dataset.postId
	section.dataset.postId = postId;

	// Adds the classes 'comments' and 'hide' to the section element
	section.classList.add('comments', 'hide');

	// Creates a variable comments equal to the result of await getPostComments(postId);
	const comments = await getPostComments(postId);

	// Creates a variable named fragment equal to createComments(comments)
	const fragment = createComments(comments);

	// Append the fragment to the section
	section.appendChild(fragment);

	// Return the section element
	return section;
}


// Function #15, async function, receives posts JSON data as parameter
async function createPosts(posts) {
	// Check if posts data is provided
	if (!posts) {
		return undefined;
	}

	// Create a fragment element with document.createDocumentFragment()
	const fragment = document.createDocumentFragment();

	// Loop through the posts data
	for (const post of posts) {
		// Create an article element with document.createElement()
		const article = document.createElement('article');

		// Create an h2 element with the post title
		const h2 = createElemWithText('h2', post.title);
		// Create a p element with the post body
		const body = createElemWithText('p', post.body);
		// Create another p element with text of `Post ID: ${post.id}`
		const postId = createElemWithText('p', `Post ID: ${post.id}`);
		// Create a button with the text 'Show Comments'
		const button = createElemWithText('button', 'Show Comments');
		// Set an attribute on the button with button.dataset.postId = post.id
		button.dataset.postId = post.id;

		// Define an author variable equal to the result of await getUser(post.userId)
		const author = await getUser(post.userId);
		// Create another p element with text of `Author: ${author.name} with ${author.company.name}`
		const authorInfo = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
		// Create another p element with the author’s company catchphrase.
		const catchPhrase = createElemWithText('p', `Catchphrase: "${author.company.catchPhrase}"`);

		// Append the h2, paragraphs, button, and section elements you have created to the article element.
		article.appendChild(h2);
		article.appendChild(body);
		article.appendChild(postId);
		article.appendChild(authorInfo);
		article.appendChild(catchPhrase);
		article.appendChild(button);

		// Create a variable named section equal to the result of await displayComments(post.id);
		const section = await displayComments(post.id);
		// Append the section element to the article element
		article.appendChild(section);

		// Append the article element to the fragment
		fragment.appendChild(article);
	}

	// Return the fragment element
	return fragment;
}


// Function #16, async function, recieves posts data as parameter
async function displayPosts(posts) {
	// Select the main element
	const main = document.querySelector('main');

	// Defines a variable named element that is equal to: 
	// IF posts exist the element returned from await createPosts(posts)
	const element = posts ? await createPosts(posts)
		//IF post data does not exist create a paragraph element that is identical to the default paragraph found in the html file
		: createElemWithText('p', 'No posts available.');

	// Append the element to the main element
	main.appendChild(element);

	// Return the element variable
	return element;
}

// Function #17,  Receives 2 parameters: event from the click event listener and postId
function toggleComments(event, postId) {
	// Set the event.target.listener = true
	event.target.listener = true;

	// Passes the postId parameter to toggleCommentSection()
	const section = toggleCommentSection(postId);
	// Passes the postId parameter to toggleCommentButton()
	const button = toggleCommentButton(postId);

	/*
	Return an array containing the section element returned from
	toggleCommentSection and the button element returned from toggleCommentButton: [section, button]
	*/
	return [section, button];
}

// Function #18 - Refresh posts when data is provided
async function refreshPosts(posts) {
	// If no posts data is received, return undefined
	if (!posts) {
		return undefined;
	}

	// Call removeButtonListeners to remove any existing listeners
	const removeButtons = removeButtonListeners();

	// Call deleteChildElements with the main element passed in as the parameter
	const main = document.querySelector('main');
	const mainElement = deleteChildElements(main);

	// Passes posts JSON data to displayPosts and awaits completion
	// Result of displayPosts is a document fragment
	const fragment = await displayPosts(posts);

	// Call addButtonListeners, result is buttons returned from function
	const addButtons = addButtonListeners();

	// Return an array of the results from the functions called: [removeButtons, main, fragment, addButtons]
	return [removeButtons, main, fragment, addButtons];
}


// Function #19, async function, automatically receives the event as a parameter
async function selectMenuChangeEventHandler(event) {
	// Check if the event parameter is provided
	if (!event) {
		return undefined; // Return undefined if no event is passed
	}

	// Disable the select menu during the fetching process
	const selectMenu = document.getElementById('selectMenu');
	selectMenu.disabled = true;

	// Define userId, set to event.target.value or fallback to 1
	const userId = event.target.value || 1;

	// Fetch posts for the selected userId
	const posts = await getUserPosts(userId);

	// Refresh the posts with the fetched data
	const refreshPostsArray = await refreshPosts(posts);

	// Re-enable the select menu after the operation
	selectMenu.disabled = false;

	// Return an array containing the userId, posts, and the result of refreshPosts
	return [userId, posts, refreshPostsArray];
}


// Function #20, async function to initialize page data
async function initPage() {
	// Fetches all users data using getUsers function
	const users = await getUsers();

	// Populate the selectMenu with users data
	const selectMenu = populateSelectMenu(users);

	// Return an array of users and selectMenu data
	return [users, selectMenu];
}

// Function #21, async function to initialize the app
async function initApp() {
	// Call initPage and await completion
	const [users, selectMenu] = await initPage();

	// Add an event listener for change event on selectMenu
	selectMenu.addEventListener('change', selectMenuChangeEventHandler);
}

// Call initApp when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initApp);
