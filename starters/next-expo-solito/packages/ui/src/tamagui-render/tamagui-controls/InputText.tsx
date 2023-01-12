import React, { useState } from 'react'
import { CellProps, WithClassname } from '@jsonforms/core'
import {
  Button,
  //   IconButton,
  Input,
  //   InputAdornment,
  //   InputBaseComponentProps,
  InputProps,
  XStack,
  styled,
  useTheme,
} from 'tamagui'
import merge from 'lodash/merge'
// import Close from '@mui/icons-material/Close';
import { X } from '@tamagui/lucide-icons'
import { JsonFormsTheme, useDebouncedChange } from '../util'

// interface MuiTextInputProps {
//   muiInputProps?: InputProps['inputProps'];
//   inputComponent?: InputProps['inputComponent'];
// }

const eventToValue = (ev: any) => (ev.target.value === '' ? undefined : ev.target.value)

export const InputText = React.memo((props: CellProps & WithClassname & InputProps) => {
//   const [showAdornment, setShowAdornment] = useState(false)
  const {
    data,
    config,
    className,
    id,
    enabled,
    uischema,
    isValid,
    path,
    handleChange,
    schema,
  } = props
  const maxLength = schema.maxLength
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  let inputProps: InputProps
  if (appliedUiSchemaOptions.restrict) {
    inputProps = { maxLength: maxLength }
  } else {
    inputProps = {}
  }

  if (appliedUiSchemaOptions.trim && maxLength !== undefined) {
    inputProps.maxLength = maxLength
  }

  const [inputText, onChange, onClear] = useDebouncedChange(
    handleChange,
    '',
    data,
    path,
    eventToValue
  )
//   const onPointerEnter = () => setShowAdornment(true)
//   const onPointerLeave = () => setShowAdornment(false)

  const theme: JsonFormsTheme = useTheme()

  const CloseCustom = styled(X, {
    backgroundColor: theme.jsonforms?.input?.delete?.background,
    borderRadius: '50%',
  })

  return (
    <XStack ai="center" space="$2">
      <Input
        secureTextEntry={appliedUiSchemaOptions.format === 'password'}
        value={inputText}
        onChange={onChange}
        className={className}
        id={id}
        disabled={!enabled}
        autoFocus={appliedUiSchemaOptions.focus}
        multiline={appliedUiSchemaOptions.multi}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
      />
      <Button als="center" icon={CloseCustom as any} size="$4" onPress={onClear}>
        {/* Clear input field */}
      </Button>
    </XStack>
  )
})
