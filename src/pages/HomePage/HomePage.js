import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';
import PostList from '../../components/PostList/PostList';
import UserList from '../../components/UserList/UserList';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [gitHubLink, setGitHubLink] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Fetch user data and post data
    const fetchUserData = async () => {
        try {
            const [postsResponse, usersResponse] = await Promise.all([
                fetch('/api/posts'),
                fetch('/api/users')
            ]);
            if (!postsResponse.ok || !usersResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const postsData = await postsResponse.json();
            const usersData = await usersResponse.json();
            setPosts(postsData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchUserData();
    }, []);

    const createPost = async (postData) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(postData)
            });
            return response.json();
        } catch (error) {
            console.error('Error creating post:', error);
            throw error; // Re-throw the error to be caught by the caller
        }
    };

    const handleCreatePost = async (event) => {
        event.preventDefault();
        const postData = { projectTitle, projectDescription, gitHubLink };
        
        try {
            const newPost = await createPost(postData);
            setPosts(currentPosts => [newPost, ...currentPosts]);
            setProjectTitle('');
            setProjectDescription('');
            setGitHubLink('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
            setSearchResults(filteredUsers);
        } else {
            setSearchResults([]);
        }
    };

    // Handle clicking on a user
    const handleUserClick = (user) => {
        // Perform actions when a user is clicked, such as navigating to the user's profile page
        console.log('Clicked user:', user);
    };

    return (
        <div className={styles.homePage}>
            <h1>This is the HomePage</h1>
            <form onSubmit={handleCreatePost}>
                {/* Input fields for creating a new post */}
            </form>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for users"
            />
            {/* Render UserList only when there are search results */}
            {searchResults.length > 0 && <UserList users={searchResults} onUserClick={handleUserClick} />}
            <PostList posts={posts} />
        </div>
    );
}
