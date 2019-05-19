/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from "./Feed.final"
// export default FeedFinal
export default Feed

function Feed() {
  let feedState = null
  const [state, dispatch] = useReducer(
    (state, action) => {
      console.log(action)
      switch (action.type) {
        case "LOAD_POSTS":
          return { ...state, posts: action.posts }
        case "LOAD_NEW_POSTS":
          return { ...state, newPosts: action.posts }
        default: {
        }
      }
    },
    feedState || {
      posts: [],
      createdBefore: Date.now(),
      newPosts: []
    }
  )

  const { posts, createdBefore } = state

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    feedState = state
  })

  useEffect(() => {
    let current = true
    if (current) {
      loadFeedPosts(Date.now(), 10).then(data => {
        dispatch({ type: "LOAD_POSTS", posts: data })
      })
    }
    return () => (current = false)
  }, [])

  useEffect(() => {
    return subscribeToNewFeedPosts(createdBefore, posts => {
      dispatch({ type: "LOAD_NEW_POSTS", posts })
    })
  }, [createdBefore])

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button">
          View 3 New Posts
        </button>
      </div>

      {posts && posts.length > 0
        ? posts.map(post => <FeedPost post={post} key={post.id} />)
        : null}
      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button">View More</button>
      </div>
    </div>
  )
}

// you can delete this
const fakePost = {
  createdAt: Date.now() - 10000,
  date: "2019-03-30",
  message: "Went for a run",
  minutes: 45,
  uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
}
