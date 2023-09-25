import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import propTypes from 'prop-types';

// STYLES
import styles from 'styles/formikField.module.scss';

function FormikField({ name, onChange, placeholder, disabled }) {
  const { handleSubmit } = useFormikContext();
  const [field, meta] = useField(name || '');
  const { value, onChange: onValueChange, ...resetFieldProps } = field;
  const { error, touched } = meta;
  // const [rows, setRows] = useState(1);

  const handleChange = useCallback(e => {
    onValueChange(e);

    if (onChange) onChange(e);
  }, []);

  const handleKeyDown = useCallback(e => {
    const { key } = e;

    if (key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, []);

  return (
    <Box className={styles.fieldWrapper}>
      <textarea
        value={value}
        className={styles.field}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        onKeyDown={handleKeyDown}
        {...resetFieldProps}
      />

      {touched && error && (
        <Box className={styles.error}>
          <Typography variant="body2" className={styles.error}>
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

FormikField.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  disabled: propTypes.bool,
  onChange: propTypes.func,
};

FormikField.defaultProps = {
  onChange: () => {},
  placeholder: '',
  disabled: false,
};

export default FormikField;
