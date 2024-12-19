import { useEffect, useRef } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const ProductDetailInfo = (props) => {
    const { data } = props;
    const viewerRef = useRef(null);

    useEffect(() => {
        if (data.item_detail && viewerRef.current) {
            const viewer = new Viewer({
                el: viewerRef.current,
                initialValue: data.item_detail
            });
        }
    }, [data.item_detail]);

    return (
        <div id="info-target">
            <h2>상세 정보</h2>
            <div ref={viewerRef}></div>
            {(viewerRef.current === null || data.item_detail === "") &&
                <div className="no-contents"><span>작성된 정보가 없습니다.</span></div>
            }
        </div>
    );
};

export default ProductDetailInfo;