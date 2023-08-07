import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    getCommentHandler();
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Add your comment...',
      message: 'Add new comment',
      status: 'pending',
    });

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then((data) => {
        throw new Error(data.message || 'Something went wrong')
      })
    })
    .then(data => {
      setComments((prevState) => [...prevState, data.comment]);
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully added your comment',
        status: 'success',
      });
    })
    .catch(error => {
      notificationCtx.showNotification({
        title: 'Error',
        message: error.message || 'Something went wrong',
        status: 'error',
      });
    }) 
  }

  function getCommentHandler() {
    fetch('/api/comments/' + eventId)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong')
        })
      })
      .then(commentsFromServer => {
        setComments(commentsFromServer.comments);
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully loaded comments',
          status: 'success',
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
      }) 
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments ? <NewComment onAddComment={addCommentHandler} /> : null}
      {showComments ? <CommentList comments={comments} /> : null}
    </section>
  );
}

export default Comments;
