import DefaultButton from "../../common/DefaultButton";


const WikiComItem = (props) => {

    const {data} = props;

    // TODO 댓글 삭제 API 추가

    return (
        <div>
            <p>{data.author}</p>
            <p>{data.content}</p>
            <div>
                <DefaultButton>삭제</DefaultButton>
            </div>
        </div>
    )
}

export default WikiComItem;