import React, { useContext,HTMLAttributes,FC, useMemo, useEffect,useState } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  TimePicker,
  Col, 
  Row
} from 'antd';
import { ITask } from '../../utils/interfaces/task.interface';
import { FormImagesUpload } from '../form-images-upload/form-images-upload.component'
import { TaskFormItemContainer } from './task-form-item.styles';
import GoogleSearchInForm from '../googleMaps-search/googleMaps-search.component';
import { taskCreator } from '../../utils/task/task.utils';
import { UserContext } from '../../context/user.context';
import { GoogleMapContext } from '../../context/google-map.context';
// ITaskInputString
import './task.less';
import { TaskContext } from '../../context/task.context';
import { dateFormat } from '../../utils/date/date.utils';

const { TextArea } = Input;

interface TaskFormItemProps extends HTMLAttributes<HTMLDivElement> {
    defaultTask: ITask;
}

// {
//     id: '',
//     title: '',
//     startDate: '',
//     startTime: '',
//     organizer: {
//         uid: '',
//         displayName: '',
//         avatarStr: '',
//         email: ''
//     },
//     endDate: '',
//     endTime: '',
//     participants: [],
//     reviews: [],
//     hide: false,
//     open:true,
//     participantsNumber: 0,
//     location: {
//         lat:0,
//         lng: 0
//     },
//     description:''
//     address
// }
export const TaskFormItem:FC<TaskFormItemProps> = ({defaultTask}) =>{
    const { title, startDate,startTime, endDate, endTime,description, participantsNumber, location, address} = defaultTask;
    const {currentUser} = useContext(UserContext);
    const {setCurrentTask} = useContext(TaskContext);
    const {addressFormInput, setAddressFormInput , setAddressString} = useContext(GoogleMapContext);

    const startDateDefaultValue = useMemo(()=> startDate === ''? undefined: moment(startDate, dateFormat),[startDate]);
    const startTimeDefaultValue= useMemo(()=> startTime === ''? undefined: moment(startTime),[startTime]);
    const endDateDefaultValue = useMemo(()=> endDate === ''? undefined: moment(endDate, dateFormat),[endDate]);
    const endTimeDefaultValue= useMemo(()=> endTime === ''? undefined: moment(endTime),[endTime]);

    useEffect(()=>{
        setAddressString(address);
        setAddressFormInput(location);
    },[])


    // useEffect(()=> {
    //     const getLocation = async() => {
    //         await getLocationByLatlng(markerLocation).then((lct:string)=>{
    //             setInputLocation(lct!);
    //         }).catch(error=> {
    //             console.log(error)
    //         });
    //     };
    //     getLocation();
    // });

    const FormInitialValues = {
        title,
        startDate: startDateDefaultValue,
        startTime: startTimeDefaultValue,
        endDate: endDateDefaultValue,
        endTime: endTimeDefaultValue,
        description,
        participantsNumber
    }
    console.log(FormInitialValues)



    const onFinish = (values: any) => {
        // const { startDate } = values;
        if(!currentUser) {alert('Please login first!'); return;}
        const { uid } = currentUser;
        if(!addressFormInput) {alert('Please select a place!'); return;}


        const taskObj = taskCreator(defaultTask,{
            id: uid,
            organizer: currentUser,
            location: addressFormInput,
            ...values
        });
        setCurrentTask(taskObj);
      };

    return(
        <TaskFormItemContainer>
            <Form
                name='taskform'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                onFinish={onFinish}
                initialValues = {FormInitialValues}
            >   
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            label="Event title"
                            name = "title"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input allowClear = {true}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Start date"
                            name = "startDate"
                            labelCol = {{span: 10}}
                            wrapperCol = {{span: 10}}
                            rules={[{ required: true, message: '' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="Start time"
                            name = "startTime"
                            labelCol = {{span: 6}}
                            wrapperCol = {{span: 10}}
                            rules={[{ required: true, message: '' }]}
                        >
                            <TimePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="End date"
                            name = "endDate"
                            labelCol = {{span: 10}}
                            wrapperCol = {{span: 10}}
                            rules={[{ required: true, message: '' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="End time"
                            name = "endTime"
                            labelCol = {{span: 6}}
                            wrapperCol = {{span: 10}}
                            rules={[{ required: true, message: '' }]}
                        >
                            <TimePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            label="Description" 
                            name = "description"
                            rules={[{ required: true, message: '' }]}
                        >
                            <TextArea rows={4} allowClear = {true}/>
                        </Form.Item>
                    </Col>
                </Row>
            
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            label="Participants number"
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
                    <Col span={24}>
                        <FormImagesUpload />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <GoogleSearchInForm />
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

            </Form>

        </TaskFormItemContainer>
  
    )
};