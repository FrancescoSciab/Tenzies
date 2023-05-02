export default function Data(props) {
    const seconds = Math.floor(props.elapsedTime / 1000)
    return(
        <div>
            <p>You took {seconds} seconds</p>

            <p>Best time: </p>
        </div>
    )
}