import React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import propTypes from 'prop-types';
import { v4 } from 'uuid';
import moment from 'moment';

Font.register({
  family: 'Arabic',
  src: 'https://crm-account.s3.me-south-1.amazonaws.com/IBMPlexSansArabic-Regular.ttf',
});

const styles = StyleSheet.create({
  viewerStyles: {
    width: '100%',
    height: '100vh',
  },
  page: {
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontFamily: 'Helvetica-Bold',
  },
  logoCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
  },
  date: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    width: '80%',
  },
  messageItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '12px',
  },

  sender: {
    color: '#006fac',
    fontWeight: '500',
  },

  receiver: {
    color: '#000',
    fontWeight: '500',
  },

  message: {
    fontFamily: 'Arabic',
  },
});

function DownloadChat({ chatMessages }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoCont}>
            <Text style={styles.title}>Eris AI -</Text>

            <Text>Chat Transcript</Text>
          </View>

          <Text style={styles.date}>
            {moment(chatMessages[0].timestamp, 'hh:mm A').format('DD MMMM, YYYY')}
          </Text>
        </View>

        <View style={styles.messageWrapper}>
          {chatMessages?.map(msg => {
            const isSentByMe = !!msg?.query;
            const isAudio = msg?.type === 'audio';

            return (
              <View key={v4()} style={[styles.messageItem, { color: isSentByMe ? '#006fac' : '#000' }]}>
                <Text>[{moment(msg?.timestamp || '', 'hh:mm A').format('HH:mm:ss')}]</Text>

                <Text style={isSentByMe ? styles.sender : styles.receiver}>{isSentByMe ? 'Me' : 'Bot'}:</Text>

                {isAudio ? (
                  <Text style={styles.msg}>Voice Note</Text>
                ) : (
                  <Text wrap style={styles.message}>
                    {isSentByMe ? msg.query : msg.answer}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

DownloadChat.propTypes = {
  chatMessages: propTypes.arrayOf(propTypes.object),
};

DownloadChat.defaultProps = {
  chatMessages: [],
};

export default DownloadChat;
