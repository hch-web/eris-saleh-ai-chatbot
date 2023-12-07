import React, { memo } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { MicNoneOutlined, SendOutlined, Stop } from '@mui/icons-material';
import moment from 'moment';
import propTypes from 'prop-types';

import FormikField from 'containers/shared/FormikField';
import PromtContainer from './PromtContainer';
import { chatFormStackStyles, submitBtnStyles } from '../utilities/styles';
import { useGlobalContext } from '../context/GlobalContext';

function ChatForm({ audioBlob, isVoiceRecording, handleStartRecording, handleStopRecording }) {
  const { setLoading, setChatMessages, setRecentQuery, isBtnsDisabled, socket, isHumanAgent } =
    useGlobalContext();

  return (
    <Box padding={1} width={1}>
      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values, { resetForm }) => {
          if (!values.message) return;

          const payload = {
            query: values.message,
            type: 'text',
            timestamp: moment().format('hh:mm A'),
            message_from: 'Human',
          };

          if (!isHumanAgent) {
            setLoading(true);
            setChatMessages(prevState => [...prevState, payload]);
          }

          socket?.send(JSON.stringify(payload));
          setRecentQuery({ type: 'text', message: values.message });
          resetForm();
        }}
      >
        {() => (
          <Form>
            <PromtContainer />

            <Stack width={1} direction="row" alignItems="center" gap={1} sx={chatFormStackStyles}>
              <FormikField
                name="message"
                placeholder="Ask anything..."
                disabled={!!audioBlob || !!isVoiceRecording}
              />

              {!isVoiceRecording ? (
                <IconButton disabled={isBtnsDisabled} onClick={handleStartRecording}>
                  <MicNoneOutlined fontSize="small" />
                </IconButton>
              ) : (
                <IconButton disabled={isBtnsDisabled} color="error" onClick={handleStopRecording}>
                  <Stop fontSize="small" />
                </IconButton>
              )}

              <IconButton disabled={isBtnsDisabled} type="submit" sx={submitBtnStyles}>
                <SendOutlined fontSize="small" sx={{ color: 'white' }} />
              </IconButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

ChatForm.propTypes = {
  handleStartRecording: propTypes.func.isRequired,
  handleStopRecording: propTypes.func.isRequired,
  audioBlob: propTypes.string,
  isVoiceRecording: propTypes.bool,
};

ChatForm.defaultProps = {
  audioBlob: null,
  isVoiceRecording: false,
};

export default memo(ChatForm);
