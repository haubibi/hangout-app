import { FC } from "react";
import {
    SwitchProps,
    FormItemProps
} from "antd";
import { SwitchCon, FormItemCon } from './form-switch.styles';

export interface IFormSwitchProps {
    switchProps: SwitchProps;
    formItemprops: FormItemProps;
}

export const FormSwitch:FC<IFormSwitchProps> =({
    switchProps,
    formItemprops
}) =>{
    return (
            <FormItemCon
                labelCol = {{span: 24}}
                wrapperCol = {{span: 24}}
                valuePropName = 'checked'
                {...formItemprops}
            >
                <SwitchCon
                    {...switchProps}
                />
            </FormItemCon>
    )
}