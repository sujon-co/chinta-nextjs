export const scrollHandler = function (e: any) {
    let flag = true;
    if (e.deltaY < 0 && e.currentTarget.scrollTop === 0) {
        flag = false;
    } else if (
        e.deltaY > 0 &&
        e.currentTarget.scrollHeight <=
            e.currentTarget.scrollTop + e.currentTarget.clientHeight + 3
    ) {
        flag = false;
    }
    console.log({
        h: e.currentTarget.scrollHeight,
        t: e.currentTarget.scrollTop,
        tc: e.currentTarget.scrollTop + e.currentTarget.clientHeight + 3,
    });
    if (flag) {
        e.stopPropagation();
    }
};
