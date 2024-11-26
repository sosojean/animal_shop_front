import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { forwardRef } from 'react';

const SellerDescription = forwardRef((props, ref) => {
    
    return (
        <div className='RegDetailContainer'>
            <h3>상품 설명</h3>
            <div>
                <Editor
                    initialValue=""
                    previewStyle="vertical"
                    height="250px"
                    useCommandShortcut={false}
                    placeholder="글을 작성해주세요."
                    ref={ref}
                    toolbarItems={[
                        ['heading', 'bold', 'italic', 'strike'],
                        ['hr', 'quote'],
                        ['ul', 'ol', 'indent', 'outdent'],
                        ['table', 'link'],
                        ['scrollSync']
                    ]}
                />
            </div>
        </div>
    )
})

export default SellerDescription;