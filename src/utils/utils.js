export const debounce = (fn, delay = 0) => {
    let timerId;

    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
};


export const hexToRGBA = (hex, alpha) => {
    const RR = parseInt(hex.slice(1, 3), 16);
    const GG = parseInt(hex.slice(3, 5), 16);
    const BB = parseInt(hex.slice(5, 7), 16);

    return `rgba(${RR}, ${GG}, ${BB}${alpha && `, ${alpha}`})`;
};


export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);





class ClickOutside extends React.Component {
    container = React.createRef();

    componentDidMount() {
        document.addEventListener('click', this.handleClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, true);
    }

    handleClick = (event) => {
        const container = this.container.current;
        const { target } = event;
        const { onClickOutside } = this.props;

        if ((container && container === target) || (container && !container.contains(target))) {
            onClickOutside(event);
        }
    };

    render() {
        const { className, children } = this.props;

        return (
            <div className={className} ref={this.container}>
                {children}
            </div>
        );
    }
}
