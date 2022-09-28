import styled from "styled-components";
import { ComboboxInput, Combobox } from "@reach/combobox";
import { IComboboxContainer, IComboboxStyled,IComboboxInputStyled } from './places-auto-complete.component'

export const ComboboxContainer = styled.div`
    ${(props: IComboboxContainer) => props.position? `position: ${props.position}`:``};
    width: ${(props: IComboboxContainer) => props.width || '100%'};
    height: ${(props: IComboboxContainer) => props.height || '50px'};
    left: ${(props: IComboboxContainer) => props.left || '100px'};
    top: ${(props: IComboboxContainer) => props.top || '0px'};
    max-width: ${(props: IComboboxContainer) => props.maxWidth || '500px'};
`

export const ComboboxInputStyled = styled(ComboboxInput)`
    width: ${(props: IComboboxInputStyled) => props.width || '80%'};
    height: ${(props: IComboboxInputStyled) => props.height || '32px'};
    left: ${(props: IComboboxInputStyled) => props.height || '10%'};
`
export const ComboboxStyled = styled(Combobox)`
    /* position: absolute; */
    width: ${(props: IComboboxStyled) => props.width || '100%'};
    height: ${(props: IComboboxStyled) => props.height || '50px'};
    left: ${(props: IComboboxStyled) => props.left || '100px'};
    padding-top: ${(props: IComboboxStyled) => props.paddingTop || '0px'};
    display: flex;
    flex-direction: column;
    align-items: center;
`