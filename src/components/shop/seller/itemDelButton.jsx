

const itemDelButton = () => {

    return (
        <div onClick={() => {handleDeleteItemData(item.id);}}>
            <button>삭제</button>
        </div>
    )
}