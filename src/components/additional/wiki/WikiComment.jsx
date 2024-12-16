import WikiComEditor from "./WikiComEditor";
import WikiComments from "./WikiComments";


const WikiComment = (props) => {

    const {id} = props;

    return (
        <div>
            <WikiComEditor id={id}/>
            <WikiComments id={id}/>
        </div>
    )
}

export default WikiComment;