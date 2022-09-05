import React, { useContext } from 'react';
import type { Moment } from 'moment';
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
import { TaskFormItemContainer } from './task-form-item.styles';
import GoogleSearchInForm from '../googleMaps-search/googleMaps-search.component';
import { taskCreator } from '../../utils/task/task.utils';
import { UserContext } from '../../context/user.context';
import { GoogleMapContext } from '../../context/google-map.context';
// ITaskInputString
import './task.less';
import { TaskContext } from '../../context/task.context';

const { TextArea } = Input;

export const TaskFormItem = () =>{
    const {currentUser} = useContext(UserContext);
    const {setCurrentTask} = useContext(TaskContext);
    const {addressFormInput} = useContext(GoogleMapContext);

    const onFinish = (values: any) => {
        // const { startDate } = values;
        if(!currentUser) {alert('Please login first!'); return;}
        const { uid } = currentUser;
        if(!addressFormInput) {alert('Please select a place!'); return;}
        const taskObj = taskCreator({
            id: uid,
            organizer: currentUser,
            location: addressFormInput,
            ...values
        });
        setCurrentTask(taskObj);
        console.log(taskObj)
        
        // task(taskObj);
        // console.log(task)
        
      };

    return(
        <TaskFormItemContainer>
            <Form
                name='taskform'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                onFinish={onFinish}
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
                            <DatePicker/>
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
                            <TimePicker/>
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
                            <DatePicker/>
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
                            <TimePicker/>
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
                            <TextArea rows={4} allowClear = {true} />
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
                            <InputNumber/>
                        </Form.Item>
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