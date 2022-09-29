import { FC } from "react";
import {
    Switch,
    SwitchProps,
    Form,
    FormItemProps
} from "antd";


export interface IFormSwitchProps {
    switchProps: SwitchProps;
    formItemprops: FormItemProps;
}

export const FormSwitch:FC<IFormSwitchProps> =({
    switchProps,
    formItemprops
}) =>{
    // console.log(switchProps,formItemprops)
    return (
            <Form.Item
                labelCol = {{span: 10}}
                wrapperCol = {{span: 14}}
                valuePropName = 'checked'
                {...formItemprops}
            >
                <Switch
                    {...switchProps}
                />
            </Form.Item>
    )
}