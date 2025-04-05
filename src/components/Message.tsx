import styles from "./Message.module.css";
interface typemesage{
  message:string
}
function Message({ message} :typemesage ) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
