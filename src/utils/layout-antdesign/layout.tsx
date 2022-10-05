
export type LayoutSize = 'xs'|'sm'|'md'|'lg'|'xl'|'xxl';
export const widthArray = [576, 768, 992, 1200, 1600, 1920];


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







