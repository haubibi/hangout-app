import React, { useContext,FC, useEffect, useState, useMemo,Fragment } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { IFormImagesUploadProps } from '../form-images-upload/form-images-upload.component';
import moment from 'moment';
import {
    FormInstance,
    Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  TimePicker,
  Col, 
  Row,
  Switch,
  UploadFile,
  Spin,
  message,
} from 'antd';

import { ITask } from '../../utils/interfaces/task.interface';
import { FormImagesUpload } from '../form-images-upload/form-images-upload.component'
import { TaskFormItemContainer } from './task-form-item.styles';
import GoogleSearchInForm from '../googleMaps-search/googleMaps-search.component';
import { FormSwitch } from '../form-switch/form-switch.component';
import { taskCreator } from '../../utils/task/task.utils';
import { 
    updateImages, 
    ImagesTypeName, 
    TaskImagesTypeName, 
    getImagesWithUrlAndRefPath, 
    transformImageToWithoutRefPath 
} from '../../utils/images/images.utils';
// import { baseTaskCreator } from '../../utils/task/task.utils';
// import { useQuery } from '@apollo/client';
// import { GETTASKBYID } from '../../utils/graphql/query.utils';
import { useForm } from 'antd/es/form/Form';
import { dateFormat } from '../../utils/date/date.utils';
import { getImagesWithRefPath } from '../../utils/images/images.utils';
import './task.less';
import { JsxElement } from 'typescript';
const { TextArea } = Input;
const {Item} = Form;

interface TaskFormItemProps {
    task:ITask
}

const titleFormProps = {
    label: "Event title",
    name: "title",
    labelCol: {span: 4},
    wrapperCol: {span: 20},
    rules:[{ required: true, message: '' }]
}

const startDateFormProps = {
    label: "Start date",
    name: "startDate",
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}
const startTimeFormProps = {
    label: "Start time",
    name: "startTime",
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}


const endDateFormProps = {
    label: "End date",
    name: "endDate",
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}
const endTimeFormProps = {
    label: "End time",
    name: "endTime",
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}
const descriptionFormProps = {
    label: "Description",
    name: "description",
    labelCol: {span: 4},
    wrapperCol: {span: 20},
    rules: [{ required: true, message: '' }]
}
const frontCoverFormProp = {
    label: "FrontCover",
    name: "frontCoverImage",
    maxImageLength: 1,
}
const showImagesFormProps = {
    label: "Display Images",
    name: "showImages",
    maxImageLength: 3,
}

const googleSearchFormProps = {
    name: "latLngAndAddress",
    style:{width: '100%'},                 
    wrapperCol:{span: 24},
    rules: [{ required: true, message: '' }]                   
                            
}



const openFormitemProps = {
    name:'open',
    label:'Event open',
    labelCol: {span: 10},
    wrapperCol: {span: 10}                      
}
const showFormitemProps = {
    name:'hide',
    label:'Hide event',
    labelCol: {span: 10},
    wrapperCol: {span: 10}                      
}
const switchProps = {
    checkedChildren: <CheckOutlined />,
    unCheckedChildren: <CloseOutlined />,
    defaultChecked: true
}
const formSwitchOpenProps = {
    switchProps,
    formItemprops: openFormitemProps  
}
const formSwitchShowProps = {
    switchProps,
    formItemprops: showFormitemProps  
}


const subbmitButtonFormitemProps = {

}




export const TaskFormItem:FC<TaskFormItemProps> = ({
    task
}) =>{
    const [ form ] = useForm();
    const [ detail, setDetail] = useState<Record<string, any>>();
    const taskId = task.id;

    const FormItemsArr = useMemo(()=>{
        return [
            [{formItemProps: titleFormProps, wrappedElement: <Input allowClear = {true}/>}],
            [
                {formItemProps: startDateFormProps, wrappedElement: <DatePicker />},
                {formItemProps: startTimeFormProps, wrappedElement: <TimePicker />}
            ],
            [
                {formItemProps: endDateFormProps, wrappedElement: <DatePicker />},
                {formItemProps: endTimeFormProps, wrappedElement: <TimePicker />}
            ],  
            [{formItemProps: descriptionFormProps, wrappedElement: <TextArea rows={4} allowClear = {true} />}],
            [{formItemProps: {}, wrappedElement:<FormImagesUpload {...frontCoverFormProp} showImages = {task.showImages}/>}], //
            [{formItemProps: {}, wrappedElement:<FormImagesUpload {...showImagesFormProps} showImages = {task.showImages}/>}], //
            [{formItemProps: googleSearchFormProps, wrappedElement: <GoogleSearchInForm />}],
            [
                {formItemProps: {}, wrappedElement:<FormSwitch {...formSwitchOpenProps}/>},
                {formItemProps: {}, wrappedElement:<FormSwitch {...formSwitchShowProps}/>},
            ], 
            [{formItemProps: subbmitButtonFormitemProps, wrappedElement: <Button type="primary" htmlType="submit">Submit</Button>,encapsulated: false}],
        
        ]
    },[task]);
   

    useEffect(()=>{
        const { 
            id, 
            // title, 
            // description,
            // hide,
            // open,
            // participantsNumber, 
            startDate, 
            startTime, 
            endDate, 
            endTime,
            organizer,
            participants,
            // frontCoverImage,
            // latLngAndAddress,
            showImages, 
            reviews,
            ...otherProps
        } = task;

        // console.log(showImages)
        const showImagesWithUrl = transformImageToWithoutRefPath(showImages);
        // console.log(showImages, showImagesWithUrl)
        setDetail({
            startDate : startDate? moment(startDate, dateFormat): undefined,
            startTime : startTime?moment(startTime): undefined, 
            endDate : endDate?moment(endDate, dateFormat): undefined, 
            endTime : endTime?moment(endTime): undefined,
            showImages: showImagesWithUrl,
            ...otherProps
        });
    },[task])
    // console.log(task,detail)

    const onFinishFailed = ({ values, errorFields, outOfDate }: any) => {
        console.log(values, errorFields, outOfDate,task.showImages)
    }
   
    const onFinish = (values: any) => {
        console.log(task.showImages,values)
        // if(!currentUser) {alert('Please login first!'); return;}
        // const { uid } = currentUser;
        if(!task.showImages) task.showImages = [];
        // update task
        updateImages(
            ImagesTypeName.TASKS,
            taskId,
            TaskImagesTypeName.DISPLAYINTASK,
            task.showImages,
            values.showImages
        ).then(()=>{
            const imagesWithRef = getImagesWithRefPath(ImagesTypeName.TASKS, taskId, TaskImagesTypeName.DISPLAYINTASK, values.showImages);
            getImagesWithUrlAndRefPath(imagesWithRef).then((showImages)=>{
                // console.log(showImages, values)
                const taskObj = taskCreator(task,{
                    showImages,
                    ...values
                });
                // setTask(taskObj);
                console.log(taskObj)
            })
        });

        // getNewImageObj

    };


    if(!task || !detail) return <Spin />
    return(
        <TaskFormItemContainer>
            <Form
                form={form}
                name='taskform'
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed = {onFinishFailed}
                initialValues = {detail}
                colon = {false}
            >   

                {
                    FormItemsArr.map((rowArr,index)=>{
                        const elementsNum = rowArr.length;
                        return(
                            <Row key={index} align = "middle" justify = "start" gutter={16}>
                                {
                                    rowArr.map((formitem, index) => {
                                        const { formItemProps, wrappedElement} = formitem;
                                        console.log(formitem,rowArr.length);
                                        return wrappedElement.type === 'function'?
                                        <Col key={index} span={Math.round(24/elementsNum)}>{wrappedElement}</Col>:    
                                        <Col key={index} span={Math.round(24/elementsNum)}><Form.Item {...formItemProps}>{wrappedElement}</Form.Item></Col>;    
                                    })
                                }
                             </Row>
                        )
                    })
                }
                {/* <Row>
                    <Col span={24}>
                        <Form.Item 
                            {...titleFormProps}
                        >
                            <Input allowClear = {true}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            {...startDateFormProps}
                        >
                            <DatePicker />
                        </Form.Item>
                        
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            {...startTimeFormProps}
                        >
                            <TimePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                           {...endDateFormProps}
                        >
                            <DatePicker />
                        </Form.Item>
                        
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                           {...endTimeFormProps}
                        >
                            <TimePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            {...descriptionFormProps}
                        >
                            <TextArea rows={4} allowClear = {true}/>
                        </Form.Item>
                    </Col>
                </Row>
            
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            label="Numbers"
                            name = "participantsNumber"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 3 }}
                            rules={[{ required: true, message: '' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} >                
                        <FormImagesUpload
                            {...showImagesFormProps}
                            showImages = {task.showImages}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            name = "latLngAndAddress"
                            style={{width: '100%'}}
                            wrapperCol = {{span: 24}}
                            rules={[{ required: true, message: '' }]}
                        >
                            <GoogleSearchInForm 
                                
                            />
                        </Form.Item>
                    </Col>
                </Row>
                

                <Row>
                    <Col span = {12}>
                        <FormSwitch
                            switchProps = {switchProps}
                            formItemprops = {openFormitemProps}
                        />
                    </Col>
                    <Col span = {12}>
                        <FormSwitch
                            switchProps = {switchProps}
                            formItemprops = {showFormitemProps}
                        />
                    </Col>
                </Row>
                
                
                
                <Row>
                    <Col span={2} offset = {11}>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                 */}

            </Form>

        </TaskFormItemContainer>
  
    )
};