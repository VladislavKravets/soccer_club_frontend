import React, {useEffect, useState} from 'react';
import './Post.css'
import Tags from "../../components/Tags/Tags";
import {getPostId} from '../../services/apiNews';
import {useParams} from "react-router-dom";

function PostPage(props) {
    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await getPostId(id);
            setData(response);
            console.log(response)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const defaultImageUrl = '/res/Spain_national_under-21_football_team_2011.jpg';
    const containerStyle = {
        background: `url('${data.urlPhoto || defaultImageUrl}') center/cover no-repeat`,
    };

    return (
        <div className='main'>
            <div className='container'>
                <div className="image-container" style={containerStyle}>
                    <div className="overlay">
                        <p className='date'>{data.publicationDate}</p>
                        <div className="overlay-text">
                            <h2>{data.title}</h2>
                            {/*<p>{data.tagName}</p>*/}
                        </div>
                    </div>
                </div>
                <div className="post-text">
                    {data.content}
                    <br/>
                    {
                        <>
                            <Tags tag={data.tagName}/>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default PostPage;
