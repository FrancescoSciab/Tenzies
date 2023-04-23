export default function Data(props) {
    const seconds = props.elapsedTime;
    return(
        <div>
            <p>You took {Math.floor(seconds)} seconds</p>
        </div>
    )
}