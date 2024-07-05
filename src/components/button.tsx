const StyledButton: React.FC<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {

    return (
        <button className="bg-primary p-2 text-white px-6 rounded-md w-fit hover:bg-[#f00]" {...props}>
            {props.children}
        </button>
    )
}

export default StyledButton
