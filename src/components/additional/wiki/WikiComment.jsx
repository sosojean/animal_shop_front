import WikiComEditor from "./WikiComEditor";


const WikiComment = (props) => {

    const {id} = props;

    return (
        <div>
            <WikiComEditor id={id}/>
        </div>
    )
}

export default WikiComment;