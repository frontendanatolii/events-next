import classes from './comment-list.module.css';

function CommentList(props) {
  let comments;

  if (props.comments.length !== 0) {
    comments = props.comments.map(comment => (
      <li key={comment._id}>
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>
    ))
  } else if (props.comments.length === 0) {
    comments = <h1>write first comment for this event!</h1>
  }

  return (
    <ul className={classes.comments}>
      {comments}
    </ul>
  );
}

export default CommentList;
