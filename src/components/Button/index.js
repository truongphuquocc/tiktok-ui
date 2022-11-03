import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Styles from './Button.module.scss';

const cx = classNames.bind(Styles);

function Button({
    to,
    href,

    primary = false,
    outline = false,
    text = false,
    small = false,
    large = false,
    rounded = false,
    disabled = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    //remove events on
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        small,
        large,
        rounded,
        disabled,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon&& <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon&& <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
