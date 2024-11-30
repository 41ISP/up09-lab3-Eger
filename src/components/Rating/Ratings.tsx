import { IRating } from "../../shared/api/api.rdo"

const Rating = ({Source, Value}: IRating) => {
    return (
        <p>{Source}: {Value}</p>            
    )
}

export default Rating