export default function TimeTracker(props) {
    
    function calculateResult() {
        const result = props.finalTime - props.initial
        return (
            result
        )
    }
        

    return (
    <div>
        <h1>{calculateResult()}</h1>
    </div>
  )
}