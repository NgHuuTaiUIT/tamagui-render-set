export default  {
  "type": "object",
  "properties": {
    "multilineString": {
      "type": "string",
      "description": "Multiline Example",
      "options" : {
        "placeholder": "Tesssssssst"
      }
    },
    "slider": {
      "type": "number",
      "minimum": 1,
      "maximum": 5,
      "default": 2,
      "description": "Slider Example"
    },
    "done": {
      "type": "boolean"
    },
    "trimText": {
      "type": "string",
      "description": "Trim indicates whether the control shall grab the full width available"
    },
    "restrictText": {
      "type": "string",
      "maxLength": 5,
      "description": "Restricts the input length to the set value (in this case: 5)"
    },
    "unfocusedDescription": {
      "type": "string",
      "description": "This description is shown even when the control is not focused"
    },
    "hideRequiredAsterisk": {
      "type": "string",
      "description": "Hides the \"*\" symbol, when the field is required"
    },
    "toggle": {
      "type": "boolean",
      "description": "The \"toggle\" option renders boolean values as a toggle."
    },
    "birthDate": {
      "type": "string",
      "format": "date"
    },
    "time": {
      "type": "string",
      "format": "time"
    },
    "dateTime": {
      "type": "string",
      "format": "date-time"
    },
    "enum": {
      "type": "string",
      "enum": [
        "One",
        "Two",
        "Three"
      ]
    }
  },
  "required": [
    "hideRequiredAsterisk",
    "restrictText"
  ]
}