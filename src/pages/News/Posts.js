import React, { useEffect, useState } from 'react';
import './Posts.css';
import Post from "../../components/Post/Post";
import { getPosts } from '../../services/apiNews';
import {Roles} from "../../enum/Roles";
import CustomSelect from "../../components/Select/CustomSelect";

function Posts(props) {
    const [data, setData] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(5);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getPosts();
            setData(response);
            console.log(response)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const loadMorePosts = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
    };

    return (
        <>
            <div className="container name-page">
                <h1>Всі новини </h1>
                <div style={{display: "flex"}}>
                    {/*<CustomSelect options={['2020', '2021']}/>*/}
                    {
                        JSON.parse(localStorage.getItem('userInfo'))?.roles.toString() === Roles.admin &&
                        <input className="custom-button" type="button" value="Додати новину" onClick={() => {
                            window.location.href = '/admin/create-news';
                        }}/>
                    }
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <ul>
                        {data.slice(0, visiblePosts).map(post => (
                            <li key={post.id}>
                                <a href={`/posts/${post.newsId}`}>
                                    <Post img={post.urlPhoto}
                                          date={post.publicationDate}
                                          header={post.title}
                                          text={post.content}
                                          tag={post.tagName}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                    {visiblePosts < data.length && (
                        <button onClick={loadMorePosts}>Показати ще 5 новин</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Posts;
