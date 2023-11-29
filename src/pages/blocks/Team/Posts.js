import React from 'react';
import Post from "../../../components/Post/Post";

function Posts(props) {
    return (
        <div>
            <Post img='/res/Spain_national_under-21_football_team_2011.jpg'
                  date='01.01.22'
                  header='head' text='text'
                  tags = {['тег 1', 'тег 2']}
            />
            <Post img='/res/Spain_national_under-21_football_team_2011.jpg'
                  date='01.01.22'
                  header='head' text='text'
                  tags = {['тег 1', 'тег 2']}
            />
            <Post img='/res/Spain_national_under-21_football_team_2011.jpg'
                  date='01.01.22'
                  header='head' text='text'
                  tags = {['тег 1', 'тег 2']}
            />
        </div>
    );
}

export default Posts;
