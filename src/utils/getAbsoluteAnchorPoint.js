export const getAbsoluteAnchorPoint = (e, ref) => {
    const refRect = ref.current?.getBoundingClientRect();

    const wrapperScrollY = ref.current?.scrollTop ?? 0;
    const rectTop = refRect?.top ?? 0;
    const wrapperScrollX = ref.current?.scrollLeft ?? 0;
    const rectLeft = refRect?.left ?? 0;

    const x = e.clientX - rectLeft + wrapperScrollX;
    const y = e.clientY - rectTop + wrapperScrollY;

    return { x: x, y: y };
};
