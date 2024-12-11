import React, {useEffect} from 'react';
import {useModifyTime} from "../../utils/useModifyTime";
import "../../assets/styles/map/blogResultItem.scss"

const BlogResultItem = ({item}) => {
    const modifiedTime =useModifyTime(item.datetime)

    return (
        <a href={item.url} target='_blank'>
            <div className="blog">
                <img className="thumbnail" src={item.thumbnail?item.thumbnail:"https://placehold.co/40"} alt=""/>

                <div className="blog-info">
                    <div className="blog-title">
                        <span className="blogname">{item.blogname}</span>
                        <span className="modifiedTime">{modifiedTime}</span>
                    </div>


                    {/*<span>{item.contents}</span>*/}

                    <span className="title">{item.title.replace(/<[^>]*>?/gm, "").replace(/&[^;]+;/gm, "")}</span>
                </div>

            </div>
        </a>
    );
};

export default BlogResultItem;