import React from 'react';
import './Post.css';
import Tags from "../Tags/Tags";
function Post(props) {
    return (
        <div className="post">
            {
                props.img ?
                    <img src={props.img} alt="Картинка для новини"/>
                    :
                    <img src="/res/Spain_national_under-21_football_team_2011.jpg" alt="Картинка для новини"/>
            }
            <div className="post-text">
                {props.date && <p className="post-date">{props.date}</p>}
                {props.header && <h2 className="post-header">{props.header}</h2>}
                {props.text && <p>{props.text.slice(0, 50).trim() + " ..."}</p>}
                {props.tag &&<Tags tag = {props.tag}/>}

                {/*{console.log(props)}*/}
                {}
                {/*{*/}
                {/*    props.tags.map((tag,index) => {*/}
                {/*        return <Tags tag = {tag}/>*/}
                {/*    })*/}
                {/*}*/}
            </div>
        </div>
    );
}

export default Post;
