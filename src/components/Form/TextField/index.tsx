import React, { ComponentPropsWithRef } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineSearch } from 'react-icons/ai';
import classes from './index.module.css';

interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  error?: string;
  loading?: boolean;
  classes?: {
    root?: string;
    field__body?: string;
    'field-input'?: string;
    'left-adornment'?: string;
    'right-adornment'?: string;
    field__footer?: string;
  }
}
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(props, ref) {
  const { classes: custom, error, loading, ...rest } = props;
  return (
    <div className={`${classes.form__field} ${custom?.root ? custom.root : ''}`}>
      {/* <div className={classes.field__header}>

      </div> */}
      <div className={`${classes.field__body} ${custom?.field__body ? custom.field__body : ''}`}>
        <div className={`${classes["field-input"]} ${custom?.['field-input'] ? custom['field-input'] : ''}`}>
          <div className={`${classes['left-adornment']} ${custom?.['left-adornment'] ? custom['left-adornment'] : ''}`} aria-hidden="true">
            <AiOutlineSearch />
          </div>
          <input type="text" name="search" placeholder="Search for a country..." ref={ref} {...rest} />
          {
            loading ? (
              <div className={`${classes['right-adornment']} ${custom?.['right-adornment'] ? custom['right-adornment'] : ''}`} aria-hidden="true" >
                <AiOutlineLoading3Quarters className={classes['animate-spin']} />
              </div>
            ) : null
          }
          <fieldset aria-hidden="true"></fieldset>
        </div>
      </div>
      <div className={`${classes.field__footer} ${custom?.field__footer ? custom.field__footer : ''}`}>
        {error && (
          <p className={classes.error}>{error}</p>
        )}
      </div>
    </div>
  )
})
export default TextField;