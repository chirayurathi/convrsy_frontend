import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import SplitButton from "../components/SplitButton";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CircleIcon from '@mui/icons-material/Circle';
import { createForm } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title:"",
        questions:[

        ]
    })

    const addQuestion = ()=>{
        setFormData({
            ...formData,
            questions:[
                ...formData.questions,
                {
                    type:"MCQ",
                    text:"",
                    options:[]
                }
            ]
        })
    }
    const addOption = (question)=>{
        let _formData = {...formData};
        let _questions = [..._formData.questions];
        let _options = [..._questions[question].options,""];
        _questions[question].options = _options;
        _formData.questions = _questions;
        setFormData(_formData);
    }

    const setType = (question, value)=>{
        let _questions = [...formData.questions];
        _questions[question] = {
            ..._questions[question],
            type:value
        }
        setFormData({
            ...formData,
            questions:_questions
        })
    };

    const updateQuestion = (question, value)=>{
        let _questions = [...formData.questions];
        _questions[question] = {
            ..._questions[question],
            text:value
        }
        setFormData({
            ...formData,
            questions:_questions
        })
    }

    const updateOptions = (qId, oId, value)=>{
        let _formData = {...formData};
        let _questions = [..._formData.questions];
        let _options = [..._questions[qId].options];
        _options[oId] = value;
        _questions[qId].options = _options;
        _formData.questions = _questions;
        setFormData(_formData);
    }

    const updateTitle = (e)=>{
        setFormData({
            ...formData,
            title:e.target.value
        })
    }

    const onSuccess = (response)=>{
        toast.success("New Form Created Successfully.");
        navigate('/dashboard');
      }

    const handleSubmit = () => {
        createForm(formData,onSuccess);
    }

    return (
    <Grid item justifyContent={"space-around"} padding={"30px"} xs>
        <Grid item mb={2}>
            <Typography variant="h5">Create New Form</Typography>
        </Grid>
        <Grid item container spacing={2} xs={12} alignItems={"center"} mb={5}>
            <Grid item>
                <Typography variant="body1">Title:</Typography>
            </Grid>
            <Grid item>
                <TextField variant="standard" onChange={updateTitle} />
            </Grid>
        </Grid>
        <Divider />
        {formData.questions.map((question,index)=>(
        <>
            <Grid container item xs spacing={2} mt={2} mb={5}>
                <Grid
                    container
                    item
                    xs
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    spacing={2}
                >
                    <Grid container item alignItems={"center"} spacing={2} xs={11}>
                        <Grid item>
                            <RadioButtonCheckedRoundedIcon />
                        </Grid>
                        <Grid item xs>
                            <TextField variant="standard" fullWidth placeholder="Question" onChange={(e)=>{updateQuestion(index,e.target.value)}} />
                        </Grid>
                    </Grid>
                    <Grid item xs={1} justifyContent={"flex-end"}>
                        <SplitButton selected={question.type} setSelected={(value)=>{setType(index,value)}}/>
                    </Grid>
                </Grid>
                {question.type==="MCQ" && 
                <Grid container item ml={10}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Options:
                        </Typography>
                    </Grid>
                    <Grid item container>
                        {formData.questions[index].options.map((option, oIndex)=>(
                            <Grid item container xs={12} spacing={2} mt={1} mb={1} alignItems="center">
                                <Grid item>
                                    <CircleIcon />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="standard" fullWidth placeholder="Option" value={option} onChange={(e)=>{updateOptions(index, oIndex, e.target.value)}} />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item>
                            <Button startIcon={<AddIcon/>} onClick={()=>{addOption(index)}}>Add Option</Button>
                        </Grid>
                    </Grid>
                </Grid>}
            </Grid>
            <Divider/>
        </>
        ))}
        <Grid container mt={2} spacing={2} justifyContent={"space-around"}>
            <Grid container item xs={4} justifyContent={"space-around"} spacing={2}>
                <Grid item>
                    <Button startIcon={<AddIcon/>} variant="contained" onClick={addQuestion}>
                        Add Question
                    </Button>
                </Grid>
                <Grid item>
                    <Button startIcon={<SaveIcon/>} variant="contained" onClick={handleSubmit}>
                        Save Form
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
};

export default CreateForm;
