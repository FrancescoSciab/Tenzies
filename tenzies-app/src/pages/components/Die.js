

export default function Die (props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    function startTime() {
        if (props.initialTime === 0){//to not trigger every onClick event
          return props.initialTime;
        }
      }

    return (
        <div 
            className="die-face"
            style={styles}
            onClick={() =>  {
                props.holdDice();
                startTime()
            }
        }
            >

            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}