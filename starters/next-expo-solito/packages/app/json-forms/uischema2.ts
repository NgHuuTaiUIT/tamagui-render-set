export default {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/multilineString",
      "options": {
        "multi": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/slider",
      "options": {
        "slider": true
      }
    },
    {
      "type": "Control",
      "label": false,
      "scope": "#/properties/done"
    },
    {
      "type": "Control",
      "scope": "#/properties/trimText",
      "options": {
        "trim": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/restrictText",
      "options": {
        "restrict": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/unfocusedDescription",
      "options": {
        "showUnfocusedDescription": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/hideRequiredAsterisk",
      "options": {
        "hideRequiredAsterisk": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/toggle",
      "label": "Boolean as Toggle",
      "options": {
        "toggle": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/birthDate"
    }
  ]
}