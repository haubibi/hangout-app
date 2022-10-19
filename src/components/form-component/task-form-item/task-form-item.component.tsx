import { FC, 
    useEffect, 
    useState, 
    useMemo,
    useCallback,
    useContext
} from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { 
    ADD_TASK,
    DELETE_TASK
 } from '../../../utils/graphql/mutation.utils';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Col, 
    Row,
    Spin,
    message
} from 'antd';
import { 
    TaskFormItemContainer,
    InputNumberCon,
    DatePickerCon,
    TimePickerCon,
    InputCon,
    PopconfirmCon,
    CategorySelect,
    CategoryOption
} from './task-form-item.styles';
import { 
    ITask,
    TaskRefetchType,
    taskCategories
} from '../../../interfaces/task.interface';
import { 
    IImageObjWithUrlAndRefPath,
    ImagesTypeName,
    TaskImagesTypeName
} from '../../../interfaces/images.interface';
import {
    ITaskFormItemDetail,
    ITaskFormItemDetailWithImageRefAndUrl
} from '../../../interfaces/taskForm.interface';
import { FormImagesUpload } from '../form-images-upload/form-images-upload.component'
import GoogleSearchInForm from '../../googleMaps-search/googleMaps-search.component';
import { FormSwitch } from '../form-switch/form-switch.component';

import { 
    updateImages, 
    getImagesWithUrlAndRefPath, 
    transformImageToWithoutRefPath 
} from '../../../utils/images/images.utils';
import { FormTag } from '../form-tag/form-tag.component';
import { useForm } from 'antd/es/form/Form';
import { dateFormat } from '../../../utils/date/date.utils';
import { getImagesWithRefPath } from '../../../utils/images/images.utils';
import { 
    TaskFormItemName,
    taskFormRules,
    validateFormValues,
    disabledDate
 } from '../../../validators/taskForm.validate';

import { getUpdatedTask } from '../../../utils/task/task.utils';
import { TaskFormUserTypeEnum } from '../../../routers/taskFormPage/task-form-page.component';
import './task.less';


const { TextArea } = Input;



const titleFormProps = {
    label: "Event title",
    name: TaskFormItemName.title,
    labelCol: {span: 4},
    wrapperCol: {span: 20},
    rules: taskFormRules[TaskFormItemName.title]
}

const startDateFormProps = {
    label: "Start date",
    name: TaskFormItemName.startDate,
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}
const startTimeFormProps = {
    label: "Start time",
    name: TaskFormItemName.startTime,
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}


const endDateFormProps = {
    label: "End date",
    name: TaskFormItemName.endDate,
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}
const endTimeFormProps = {
    label: "End time",
    name: TaskFormItemName.endTime,
    labelCol: {span: 8},
    wrapperCol: {span: 12},
    rules: [{ required: true, message: '' }]
}
const descriptionFormProps = {
    label: "Description",
    name: TaskFormItemName.description,
    labelCol: {span: 4},
    wrapperCol: {span: 20},
    rules: [{ required: true, message: '' }]
}
const keyWordsFormProps = {
    label: "tags",
    name: TaskFormItemName.keyWords,
    labelCol: {span: 4},
    wrapperCol: {span: 20}
}
const frontCoverFormProp = {
    label: "FrontCover",
    name: TaskFormItemName.frontCoverImage,
    maxImageLength: 1,
}
const showImagesFormProps = {
    label: "Display Images",
    name: TaskFormItemName.showImages,
    maxImageLength: 3,
}
const participantsNumberFormProps = {
    label: "Numbers",
    name: TaskFormItemName.participantsNumber,
    labelCol: {span: 4},
    wrapperCol: {span: 4},
    rules: [{ required: true, message: '' }]
}


const googleSearchFormProps = {
    name: TaskFormItemName.latLngAndAddress,
    style:{width: '100%'},                 
    wrapperCol:{span: 24},
    rules: [{ required: true, message: '' }]                   
                            
}

const openFormitemProps = {
    name:TaskFormItemName.open,
    label:'Event open',
    labelCol: {span: 10},
    wrapperCol: {span: 10}                      
}
const showFormitemProps = {
    name:TaskFormItemName.hide,
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

export const maxKeyWords = 8;


interface TaskFormItemProps {
    task: ITask;
    isNewTaskForm: boolean;
    refetch: TaskRefetchType<{id:string}>;
    currentUserType: TaskFormUserTypeEnum;
    currentUserTypeCheck: () => void;
}

export const TaskFormItem:FC<TaskFormItemProps> = ({
    task,
    isNewTaskForm,
    refetch,
    currentUserType,
    currentUserTypeCheck
}) =>{
    const [ form ] = useForm();
    const [ submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(false);
    const [ deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(false);
    const [ detail, setDetail] = useState<Record<string, any>>();
    const [ currentTask, setCurrentTask ] = useState<ITask>(task);
    const [ addTask ] = useMutation(ADD_TASK);
    const [ deleteTask ] = useMutation(DELETE_TASK);
    const navigate = useNavigate();
    const taskId = currentTask.id;


    const FormItemsArr = useMemo(()=>{
        const showImages = currentTask.showImages;
        const frontCoverImage = currentTask.frontCoverImage? [currentTask.frontCoverImage]: [];
        return [
            [{formItemProps: titleFormProps, wrappedElement: <InputCon allowClear = {true}/>}],
            [
                {formItemProps: startDateFormProps, wrappedElement: <DatePickerCon />},
                {formItemProps: startTimeFormProps, wrappedElement: <TimePickerCon />}
            ],
            [
                {formItemProps: endDateFormProps, wrappedElement: <DatePickerCon />},
                {formItemProps: endTimeFormProps, wrappedElement: <TimePickerCon />}
            ],  
            [{formItemProps: participantsNumberFormProps, wrappedElement: <InputNumberCon />}],
            [{formItemProps: descriptionFormProps, wrappedElement: <TextArea rows={4} allowClear = {true} />}],
            [{formItemProps: keyWordsFormProps, wrappedElement: <FormTag maxTagsNumber={maxKeyWords} />}],
            [{formItemProps: {}, wrappedElement:<FormImagesUpload {...frontCoverFormProp} showImages = {frontCoverImage}/>}], //
            [{formItemProps: {}, wrappedElement:<FormImagesUpload {...showImagesFormProps} showImages = {showImages}/>}], //
            [{formItemProps: googleSearchFormProps, wrappedElement: <GoogleSearchInForm />}],
            [
                {formItemProps: {}, wrappedElement:<FormSwitch {...formSwitchOpenProps}/>},
                {formItemProps: {}, wrappedElement:<FormSwitch {...formSwitchShowProps}/>},
            ], 
            [{formItemProps: subbmitButtonFormitemProps, wrappedElement: <Button type="primary" htmlType="submit">Submit</Button>,encapsulated: false}],
        
        ]
    },[currentTask]);


    //set the detail of the form
    useEffect(()=>{
        const { 
            id, 
            // title, 
            // description,
            // hide,
            // open,
            // participantsNumber,
            //category
            startDate, //modified
            startTime, //modified
            endDate, //modified
            endTime, //modified
            organizer,
            participants,
            frontCoverImage, //modified
            // latLngAndAddress,
            showImages,  //modified
            reviews,
            ...otherProps
        } = currentTask;

        // console.log(showImages)
        const showImagesWithUrl = transformImageToWithoutRefPath(showImages);
        // console.log(showImages, showImagesWithUrl)
        const newDetails: ITaskFormItemDetail = {
            startDate : startDate? moment(startDate, dateFormat): undefined,
            startTime : startTime?moment(startTime): undefined, 
            endDate : endDate?moment(endDate, dateFormat): undefined, 
            endTime : endTime?moment(endTime): undefined,
            showImages: showImagesWithUrl,
            frontCoverImage: frontCoverImage? [frontCoverImage]: [],
            ...otherProps
        };
        setDetail(newDetails);
    },[currentTask])
    // console.log(task,detail)
    const deleteTaskHandle = useCallback(()=>{
        //set the buttons disabled
        setSubmitButtonDisabled(true);
        setDeleteButtonDisabled(true);

        //check current user type
        currentUserTypeCheck();

        if(currentUserType === TaskFormUserTypeEnum.USER_MATCH){
            console.log("delete")
            deleteTask({
                variables: {
                    taskId: taskId
                }
            }).then(()=>{
                message.success(`You have successfully deleted the event!`, 5);
                navigate(`/`);
            }).catch(error => {
                message.error(error, 5);
                navigate(`/`);
            })
        }
    },[taskId, currentUserTypeCheck, deleteTask, navigate, currentUserType]);



    const onFinishFailed = ({ values, errorFields, outOfDate }: any) => {
        console.log(values, errorFields, outOfDate,currentTask.showImages)
    }
   
    const onFinish = async (values: ITaskFormItemDetail) => {
       
        //set the buttons disabled
        setSubmitButtonDisabled(true);
        setDeleteButtonDisabled(true);

        //check current user type
        currentUserTypeCheck();

        // console.log(values ,currentTask)


        let showImages: IImageObjWithUrlAndRefPath[] = currentTask.showImages;
        let frontCoverImage: IImageObjWithUrlAndRefPath | null = currentTask.frontCoverImage;
        
        //validate the values
        if(!validateFormValues(values, currentTask)){
            setSubmitButtonDisabled(false);
            setDeleteButtonDisabled(false);
            return;
        };
        // update show images
        if(
            values.showImages &&
            values.showImages.length > 0
        ){
            await updateImages(
                ImagesTypeName.TASKS,
                taskId,
                TaskImagesTypeName.DISPLAYINTASK,
                currentTask.showImages,
                values.showImages
            ).then(async ()=>{
                const imagesWithRef = getImagesWithRefPath(ImagesTypeName.TASKS, taskId, TaskImagesTypeName.DISPLAYINTASK, values.showImages);
                await getImagesWithUrlAndRefPath(imagesWithRef).then((showImagesWithRefAndUrl)=>{
                    showImages = showImagesWithRefAndUrl as IImageObjWithUrlAndRefPath[];
                })
            }).catch((error)=>{
                message.error(error.toString(), 3);
                setSubmitButtonDisabled(false);
                setDeleteButtonDisabled(false);
                return;
            });
        }

        // update front Image
        if(
            values.frontCoverImage &&
            values.frontCoverImage.length > 0
        ){
            await updateImages(
                ImagesTypeName.TASKS,
                taskId,
                TaskImagesTypeName.FRONTCOVER,
                (currentTask.frontCoverImage? [currentTask.frontCoverImage]: []),
                values.frontCoverImage
            ).then(async()=>{
                const imagesWithRef = getImagesWithRefPath(ImagesTypeName.TASKS, taskId, TaskImagesTypeName.FRONTCOVER, values.frontCoverImage);
                // console.log(imagesWithRef)
                await getImagesWithUrlAndRefPath(imagesWithRef).then((frontCoverImageArr)=>{      
                    // console.log( frontCoverImageArr )              
                   frontCoverImage = frontCoverImageArr[0] as IImageObjWithUrlAndRefPath;
                });
            }).catch((error)=>{
                message.error(error.toString(), 3);
                setSubmitButtonDisabled(false);
                setDeleteButtonDisabled(false);
                return;
            });
        }

        const formInputDetailWithRefAndUrl:ITaskFormItemDetailWithImageRefAndUrl = {
            ...values,
            showImages,
            frontCoverImage
        }
        // console.log(currentTask, formInputDetailWithRefAndUrl)
        const newTask = getUpdatedTask(currentTask, formInputDetailWithRefAndUrl);
        // console.log(newTask)
        await addTask({
            variables:{
                taskObj: newTask,
                isNewTaskForm
            } 
        }).then(()=>{
            refetch({
                id: taskId
            }).then(()=>{
                navigate(`/task_${taskId}`);
            }).catch((error)=>{
                message.error(error.toString(), 3);
                setSubmitButtonDisabled(false);
                setDeleteButtonDisabled(false);
            })
        });


    };


    if(!currentTask || !detail) return <Spin />
    return(
        <TaskFormItemContainer>
            <Form
                form={form}
                name='taskform'
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed = {onFinishFailed}
                initialValues = {detail}
                colon = {false}
                disabled = {submitButtonDisabled || deleteButtonDisabled}
            >   

                {/* {
                    FormItemsArr.map((rowArr,index)=>{
                        const elementsNum = rowArr.length;
                        return(
                            <Row key={index} align = "middle" justify = "start" gutter={16}>
                                {
                                    rowArr.map((formitem, index) => {
                                        const { formItemProps, wrappedElement} = formitem;
                                        return wrappedElement.type === 'function'?
                                        <Col key={index} span={Math.round(24/elementsNum)}>{wrappedElement}</Col>:    
                                        <Col key={index} span={Math.round(24/elementsNum)}><Form.Item {...formItemProps}>{wrappedElement}</Form.Item></Col>;    
                                    })
                                }
                             </Row>
                        )
                    })
                } */}
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            {...titleFormProps}
                        >
                            <InputCon allowClear = {true}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16 + 8}>
                    <Col span={12}>
                        <Form.Item
                            {...startDateFormProps}
                        >
                            <DatePickerCon  disabledDate = {disabledDate}/>
                        </Form.Item>
                        
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            {...startTimeFormProps}
                        >
                            <TimePickerCon />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16 + 8}>
                    <Col span={12}>
                        <Form.Item
                           {...endDateFormProps}
                        >
                            <DatePickerCon  disabledDate = {disabledDate}/>
                        </Form.Item>
                        
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                           {...endTimeFormProps}
                        >
                            <TimePickerCon />
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
                            <InputNumberCon />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            label="category"
                            name = "category"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 3 }}
                            rules={[{ required: true, message: '' }]}
                        >
                            <CategorySelect>
                                {
                                    taskCategories.map((c, index) => <CategoryOption key = {index} value={c}>{c}</CategoryOption>)
                                }
                            </CategorySelect>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item 
                            {...keyWordsFormProps}
                        >
                            <FormTag maxTagsNumber={maxKeyWords} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} >                
                        <FormImagesUpload
                            {...frontCoverFormProp}
                            showImages = {
                                currentTask.frontCoverImage? [currentTask.frontCoverImage]:[]
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >                
                        <FormImagesUpload
                            {...showImagesFormProps}
                            showImages = {currentTask.showImages || []}
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
                    <Col span={12}>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                disabled = {submitButtonDisabled}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                            <PopconfirmCon 
                                placement="right" 
                                title={`Are you sure to delete this Event?`} 
                                onConfirm={ deleteTaskHandle } 
                                okText="Yes" 
                                cancelText="No"
                                disabled = {deleteButtonDisabled}
                            >

                                <Button 
                                    type="primary" 
                                    htmlType="button"
                                    disabled = {deleteButtonDisabled}
                                >
                                    Delete
                                </Button>
                            </PopconfirmCon>
                    </Col>
                </Row>
                

            </Form>

        </TaskFormItemContainer>
  
    )
};