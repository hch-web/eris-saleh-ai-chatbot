import React from 'react';
import {
  Close,
  DeleteOutlined,
  EmailOutlined,
  SupportAgentOutlined,
  TitleOutlined,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import propTypes from 'prop-types';
import { saveAs } from 'file-saver';

// COMPONENTS
import DownloadChat from '../pdf';

function SettingsDrawer({ toggleSettings, handleClearChat, handleUpdateTextSize, chatMessages }) {
  const handleDownloadChat = async () => {
    if (chatMessages?.length > 0) {
      const doc = <DownloadChat chatMessages={chatMessages} />;
      const pdfBlob = await pdf(doc).toBlob();
      const blobURL = URL.createObjectURL(pdfBlob);
      saveAs(blobURL, 'Chat');
    }

    // const doc = <ExportPdfSalaries salaries={data?.results} />;
    // const pdfBlob = await pdf(doc).toBlob();
    // const blobURL = URL.createObjectURL(pdfBlob);
    // saveAs(blobURL, 'Salaries');
  };

  return (
    <motion.div
      initial={{ transform: 'translateY(320px)', visibility: '0' }}
      animate={{ transform: 'translateY(0)', visibility: 1 }}
      exit={{ transform: 'translateY(320px)', visibility: '0' }}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
        background: 'white',
        transformOrigin: 'bottom',
      }}
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

        <ListItemButton onClick={handleUpdateTextSize}>
          <ListItemIcon>
            <TitleOutlined />
          </ListItemIcon>

          <ListItemText primary="Text Size" />
        </ListItemButton>

        <ListItemButton>
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
    </motion.div>
  );
}

SettingsDrawer.propTypes = {
  toggleSettings: propTypes.func.isRequired,
  handleClearChat: propTypes.func.isRequired,
  handleUpdateTextSize: propTypes.func.isRequired,
  chatMessages: propTypes.array,
};

SettingsDrawer.defaultProps = {
  chatMessages: [],
};

export default SettingsDrawer;
