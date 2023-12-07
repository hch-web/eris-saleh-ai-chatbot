import React, { memo, useCallback, useState } from 'react';
import {
  Close,
  DeleteOutlined,
  EmailOutlined,
  ExpandLess,
  ExpandMore,
  SupportAgentOutlined,
  TextDecrease,
  TextIncrease,
  TitleOutlined,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import propTypes from 'prop-types';
import { saveAs } from 'file-saver';

// COMPONENTS
import DownloadChat from '../pdf';
import { settingsDrawerStyles } from '../utilities/styles';

function SettingsDrawer({
  toggleSettings,
  handleClearChat,
  handleUpdateTextSize,
  chatMessages,
  textSize,
  handleOpenHumanAgentPage,
}) {
  const [isTextSliderOpen, setTextSliderOpen] = useState(false);

  const handleDownloadChat = useCallback(async () => {
    if (chatMessages?.length > 0) {
      const doc = <DownloadChat chatMessages={chatMessages} />;
      const pdfBlob = await pdf(doc).toBlob();
      const blobURL = URL.createObjectURL(pdfBlob);
      saveAs(blobURL, 'Chat');
    }
  }, [chatMessages]);

  const toggleCollapseText = () => {
    setTextSliderOpen(prevState => !prevState);
  };

  const handleChangeSlider = (e, newValue) => {
    handleUpdateTextSize(newValue);
  };

  return (
    <Box
      component={motion.div}
      initial={{ transform: 'translateY(320px)', visibility: '0' }}
      animate={{ transform: 'translateY(0)', visibility: 1 }}
      exit={{ transform: 'translateY(320px)', visibility: '0' }}
      sx={settingsDrawerStyles}
    >
      <Stack pt={1} pb={0.5} px={2} direction="row" justifyContent="space-between" gap={2}>
        <Typography variant="h6">Settings</Typography>

        <IconButton onClick={toggleSettings}>
          <Close />
        </IconButton>
      </Stack>

      <List>
        <ListItemButton onClick={handleDownloadChat}>
          <ListItemIcon>
            <EmailOutlined />
          </ListItemIcon>

          <ListItemText primary="Download Chat" />
        </ListItemButton>

        <ListItemButton onClick={handleClearChat}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>

          <ListItemText primary="Clear Conversation" />
        </ListItemButton>

        <ListItemButton onClick={toggleCollapseText}>
          <ListItemIcon>
            <TitleOutlined />
          </ListItemIcon>

          <ListItemText primary="Text Size" />

          {isTextSliderOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={isTextSliderOpen} orientation="vertical">
          <Stack direction="row" gap={3} alignItems="center" px={2} py={2}>
            <TextDecrease fontSize="small" />

            <Slider
              value={textSize}
              onChange={handleChangeSlider}
              step={1}
              marks
              min={12}
              max={18}
              valueLabelDisplay="auto"
            />

            <TextIncrease fontSize="small" />
          </Stack>
        </Collapse>

        <ListItemButton onClick={handleOpenHumanAgentPage}>
          <ListItemIcon>
            <SupportAgentOutlined />
          </ListItemIcon>

          <ListItemText primary="Human Agent" />
        </ListItemButton>
      </List>

      <Divider />

      <Stack py={2} direction="row" justifyContent="center" gap={2.5}>
        <Typography variant="body2" color="grey">
          Privacy
        </Typography>

        <Typography variant="body2" color="grey">
          Terms
        </Typography>
      </Stack>
    </Box>
  );
}

SettingsDrawer.propTypes = {
  toggleSettings: propTypes.func.isRequired,
  handleClearChat: propTypes.func.isRequired,
  handleUpdateTextSize: propTypes.func.isRequired,
  handleOpenHumanAgentPage: propTypes.func.isRequired,
  textSize: propTypes.number.isRequired,
  chatMessages: propTypes.array,
};

SettingsDrawer.defaultProps = {
  chatMessages: [],
};

export default memo(SettingsDrawer);
