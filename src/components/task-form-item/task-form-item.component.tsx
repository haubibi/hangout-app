import React, { useContext,FC, useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  TimePicker,
  Col, 
  Row,
  UploadFile
} from 'antd';
import { ITask } from '../../utils/interfaces/task.interface';
import { FormImagesUpload } from '../form-images-upload/form-images-upload.component'
import { TaskFormItemContainer } from './task-form-item.styles';
import GoogleSearchInForm from '../googleMaps-search/googleMaps-search.component';
import { taskCreator } from '../../utils/task/task.utils';
import { UserContext } from '../../context/user.context';
import { updateImages, ImagesTypeName, TaskImagesTypeName, IImageObj, getNewImageObj } from '../../utils/images/images.utils';
import { baseTaskCreator } from '../../utils/task/task.utils';
import { useQuery } from '@apollo/client';
import { GETTASKBYID } from '../../utils/graphql/query.utils';
import { useForm } from 'antd/es/form/Form';
import { IPlaceInputValue } from '../places-auto-complete/places-auto-complete.component';
import { dateFormat } from '../../utils/date/date.utils';
import './task.less';
const { TextArea } = Input;


interface TaskFormItemProps {
    taskId: string;
}

const defauletTask = baseTaskCreator();

export const TaskFormItem:FC<TaskFormItemProps> = ({
    taskId
}) =>{
    const [ form ] = useForm();
    const [ detail, setDetail] = useState<Record<string, any>>();
    const [ task, setTask ] = useState<ITask>(defauletTask);
    const {data, loading, error} = useQuery(GETTASKBYID,{
        variables: {
            id: taskId
        }
    });

    const {currentUser} = useContext(UserContext);
    console.log(taskId)
    useEffect(()=>{
        console.log(data, loading, error);
       if(!loading){
           if(data){
                const {__typename, ...task} = data.getTaskById;
                setTask(task);
            }
       } 
    },[data, loading, error]);


    useEffect(()=>{
        const {title, startDate, startTime, endDate, endTime, description, participantsNumber } = task;
        setDetail({
            title, 
            startDate : startDate? moment(startDate, dateFormat): undefined,
            startTime : startTime?moment(startTime): undefined, 
            endDate : endDate?moment(endDate, dateFormat): undefined, 
            endTime : endTime?moment(endTime): undefined, 
            description, 
            participantsNumber
        });
    },[task])

    useEffect(()=>{
        form.resetFields();
        console.log(detail)
    },[form, detail])



    const handleGoogleSearch = (e: IPlaceInputValue) => {

    }

    const onFinishFailed = ({ values, errorFields, outOfDate }: any) => {
        console.log(values, errorFields, outOfDate,task.showImages)
    }
   
    const onFinish = (values: any) => {
        console.log(task.showImages,values)
        // const { startDate } = values;
        if(!currentUser) {alert('Please login first!'); return;}
        const { uid } = currentUser;
        // if(!addressFormInput) {alert('Please select a place!'); return;}
        if(!task.showImages) task.showImages = [];
        // update task
        updateImages(
            ImagesTypeName.TASKS,
            taskId,
            TaskImagesTypeName.DISPLAYINTASK,
            task.showImages,
            values.fileList.fileList
        ).then(()=>{
            const imagesObj:IImageObj[] = values.fileList.fileList.map((file: UploadFile) => {
                const {uid, name} = file;
                const refPath = `images/${ImagesTypeName.TASKS}/${taskId}/${TaskImagesTypeName.DISPLAYINTASK}/${uid}`;
                return {
                    uid,
                    name,
                    refPath
                }
            });

            getNewImageObj(imagesObj).then((showImages)=>{
                console.log(showImages, values)
                const taskObj = taskCreator(task,{
                    id: uid,
                    organizer: currentUser,
                    location: values.location.location,
                    showImages,
                    ...values
                });
                // setTask(taskObj);
                console.log(taskObj)
            })
        });

        // getNewImageObj

    };

    // console.log(detail, task)
    return(
        <TaskFormItemContainer>
            <Form
                form={form}
                name='taskform'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed = {onFinishFailed}
                initialValues = {detail}
                // initialValues = {FormInitialValues}
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
                            maxImageLength= {3}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            name = "location"
                            style={{width: '100%'}}
                            wrapperCol = {{span: 24}}
                            rules={[{ required: true, message: '' }]}
                        >
                            <GoogleSearchInForm 
                                onChange = { handleGoogleSearch }
                                location = {{
                                    location: task.location,
                                    address: task.address
                                }}
                            />
                        </Form.Item>
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