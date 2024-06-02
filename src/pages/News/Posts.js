import React, { useEffect, useState } from 'react';
import './Posts.css';
import Post from "../../components/Post/Post";
import { getPosts } from '../../services/apiNews';
import {Roles} from "../../enum/Roles";
import CustomSelect from "../../components/Select/CustomSelect";

function Posts(props) {
    const [data, setData] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [selectedTag, setSelectedTag] = useState('Пошук за тегом'); // Стан для обраного тегу
    const [selectedYear, setSelectedYear] = useState('Пошук за роком');
    const [tags, setTags] = useState([]); // Стан для зберігання унікальних тегів
    const [years, setYears] = useState([]); // Стан для зберігання унікальних тегів

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getPosts();
            setData(response);
            // Отримання унікальних тегів з отриманих даних
            const uniqueTags = Array.from(new Set(response.map(post => post.tagName)));
            const uniqueYear = Array.from(new Set(response.map(post => post.publicationDate.split('-')[0])));
            setTags(uniqueTags);
            setYears(uniqueYear);
            console.log(response)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const loadMorePosts = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
    };

    // Фільтрація за тегом
    const filteredPosts = data.filter(post => {
        if (selectedTag !== 'Пошук за тегом' && selectedYear !== 'Пошук за роком') {
            return post.tagName === selectedTag && post.publicationDate.startsWith(selectedYear);
        } else if (selectedTag !== 'Пошук за тегом') {
            return post.tagName === selectedTag;
        } else if (selectedYear !== 'Пошук за роком') {
            return post.publicationDate.startsWith(selectedYear);
        } else {
            return true;
        }
    });

    return (
        <>
            <div className="container name-page">
                <h1>Всі новини </h1>
                <div style={{display: "flex"}}>
                    {/* Використання отриманих унікальних тегів */}
                    <CustomSelect
                        options={['Пошук за тегом', ...tags]} // Додайте варіанти вибору тегів
                        onSelectChange={(tag) => setSelectedTag(tag)}
                    />
                    <CustomSelect
                        options={['Пошук за роком', ...years]} // Додайте варіанти вибору тегів
                        onSelectChange={(years) => setSelectedYear(years)}
                    />
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
                        {filteredPosts.slice(0, visiblePosts).map(post => (
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
                    {visiblePosts < filteredPosts.length && (
                        <button onClick={loadMorePosts}>Показати ще 5 новин</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Posts;
