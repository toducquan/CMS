import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Box, Button, InputLabel, OutlinedInput, TextField, FormHelperText } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { useParams, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { raiseNotification } from 'store/reducers/notification';
import { useTranslation } from 'react-i18next';
import LoadingPage from 'components/LoadingPage';
import { mainColor } from 'config';
import ModalDelete from 'components/ModalDelete';

const RoomInfor = () => {
    return <div>RoomInfor</div>;
};

export default RoomInfor;
