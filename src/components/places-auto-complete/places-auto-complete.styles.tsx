import styled from "styled-components";
import { ComboboxInput, Combobox } from "@reach/combobox";
import { IComboboxContainer, IComboboxStyled,IComboboxInputStyled } from './places-auto-complete.component'

export const ComboboxContainer = styled.div`
    width: ${(props: IComboboxContainer) => props.width || '100%'};
    height: ${(props: IComboboxContainer) => props.height || '50px'};
    left: ${(props: IComboboxContainer) => props.left || '100px'};
`

export const ComboboxInputStyled = styled(ComboboxInput)`
    width: ${(props: IComboboxInputStyled) => props.width || '80%'};
    left: ${(props: IComboboxInputStyled) => props.height || '10%'};
`
export const ComboboxStyled = styled(Combobox)`
    /* position: absolute; */
    width: ${(props: IComboboxStyled) => props.width || '100%'};
    height: ${(props: IComboboxStyled) => props.height || '50px'};
    left: ${(props: IComboboxStyled) => props.left || '100px'};
    padding-top: ${(props: IComboboxStyled) => props.paddingTop || '50px'};
    display: flex;
    flex-direction: column;
    align-items: center;
`