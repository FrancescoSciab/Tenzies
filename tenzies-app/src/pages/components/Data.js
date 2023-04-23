export default function Data(props) {
    const seconds = Math.floor(props.elapsedTime);
    return(
        <div>
            <p>You took {props.tenzies && seconds} seconds</p>
        </div>
    )
}