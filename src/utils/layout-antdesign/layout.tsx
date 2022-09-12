
export type LayoutSize = 'xs'|'sm'|'md'|'lg'|'xl'|'xxl';
export const widthArray = [576, 768, 992, 1200, 1600, 1920];
export const cardWidth = 300;


export const currentSize = (clientWidth: number):LayoutSize =>{
    if(clientWidth<widthArray[0]){
        return 'xs';
    } else if(clientWidth<widthArray[1] && clientWidth>=widthArray[0]){
        return 'sm';
    } else if(clientWidth<widthArray[2] && clientWidth>=widthArray[1]){
        return 'md';
    } else if(clientWidth<widthArray[3] && clientWidth>=widthArray[2]){
        return 'lg';
    } else if(clientWidth<widthArray[4] && clientWidth>=widthArray[3]){
        return 'xl';
    } else {
        return 'xxl';
    }
}
// 'xs'|'sm'|'md'|'lg'|'xl'|'xxl'



const spanArrayFc = (widthArray:number[], width: number) => {
    return widthArray.map((fullWidth, index) => Math.floor(24/(fullWidth/ (width + gutterXArr[index]))));
}

const gutterX = { xs: 8, sm: 16, md: 24, lg: 32, xl:40, xxl: 48};
const gutterY = { xs: 8, sm: 16, md: 24, lg: 32, xl:40, xxl: 48};

const gutterXArr = widthArray.map((_, index) => 8* (index + 1));

export const getNumbersInAnRow = (windowWidth: number) => {
    return  Math.max(Math.floor(windowWidth/ (cardWidth + gutterX[currentSize(windowWidth)])),1);
}



const spanArray = spanArrayFc(widthArray, cardWidth);

const getSpanObj = (spanArray: number[])=>{
    return {
        xs: spanArray[0],
        sm: spanArray[1],
        md: spanArray[2],
        lg: spanArray[3],
        xl: spanArray[4],
        xxl: spanArray[5],
    }
}
export const spanObj =getSpanObj(spanArray);

export const gutter = [
    gutterX,
    gutterY
];



//search bar layout
export interface ReactiveCol {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export const searchColSideLayout = {
    xs: 3,
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
};

export const colMiddleLayoutFc = (sideLayout: ReactiveCol):ReactiveCol => {
    return {
        xs: 24 - sideLayout.xs*2,
        sm: 24 - sideLayout.sm*2,
        md: 24 - sideLayout.md*2,
        lg: 24 - sideLayout.lg*2,
        xl: 24 - sideLayout.xl*2,
    }
}


export const tasksColSideLayout: ReactiveCol = {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1
};

export const midColConfigue = colMiddleLayoutFc( tasksColSideLayout );
export const tasksColMiddleLayout = colMiddleLayoutFc(searchColSideLayout);







