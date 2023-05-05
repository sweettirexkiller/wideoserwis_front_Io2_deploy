import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Flex,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import MetadataForm from './MetadataForm';
import VideoFileForm from './VideoFileForm';
import SuccessAddition from './SuccessAddition';


export default function AddVideo() {
  const toast = useToast();
  const [videoId, setVideoId] = useState(null);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const handleBackButton = () => {
    setStep(step - 1);
    setProgress(progress - 33.33);
  };

  const handleNextButton = () => {
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };

  const handleSubmitButton = () => {
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };

  const handles={
    handleNextButton,
    handleBackButton,
    handleSubmitButton
  }

  return (
    <Flex
      justifyContent={'flex'}
      width={'100%'}
      bg={'gray.50'}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated/>
        {step === 1 ?
          <MetadataForm setVideoId={setVideoId} step={step} setStep={setStep} handles={handles}  />
          : step === 2 ? <VideoFileForm videoId={videoId} step={step} setStep={setStep} handles={handles}/> : <SuccessAddition/>}
      </Box>
    </Flex>
  );
};
