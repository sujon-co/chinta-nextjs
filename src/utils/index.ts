
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


    if (flag) {
        e.stopPropagation();
    }
    // console.log({ value: e.changedTouches[0].screenY });



    // let touchStartPosX = 0;

    // console.log({ top: e.currentTarget.scrollTop });

    // const currentPageX = Math.round();
    // if (touchStartPosX === currentPageX) return;

    // if (touchStartPosX - currentPageX > 0) {
    //     console.log("down");
    // } else {
    //     console.log("up");
    // }
    // touchStartPosX = currentPageX;

    // console.log({ touchStartPosX });

};
