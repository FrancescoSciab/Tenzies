export default function Data(props) {
    console.log(`Data = ${props.elapsedTime}`)
    return(
        <div>
            <p>You took {Math.floor(props.elapsedTime / 1000)} seconds</p>
        </div>
    )
}