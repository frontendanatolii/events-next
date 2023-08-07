import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const showNotification = notificationCtx.showNotification;
  const emailInput = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    showNotification({
      title: 'Singing up...',
      message: 'Registering for a newsletter',
      status: 'pending',
    });

    fetch('/api/newsLetter', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInput.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong')
        })
      })
      .then(data => {
        showNotification({
          title: 'Success',
          message: 'Successfully registered for a newsletter',
          status: 'success',
        });
      })
      .catch(error => {
        showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInput}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
