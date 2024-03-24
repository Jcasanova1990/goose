import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.scss'
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import FollowList from '../../components/FollowList/FollowList';
import ProfilePostList from '../../components/ProfilePostList/ProfilePostList';

const ensureHttps = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
};

export default function ProfilePage({user, setUser, posts}) {
    // const { userId } = useParams();
    // const [user, setUser] = useState({});
    // const [posts, setPosts] = useState([]);

    // const fetchData = async () => {
    //     try {
    //         // Fetch user data using getUser function
    //         console.log(userId)
    //         const fetchedUser = await findUser(userId);

    //         console.log(fetchedUser)
    //         setUser(fetchedUser);
    //         // Fetch all posts
    //         const fetchedPosts = await getAllPosts();
    //         setPosts(fetchedPosts);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }

    // useEffect(() => {
    //     console.log(`This is the ${userId}`)
    //     fetchData(); // Call fetchData function
    // }, [userId]); // Add id to dependency array to re-fetch data when id changes

    // const getAllPosts = async () => {
    //     try {
    //         const response = await fetch('/api/posts')
    //         const data = await response.json()
    //         return data
    //     } catch (error) {
    //         console.error(error)            
    //     }
    // }

    return (
        <>
            <div className={styles.ProfilePage}>
                <div className={styles.topContainer}>
                    <div className={styles.userContainer}>
                        <div className={styles.userHeading}>
                            <h2 className={styles.userName}>{user && user.name}</h2>
                            <div className={styles.imgContainer}>
                                <ProfileImage 
                                    className={styles.ProfileImage}
                                    user={user}                                    
                                />
                            </div>
                            <div className={styles.userLinks}>
                                {user && (
                                    <a className={styles.ghLink} href={user.gitHubLink ? ensureHttps(user.gitHubLink) : '#'} target={user.gitHubLink ? "_blank" : null}>
                                        <img className={styles.ghLogo} src='https://i.imgur.com/F796Bnt.png' />
                                    </a>
                                )}
                                {user && (
                                    <a className={styles.portfolioLink} href={user.portfolioLink ? ensureHttps(user.portfolioLink) : '#'}>
                                        <img className={styles.portfolioLogo} src='https://i.imgur.com/FZvlk3y.png' />
                                    </a>
                                )}
                            </div>
                        </div>
                        {user && user.bio && (
                            <p className={styles.userBio}>{user.bio}</p>
                        )}
                        {!user || !user.bio && (
                            <p className={styles.userBio}>No bio at this time.</p>
                        )}
                    </div>
                    <FollowList 
                        posts={posts}
                    />
                </div>
                <ProfilePostList 
                    posts={posts}
                />
            </div>
        </>
    );
}
