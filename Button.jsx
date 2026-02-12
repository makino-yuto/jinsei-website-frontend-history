import styles from './Button.module.css';

function Button(props) {

    const { type, disabled, children, onClick } = props;

    const handleclick = () => {
        alert("clicked")
    }

    return (
        <button className={styles.buttonInner} type={type} disabled={disabled} onClick={onClick || handleclick}>
            {children}
        </button>
    );
}

export default Button;