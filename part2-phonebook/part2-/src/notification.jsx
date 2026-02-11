const Notification = ({ message }) => {
  // If message state is null OR the text inside the object is null, don't show anything
  if (!message || message.message === null) {
    return null;
  }

  return (
    // Use message.type for the CSS class and message.message for the text
    <div className={message.type}>{message.message}</div>
  );
};

export default Notification;
