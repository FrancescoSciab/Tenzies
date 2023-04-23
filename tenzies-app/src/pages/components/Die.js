

export default function Die (props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    function time() {
        if (props.t0 === 0) {
            props.initialTime
        }
    }

    return (
        <div 
            className="die-face"
            style={styles}
            onClick={() =>  {
                props.holdDice();
                time
            }
        }
            >

            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}